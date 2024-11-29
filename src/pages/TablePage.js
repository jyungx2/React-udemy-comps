// import Table from "../components/Table";
import SortableTable from "../components/SortableTable";
import Table from "../components/Table";

function TablePage() {
  const data = [
    { name: "Orange", color: "bg-orange-500", score: 5 },
    { name: "Apple", color: "bg-red-500", score: 3 },
    { name: "Banana", color: "bg-yellow-500", score: 1 },
    { name: "Lime", color: "bg-green-500", score: 4 },
    { name: "Cherry", color: "bg-red-700", score: 2.5 },
  ];

  const config = [
    {
      // Sortable
      label: "Name",
      render: (fruit) => fruit.name,
      sortValue: (fruit) => fruit.name,
    },
    {
      // Color column is not going to be sortable -> sortValue ❌
      label: "Color",
      render: (fruit) => <div className={`p-3 m-2 ${fruit.color}`} />,
    },
    {
      // Sortable
      label: "Score",
      render: (fruit) => fruit.score,
      // header: () => <th className="bg-red-500">Score</th>,
      sortValue: (fruit) => fruit.score,
    },
    {
      label: "Score Squared",
      render: (fruit) => fruit.score ** 2,
      sortValue: (fruit) => fruit.score ** 2,
    },
  ];

  const keyFn = (fruit) => {
    return fruit.name;
  };

  return (
    <div>
      <Table data={data} config={config} keyFn={keyFn} />
      <SortableTable data={data} config={config} keyFn={keyFn} />
    </div>
  );
}
export default TablePage;
