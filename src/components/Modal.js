import ReactDOM from "react-dom";

// createPortal( first , second)
// ReactDOM.createPortal은 모달과 같은 UI 요소를 ✨부모 컴포넌트와 별개로 다른 DOM 노드에 렌더링✨할 수 있게 합니다. 이 방식은 레이아웃이나 스타일 충돌을 피하고, 모달이 페이지 전체를 덮는 방식으로 렌더링되게 해 줍니다.

// 1️⃣ first: JSX문법으로 작성한 Modal 요소와 오버레이 요소
// 2️⃣ second: Modal 컴포넌트가 렌더링될 실제 DOM 위치 (여기서는 `.modal-container`) ->이 요소는 일반적으로 index.html 또는 App.js의 루트에서 미리 정의되어 있어야 합니다.
// 👉 절대 positioned되지 않음 - 항상 position: static 유지 - Modal will be positioned relative to the HTML doc. - It'll always fill the entire screen!!
function Modal({ onClose, children, actionBar }) {
  return ReactDOM.createPortal(
    <div>
      {/* 오버레이 배경: 화면 전체를 덮고 어두운 배경을 만듬 */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-300 opacity-80"
      ></div>
      {/* 실제 모달: 화면 중앙에 배치 */}
      <div className="absolute inset-40 p-10 bg-white">
        {children}
        {actionBar}
      </div>
    </div>,
    document.querySelector(".modal-container")
    // class가 `.modal-container`인 요소 안에 이 모달이 렌더링됨
  );
}

export default Modal;
