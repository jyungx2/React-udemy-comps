import { Fragment } from "react";
// 💡 React는 기본적으로 아래의 <Echo/> 같은 역할의 빈 컴포넌트(<Fragment />)를 제공해준다!
// <Fragment/>: 리턴되는 요소에 key prop같은 것을 전달해야 하는데, 돔에는 아무것도 표시하고 싶지 않을 때 사용

// function Echo({ children }) {
//   return children;
// }

function Table({ data, config, keyFn }) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
      // 💡 맵핑 함수 안의 리스트를 리턴할 때는 key 속성과 함께 리턴해야 한다.
      // => Key 속성을 넣으려면 리턴값을 감쌀 태그가 필요하다!
      // 🚨 HTML 상으로 <tr> 요소 안에 <div> 넣는 것은 불가능
      // 🚨 <th> 안에 <th>를 넣는 것도 불가능
      // => <Fragment>라는 컴포넌트를 사용해야 되는 상황!
    }
    return <th key={column.label}>{column.label}</th>;
  });

  // 258. Nested Maps
  // td요소를 일일이 쓰는게 아니라, config요소(Column)의 개수가 추가될 때마다 그 개수만큼 반영될 수 있도록 하드코딩 대신, 맵핑 함수(data arr) 안에 또 다른 맵핑 함수(config arr)를 썼다.
  // (config안에 있는 오브젝트 개수만큼 컬럼을 추가하고 싶으므로..)
  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="p-2" key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      // key={rowData.name} - name이라는 속성을 가지고 있다고 가정하고 하드코딩한 것 ... 함수로 바꿔야 한다!
      <tr className="border-b" key={keyFn(rowData)}>
        {renderedCells}
        {/* <td className="p-3">{fruit.name}</td>
        <td className="p-3">
          <div className={`p-3 m-2 ${fruit.color}`}></div>
        </td>
        <td className="p-3">{fruit.score}</td> */}
      </tr>
    );
  });

  return (
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2">
          {/* 255. Dynamic Table Headers */}
          {renderedHeaders}
        </tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}
export default Table;
