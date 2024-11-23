import classNames from "classnames";
import { twMerge } from "tailwind-merge";

// 1. To include dash in the string, you have to wrap string with ""(quotes)
// const finalClassName = className("px-1.5", {
//   "bg-blue-500": true,
//   "text-yellow-500": true,
// });
// console.log(finalClassName);

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  // 174. Passing Props through
  // 여기서 ...: rest parameter (나머지 인자를 하나의 객체로 묶는 역할을 합니다)
  ...rest
}) {
  console.log(rest);
  const classes = twMerge(
    // rest 오브젝트 중에 className 속성을 가진 밸류를 뽑아내어 나머지 tailwind css속성과 함께 거대한 스트링으로 머지한다!!
    classNames(rest.className, "flex items-center px-3 py-1.5 border", {
      "border-blue-500 bg-blue-500 text-white": primary,
      "border-gray-900 bg-gray-900 text-white": secondary,
      "border-green-500 bg-green-500 text-white": success,
      "border-yellow-400 bg-yellow-400 text-white": warning,
      "border-red-500 bg-red-500 text-white": danger,
      "rounded-full": rounded,
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-400": outline && warning,
      "text-red-500": outline && danger,
    })
  );

  return (
    // Now we've made a truly reusable button component!
    // 우리는 버튼을 prop만을 이용해 커스텀할 수 있는 컴포넌트를 하나 만들었고, 어떤 prop이든 추가하면 자동으로 진짜 html button 요소에 해당하는 underlying button element으로 전달되어(forwarded) 해당 속성이 적용될 수 있게 할 수 있다!
    // 여기서 ...: spread operator (객체나 배열을 개별 값으로 풀어서 전달하는 역할)
    // ❓ 왜 rest만으로는 안 될까?
    // JSX 문법에서는 속성(props)을 전달할 때 객체 자체를 통째로 전달할 수 없습니다. 만약 그냥 rest만 전달한다면 rest를 객체로 인식하지 않고, 속성 이름으로 해석하려고 하기 때문입니다. 이는 다음과 같은 에러를 발생시킵니다 ---> <button rest>Click Me</button>
    // 👉 rest라는 속성 이름으로 해석되며, 브라우저는 이를 이해할 수 없습니다.
    // 👉 대신, ...를 사용해 객체의 속성을 펼치는 방식만 허용됩니다

    <button {...rest} className={classes}>
      {children}
      {/* prop은 객체 형태로, 아래의 데이터를 포함할 수 있다.
        {
          primary: true,
          outline: true,
          children: "Click Me!"
          onClick: () => {console.log("Click!"); }
        }
       */}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, danger, warning }) => {
    // !!: 특정 의도를 명확히 하고 안정성을 높이기 위해 사용
    // JavaScript의 타입 변환 덕분에, Number는 자동으로 truthy와 falsy 값을 숫자로 변환하여 !! 없이도 동작은 똑같이 가능.
    // 🖍️ 명시적 변환: !!를 사용하면 "이 값은 반드시 불리언으로 변환되어야 한다"는 의도를 명확히 전달합니다.
    // 🖍️ 안정성: 만약 primary가 예상치 못한 값(예: 객체, 배열)일 경우, !!는 이를 안정적으로 불리언으로 변환합니다.
    // console.log(Number([])); // 0
    // console.log(Number(!![])); // 1

    // console.log(Number({})); // NaN
    // console.log(Number(!!{})); // 1

    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);

    if (count > 1) {
      return new Error("Only one of ~~ can be written");
    }
  },
};

export default Button;

// 📍 JSX는 custom component를 만들 때, 태그 사이에 위치한 텍스트는 자동으로 children이라는 이름의 prop으로 child component로 전해지는 특별한 규칙을 갖고 있다.
// parent component에서 prop system을 이용해 child component로 굳이 보내주지 않아도, 태그 사이에 위치한 텍스트는 자동으로 child component로 전달되어 이 children Prop을 이용할 수 있다.

// #1 helper libary) prop-types
// 지금은 타입스크립트에 의해 대체되었지만, 과거에는 굉장히 인기가 많았다. 컴포넌트 간에 올바른 prop을 주고받도록 prop의 유효성을 검증해주는 라이브러리로, 만약 부적절한 밸류를 prop으로 넘겼을 때, 컨솔창에 경고가 뜨도록 한다.
// 버튼 컴포넌트가 success, primary 둘 중 하나의 속성만 가지도록 제한하고 싶을 때 사용!
// ex. <Button success primary> </Button>

// 📍 Introducing TailwindCSS
// * bulma, boostrap, etc: 특정 클래스명을 사용해 스타일링
// * tailwind: 스타일링 자체를 클래스명으로 이용하기 때문에 bulma, bootstrap보다 굉장히 긴 클래스명(=className soup)을 갖게 됨 => tailwindCSS를 쓰는 것 자체는 불만족스러울 수 있지만, 후에 갈수록 테일윈드 덕분에 smaller, reusable components를 작성할 수 있게 되는 장점을 얻게 될 것..

// #2 helper library) classnames (-> npm install classnames & npm start)
// 각기 다른 밸류를 기반으로 한 'className'을 만들기 위한 JS 라이브러리
