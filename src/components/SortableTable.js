import Table from "./Table";

function SortableTable(props) {
  // config 배열을 수정하진 않고, 이벤트 핸들러만 추가할 것이다!
  const { config } = props;

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => <th>{column.label} IS SORTABLE</th>,
    };
  });

  // ...props은 이미 config 프랍을 갖고 있긴 하지만, 더 나중에 쓰인 config 속성으로 덮어씌어질 것! => Overriding the previous one by adding in config.
  return <Table {...props} config={updatedConfig} />;
}

export default SortableTable;

// 1. Create Sortable Table. For now, take all props and pass then through to Table.
// 2. Make sure TablePage shows SortableTable.
// 3. Add 'sortValue' functions to column config in TablePage. Remove 'header' properties.
// 4. SortableTable should find column objects with 'sortValue' and add a 'header' function to them
// 5. TH returned by the 'header' function should watch for click events
// 6. When user clicks the TH, sort data and pass the result to Table
