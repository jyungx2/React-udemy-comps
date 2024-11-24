import { createContext, useState, useEffect } from "react";

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  // 1️⃣ Initialize current path (immediately know what path the user is visiting)
  // Window.location.pathname = 브라우저의 현재 URL 경로
  // 렇게 설정하면, 앱이 처음 로드될 때 브라우저 URL과 상태(currentPath)가 처음부터 동기화
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  // navigate의 함수의 prop = to가 Pathname, pushState 메소드에 의해 to = window.location.pathname으로 동기화

  // 2️⃣ 사용자가 뒤로가기/앞으로가기 버튼을 눌렀을 때 호출
  // => 브라우저가 popstate 이벤트를 발생시키면, 이벤트 핸들러에서 setCurrentPath(window.location.pathname)을 호출하여 React 상태와 브라우저 URL을 동기화
  // 우리가 user를 'pushState' 메소드로 추가된 url로 이동시키고, 유저가 앞으로/뒤로가기 버튼을 눌렀을 때, window 객체는 자동으로 popstate라는 이벤트를 불러온다. -> need to listen to popstate event on the window object and update the current path.
  // ...current path를 업데이트하는 이유는 단지 컴포넌트를 리렌더시키기 위함이다! (No other reason)
  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handler);

    // NavigationProvider 컴포넌트가 화면에서 사라지기 직전에 이벤트 핸들러를 삭제 (plan for the future)
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);
  // 💥💥💥 Tstory 필기 💥💥💥
  // 📌 헷갈리지 않는 법
  // - addEventListener는 "나중에 이 이벤트가 발생하면 이 코드를 실행해라"라고 등록하는 작업.
  // - Setter function은 "지금 상태를 변경해서 리렌더링하라"는 실행 작업.

  // [] 빈 배열은 이벤트 리스너를 '등록'하는 작업을 단 한 번만 수행하게 합니다.
  // 하지만 이벤트 리스너 자체는 브라우저의 이벤트 시스템에 등록된 상태로 유지되기 때문에, 이후에도 popstate 이벤트가 발생할 때마다 계속 작동합니다.
  // => useEffect는 이벤트 리스너를 등록하고 제거하는 관리 역할을 합니다.
  // ❓ 만약 [] 없이 실행하면?
  // 매번 popstate 이벤트가 발생할 때마다, 이벤트 리스너를 다시 등록하게 됩니다.
  // 결과적으로 중복된 이벤트 리스너가 쌓이게 되어 성능 문제가 발생할 수 있습니다.
  // ex) 뒤로가기를 한 번 누르면 동일한 handler 함수가 여러 번 호출될 수 있음.

  // 3️⃣ 사용자가 링크를 클릭했을 때 호출
  // 1. URL을 변경하기 위해 pushState를 호출하고,
  // 2. React 상태(currentPath)도 직접 업데이트하여 컴포넌트를 리렌더링
  // pushState는 주소창(URL)만 바꾸는 역할, popstate는 유저가 뒤로/앞으로 버튼 클릭했을 때 발생하는 이벤트로서, pushState()로 url을 바꿈과 동시에 popstate가 발생했을 때(addEventListener), setCurrentPath()로 상태를 업데이트해주어 실제 화면에 컴포넌트를 리렌더링이 해줘야 한다.
  // 이때, pushState만 호출하면 컴포넌트가 리렌더링되지 않는다. 즉 pushstate가 Popstate 이벤트를 불러오지는 않는다!! React에서 주소창에 따른 UI 변경은 상태 변화에 의존하므로, URL 변경과 동시에 React 상태(currentPath)를 업데이트해야 컴포넌트를 다시 렌더링하여 사용자에게 변경된 화면을 보여줄 수 있기 때문에 setter function 또한 불러줘야 한다.
  // ex) to = '/accordion'
  const navigate = (to) => {
    // ✅ 1. 브라우저의 history를 업데이트
    // 주소창의 Url을 업데이트 하기 위해 pushState를 호출 => 주소창을 바꿈으로써 유저 속임 (실제로 컴포넌트를 렌더하는 역할  X)
    // 💥여기서는 궁극적으로 새로고침 안되게 하기 위해 window.location = ~~을 안썼다. => 유저가 앞/뒤로가기 버튼 눌렀을 때 popstate 이벤트가 호출되는데, 이때 호출되는 핸들러가 setCurrentPath(window.location.pathname)이라고 설정했을 때 새로고침 안 나타나는 이유가 바로 지금 이 코드처럼 Pushstate에 의해 추가된 url로 이동하는 것이기 때문, 그냥 Location라고 써주면 전체페이지가 새로고침돼서 SPA로선 ❌❌
    // => pushState를 사용하는 이유는 유저가 주소창을 바꾸더라도 새로고침 없이 상태만 동기화되게 하기 위함.
    window.history.pushState({}, "", to);

    // ✅ 2. React 상태 업데이트
    // currentPath state를 업데이트하기 위해 setter 함수 호출 => 컴포넌트 리렌더
    setCurrentPath(to);

    // * 결론: pushState로는 URL 변경과 React 상태를 동기화할 수 없으므로 setCurrentPath로 React 상태를 직접 업데이트해야 한다. 브라우저에서 뒤로가기가 발생했을 때도 React 상태를 동기화해야 하므로 popstate 이벤트를 감지하는 것이 필수적입니다.
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationProvider };
export default NavigationContext;
