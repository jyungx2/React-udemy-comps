import { useState } from "react";
import Table from "./Table";

function SortableTable(props) {
  // config 배열을 수정하진 않고, 이벤트 핸들러만 추가할 것이다!
  const { config, data } = props;

  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const handleClick = (label) => {
    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th onClick={() => handleClick(column.label)}>
          {getIcons(column.label, sortBy, sortOrder)}
          {column.label}
        </th>
      ),
    };
  });

  // Only sort data if sortOrder && sortBy are not null
  // Make a copy of the 'data' prop
  // Find the correct sortValue function and use it for sorting.
  let sortedData = data;
  if (sortedData && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    // we're not modifying a prop.
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;
      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  // ...props은 이미 config 프랍을 갖고 있긴 하지만, 더 나중에 쓰인 config 속성으로 덮어씌어질 것! => Overriding the previous one by adding in config.
  return (
    <div>
      {sortOrder} - {sortBy}
      <Table {...props} data={sortedData} config={updatedConfig} />
    </div>
  );
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return "Show both icons";
  }

  if (sortOrder === null) {
    return "show both icons";
  } else if (sortOrder === "asc") {
    return "show up icon";
  } else if (sortOrder === "desc") {
    return "show down icon";
  }
}

export default SortableTable;

// 1. Create Sortable Table. For now, take all props and pass then through to Table.
// 2. Make sure TablePage shows SortableTable.
// 3. Add 'sortValue' functions to column config in TablePage. Remove 'header' properties.
// 4. SortableTable should find column objects with 'sortValue' and add a 'header' function to them
// 5. TH returned by the 'header' function should watch for click events
// 6. When user clicks the TH, sort data and pass the result to Table
