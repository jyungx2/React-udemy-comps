import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";

function Dropdown({ options, value, onChange }) {
  // isOpen 데이터는 다른 컴포넌트가 알아야할 필요 없음 -> Dropdown 컴포넌트에 정의
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef(); // have a ref to some div elements.

  useEffect(() => {
    const handler = (event) => {
      // 🖍️If we don't have a reference to any div just return early from the handler.
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }

      console.log(divEl.current);
      // not just playing a direct reference to the div element on the screen.
      // => object with "current property" (= reference to our div.)
      // ✨divEl.current = actual reference to our div.
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
    // setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  const handleOptionClick = (option) => {
    // 1. CLOSE DROPDOWN
    setIsOpen(false); // item 하나를 클릭하면 전체적으로 close

    // 2. WHAT OPTION DID THE USER CLICK ON??
    // event.target.value = undefined (input요소에서만 사용가능한 것!!)
    onChange(option); // Use long & short hand version of event handler together so that you get the option object in the mapping function.) ✨이때, dropdown을 input요소처럼 controlled component로 만들 필요성 있음... 유저가 인풋에 입력한 값을 handleChange로 setTitle(event.target.value)으로 업데이트한 것처럼, 이번에는 handleSelect라는 이름의 함수로 유저가 클릭한 아이템을 보여줄 것. => 이 selection state는 다른 컴포넌트가 알아야 할 가능성이 있으므로(ex. 선택된 아이템과 개수에 따른 total 금액 계산 필요) App.js에 정의
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    // 💡 ref라는 prop에 useRef로 만든 변수를 집어넣으면 리액트는 이걸 가지고 우리가 JSX에 의해 만들어진 브라우저에 있는 실제 HTML 요소를 참조할 수 있게끔 해준다.
    // 🖍️ 현재는 아래 div가 언제나 보이게끔 설정되어 있지만, 나중에 이 div가 어느 경우에는 안보이게끔 토글기능이 포함되어 있을 수 있다. 즉, div 요소가 화면에서 보이지 않아 divEl.current = null인 경우도 있을 것! => 이런 경우도 위의 useEffect 함수에서 체크하면 좋다.
    <div ref={divEl} className="w-48 relative">
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        {value?.label || "Select..."}
        <GoChevronDown className="text-lg" />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  );
}

export default Dropdown;
