import classNames from "classnames";

function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames(
    "border rounded p-3 shadow bg-white w-full",
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;

// Panel 컴포넌트가 하는 일은 별다르게 없다!
// 단지 공통의 클래스네임을 classname라는 라이브러리를 이용해 기존의 클래스네임과 추가적인 클래스네임을 합쳐서 디브를 제공하는 역할이고, ...rest, children으로 이벤트핸들러와 같은 추가적인 속성과 텍스트 노드까지 다룰 수 있는 하나의 부수적인 컴포넌트이다.
// 이러한 패널 컴포넌트 사용의 이점은 우리의 어플리케이션 내에서 계속해서 ✨일정한 스타일링(consistent styling)✨을 할 수 있다는 점이다.
