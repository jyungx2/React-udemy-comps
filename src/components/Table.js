function Table({ data, config }) {
  const renderedHeaders = config.map((column) => {
    return <th key={column.label}>{column.label}</th>;
  });

  // 258. Nested Maps
  // td요소를 일일이 쓰는게 아니라, config요소(Column)의 개수가 추가될 때마다 그 개수만큼 반영될 수 있도록 하드코딩 대신, 맵핑 함수(data arr) 안에 또 다른 맵핑 함수(config arr)를 썼다.
  // (config안에 있는 오브젝트 개수만큼 컬럼을 추가하고 싶으므로..)
  const renderedRows = data.map((fruit) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="p-2" key={column.label}>
          {column.render(fruit)}
        </td>
      );
    });
    return (
      <tr className="border-b" key={fruit.name}>
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
