// import useCounter from "../hooks/use-counter";
import Button from "../components/Button";
import { useState } from "react";
import Panel from "../components/Panel";

function CounterPage({ initialCount }) {
  // const { count, increment } = useCounter(initialCount);
  const [count, setCount] = useState(initialCount);
  const [valueToAdd, setValueToAdd] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const handleChange = (e) => {
    console.log(typeof e.target.value); // string

    const value = parseInt(e.target.value) || 0; // convert to Number!
    // 1️⃣ Any data from input element will be string type of data. -> Use parseInt()!

    // 2️⃣ 0을 지우고 빈칸이 되는 순간, 컨솔에 input이 NaN이라는 경고창이 뜸 (∵ parseInt('') = NaN & input의 type속성 = number)
    // -> Add or(||) operator to set the default value as 0.
    // -> Add or(||) operator to input element (...valueToAdd의 default value = 0일 땐, 0대신 그냥 ""이 나오게끔)
    setValueToAdd(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCount(count + valueToAdd);
    setValueToAdd(0);
  };

  return (
    <Panel className="m-3">
      <h2 className="text-lg">Count is {count}</h2>
      <div className="flex flex-row">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        <input
          value={valueToAdd || ""}
          onChange={handleChange}
          type="number"
          className="p-1 m-3 bg-gray-50 border border-gray-300"
        />
        <Button>Add it!</Button>
      </form>
    </Panel>
  );
}

export default CounterPage;
