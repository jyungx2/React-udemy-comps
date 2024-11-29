// import { useState } from "react";
import useSort from "../hooks/use-sort";
import Table from "./Table";
import { GoArrowSmallDown, GoArrowSmallUp } from "react-icons/go";

function SortableTable(props) {
  // config 배열을 수정하진 않고, 이벤트 핸들러만 추가할 것이다!
  const { config, data } = props;
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(
    data,
    config
  );

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => setSortColumn(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

  // ...props은 이미 config 프랍을 갖고 있긴 하지만, 더 나중에 쓰인 config 속성으로 덮어씌어질 것! => Overriding the previous one by adding in config.
  return (
    <div>
      {/* {sortOrder} - {sortBy} */}
      <Table {...props} data={sortedData} config={updatedConfig} />
    </div>
  );
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <GoArrowSmallUp />
        <GoArrowSmallDown />
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div>
        <GoArrowSmallUp />
        <GoArrowSmallDown />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        <GoArrowSmallUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <GoArrowSmallDown />
      </div>
    );
  }
}

export default SortableTable;

// 1. Create Sortable Table. For now, take all props and pass then through to Table.
// 2. Make sure TablePage shows SortableTable.
// 3. Add 'sortValue' functions to column config in TablePage. Remove 'header' properties.
// 4. SortableTable should find column objects with 'sortValue' and add a 'header' function to them
// 5. TH returned by the 'header' function should watch for click events
// 6. When user clicks the TH, sort data and pass the result to Table
