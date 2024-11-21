import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

function Accordion({ items }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    if (expandedIndex === nextIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(nextIndex);
    }
  };

  // ⬆️ mapping function(list rendering) + event handler을 함께 사용하여 개발해야 할 때...
  // event handler를 mapping function 밖에서 정의하여 리액트 엔진이 코드읽는 것을 조금이나마 수월하게 해주고, 이렇게 밖으로 뺐을 때 발생하는 에러를 해결하기 위해 shorthand version을 사용해 index값을 바깥에 정의한 handleClick함수의 매개변수로 넘겨주도록 설정한다.
  // 💥 만약 onClick prop에 arrow function을 안쓰고, 그냥 handleClick만 보내준다면, handleClick의 매개변수는 자동적으로 event 객체가 될 것이다. => 우리가 원하는 것❌
  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;

    const icon = (
      <span className="text-xl">
        {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
      </span>
    );

    return (
      <div key={item.id}>
        <div
          className="flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer"
          onClick={() => handleClick(index)}
        >
          {item.label}
          {icon}
        </div>
        {/* isExpanded = false면 그거(||이거) 써. 
        rf) boolean 타입은 리액트가 출력 안함 */}
        {isExpanded && <div className="border-b p-5">{item.content}</div>}
      </div>
    );
  });
  return <div className="border-x  border-t rounded">{renderedItems}</div>;
}

export default Accordion;
