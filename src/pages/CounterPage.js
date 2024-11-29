// import useCounter from "../hooks/use-counter";
import Button from "../components/Button";
// import { useState } from "react";
import { useReducer } from "react";
import Panel from "../components/Panel";

// 📍 useReducer
// 1. Alternative to useState
// 2. Produces state
// 3. Changing this state makes component rerender
// 4. Useful when you have several different closely-related pieces of state.
// 5. Useful when future state values depend on the current state

// 294. Constant Action Types
const INCREMENT_COUNT = "increment";
const SET_VALUE_TO_ADD = "change_value_to_add";

const reducer = (state, action) => {
  // state.count = state.count + 1; // ❌ Don't modify state object.
  // return { ...state, count: state.count + 1 }; // ✅ Make the brand new object and update it

  // 293. Understanding Action Objects
  if (action.type === INCREMENT_COUNT) {
    return {
      ...state,
      count: state.count + 1,
    };
  }

  if (action.type === SET_VALUE_TO_ADD) {
    return {
      ...state,
      valueToAdd: action.payload,
    };
  }

  // 🚨 No matter what, we always have to return a value from a reducer!!
  // 아무것도 리턴하지 않으면 state = undefined로 업데이트되어 아무것도 출력되지 않게 된다!! (에러 발생)
  return state; // = return a current state!
};

function CounterPage({ initialCount }) {
  // const [count, setCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);

  // 🕹️ useReducer
  // * Conventions of useReducer = Each piece of state defined as a separate variable.
  // * Conventions of useReducer = All state for the whole component defined in ✨a single object✨ => state that we're gonna refer to get a value from is "an object" as well! (ex. {count: 10, valueToAdd: 0})

  // 1️⃣ So, we need to write like state.count or state.valueToAdd.. not just count or valueToAdd.
  // 2️⃣ It's very useful when we're developing more complex App. In the aspect of debugging, we don't need to do like console.log(count, valueToAdd ....blah blah) we just have to type 'state' in console.log() to see what's going on our state ✨object!✨

  const [state, dispatch] = useReducer(reducer, {
    count: initialCount,
    valueToAdd: 0,
  });

  const increment = () => {
    // setCount(count + 1);

    // 293. Understanding Action Objects
    dispatch({
      type: INCREMENT_COUNT,
    }); // 우리가 dispatch() 호출하는 순간, React is gonna go and find reducer Fn, and call it!
  };

  const decrement = () => {
    // setCount(count - 1);
  };

  const handleChange = (e) => {
    console.log(typeof e.target.value); // string

    const value = parseInt(e.target.value) || 0; // convert to Number!
    // 1️⃣ Any data from input element will be string type of data. -> Use parseInt()!

    // 2️⃣ 0을 지우고 빈칸이 되는 순간, 컨솔에 input이 NaN이라는 경고창이 뜸 (∵ parseInt('') = NaN & input의 type속성 = number)
    // -> Add or(||) operator to set the default value as 0.
    // -> Add or(||) operator to input element (...valueToAdd의 default value = 0일 땐, 0대신 그냥 ""이 나오게끔)

    // setValueToAdd(value);

    // 293. Understanding Action Objects
    dispatch({
      type: SET_VALUE_TO_ADD,
      payload: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setCount(count + valueToAdd);
    // setValueToAdd(0);
  };

  return (
    <Panel className="m-3">
      {/* 🕹️ useReducer: count -> state.count */}
      <h2 className="text-lg">Count is {state.count}</h2>
      <div className="flex flex-row">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        {/* 🕹️ useReducer: valueToAdd -> state.valueToAdd */}
        <input
          value={state.valueToAdd || ""}
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
