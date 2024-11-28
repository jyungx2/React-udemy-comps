// number sorting (using number based comparison)
const data1 = [5, 10, 4, 3];
data1.sort((a, b) => {
  return a - b;
});

// string sorting (using string based comparison)
const data2 = ["t", "A", "a", "B", "b"];
data2.sort((a, b) => {
  return a.localeCompare(b);
  // ['a', 'A', 'b', 'B', 't']
});

// object sorting by a specific property
const data3 = [
  { name: "Tomato", cost: 10, weight: 5 },
  { name: "Carrot", cost: 15, weight: 2 },
  { name: "Onion", cost: 5, weight: 7 },
];

function getSortValue(vegetable) {
  return vegetable.cost / vegetable.weight;
}

// ascending order
// data3.sort((a, b) => {
//   const valueA = getSortValue(a);
//   const valueB = getSortValue(b);

//   // valueA, B = string or number
//   if (typeof valueA === "string") {
//     // 'string' based comparison
//     return valueA.localeCompare(valueB);
//   } else {
//     // 'number' based comparison
//     return valueA - valueB;
//   }
// });

// descending order
// desc or asc으로 바꿔줌에 따라 아래 sorting이 내림차순 또는 오름차순으로 정렬됨
const sortOrder = "asc";

data3.sort((a, b) => {
  const valueA = getSortValue(a);
  const valueB = getSortValue(b);

  const reverseOrder = sortOrder === "asc" ? 1 : -1;

  // valueA, B = string or number
  if (typeof valueA === "string") {
    // 'string' based comparison
    return valueA.localeCompare(valueB) * reverseOrder;
  } else {
    // 'number' based comparison
    return (valueA - valueB) * reverseOrder;
  }
});
