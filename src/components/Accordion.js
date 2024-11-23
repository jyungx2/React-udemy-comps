import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

function Accordion({ items }) {
  // App에 정의하지 않는 state (.'. 형제 컴포넌트에게 전달되어야 할 데이터가 아님)
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    if (expandedIndex === nextIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(nextIndex);
    }
  };

  // ⬆️ mapping function(list rendering) + event handler을 함께 사용하여 개발해야 할 때...
  // 이벤트핸들러가 여러 줄을 포함해야 한다면 당연히 longhand version 사용
  // 그런데 만약 mapping function안에서 만들어지는 밸류를 사용해야 한다면, shorthand version 또한 같이 사용해주어야 한다.
  // 💡 shorthand version으로 onClick={()=> setExpandedIndex(index)}라고만 써줘도 의도한 대로 작동은 하겠지만, 이렇게 직접적으로 이벤트핸들러를 정의해주면, 각각의 아이템마다 다른 인덱스를 가지고 있기 때문에 아이템의 개수만큼 이벤트핸들러가 실행될 것이다. -> 성능, 효율성 떨어짐
  // 즉, event handler를 mapping function(kind of loop) 밖에서 정의하여 코드의 가독성을 높여주고,(나중에 이벤트핸들러에 더 많은 코드가 추가될수도, 다른 이벤트핸들러들이 추가되면 코드를 이해하기 굉장히 어렵), 이렇게 밖으로 뺐을 때는 index와 다른 스콥에 위치하게 되어 index를 사용하지 못하기 때문에 이를 해결하기 위해 shorthand version을 사용해 index값을 바깥에 정의한 handleClick함수의 매개변수로 넘겨주도록 설정한다.
  // 💥 만약 onClick prop에 arrow function을 안쓰고, 그냥 handleClick만 보내준다면, handleClick의 매개변수는 자동적으로 event 객체가 될 것이다. => 우리가 원하는 것❌

  // ⭐️Mapping function⭐️
  const renderedItems = items.map((item, index) => {
    // 현재 인덱스가 열려있는 인덱스인지 체크하는 연산식을 하나의 변수로 만들어
    // 굳이 리턴할 때 아래 연산을 반복할 필요 없도록 하자. => 아래 변수가 true이면,
    // expanded되어야 하므로, 리턴할 때 &&을 이용해서 '컨텐트' div를 출력하자.
    // 💥label은 항상 출력되어야 하므로 isExpanded에 의해서 영향을 받으면 안됨!💥
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
        {/* rf) boolean 타입은 리액트가 출력 안함 */}
        {isExpanded && <div className="border-b p-5">{item.content}</div>}
      </div>
    );
  });

  return <div className="border-x  border-t rounded">{renderedItems}</div>;
}

export default Accordion;
