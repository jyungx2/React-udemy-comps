// import useCounter from "../hooks/use-counter";
import Button from "../components/Button";
// import { useState } from "react";
import { useReducer } from "react";
import Panel from "../components/Panel";
import { produce } from "immer";

// 📍 useReducer
// 1. Alternative to useState
// 2. Produces state
// 3. "Changing this state makes component rerender"
// 4. Useful when you have several different "closely-related pieces of state.""
// 5. Useful when future "state values depend on the current state"

// 294. Constant Action Types
const INCREMENT_COUNT = "increment";
const SET_VALUE_TO_ADD = "change_value_to_add";
const DECREMENT_COUNT = "decrement";
const ADD_VALUE_TO_COUNT = "add_value_to_count";

const reducer = (state, action) => {
  // state.count = state.count + 1; // ❌ Don't modify state object.
  // return { ...state, count: state.count + 1 }; // ✅ Make the brand new object and update it

  // 293. Understanding Action Objects
  // if (action.type === INCREMENT_COUNT) {
  //   return {
  //     ...state,
  //     count: state.count + 1,
  //   };
  // }

  // if (action.type === SET_VALUE_TO_ADD) {
  //   return {
  //     ...state,
  //     valueToAdd: action.payload,
  //   };
  // }

  // 295. Refactoring to a Switch
  switch (action.type) {
    case INCREMENT_COUNT:
      // return {
      //   ...state,
      //   count: state.count + 1,
      // };

      // ✨ If you're using Immer...
      state.count = state.count + 1;
      return;

    case SET_VALUE_TO_ADD:
      // return {
      //   ...state,
      //   valueToAdd: action.payload,
      // };

      // ✨ If you're using Immer...
      state.valueToAdd = action.payload;
      return;

    case DECREMENT_COUNT:
      // return {
      //   ...state,
      //   count: state.count - 1,
      // };

      // ✨ If you're using Immer...
      state.count = state.count - 1;
      return;

    case ADD_VALUE_TO_COUNT:
      // ✨ If you're using Immer...
      // state.count = state.count + state.valueToAdd;
      // state.valueToAdd = 0;
      // return;

      return {
        // 297. A Few Design Considerations Around Reducers
        // 🍎 1. 굳이 ...state를 쓸 필요가 있을까? 어차피 count, valueToAdd 속성으로 덮혀씌어 질텐데..
        // 지금 당장은 이 두가지 상태값만 쓰이고 있지만, 나중에 기능이 추가되거나 새로운 기능이 개발되어야 할 때, 또 다른 상태값들이 마구마구 추가될 가능성이 충분히 존재!! 따라서 다른 상태값들도 무조건 포함시켜 리턴해야 하기 때문에 ...state으로 current state값을 무조건 복사한 후에, 몇몇 특정 상태값만 새로운 값으로 overwrite해야 한다.
        ...state,
        // 🍏 2. 보통 더 많은 로직은 reducer 함수에, dispatch 함수는 최대한 간단하게 유지하는 게 좋다. -> 뭐를 위해? 오타 방지를 위해!!
        // 1️⃣ 이런 전략은 여러 곳에서 같은 action을 dispatch해야 될 때도 dispatch()가 리턴하는 action 객체 안에 코드를 쓰지 않고, Reducer()에 딱 한 번만 쓰면 되기 때문에 더 적은 코드만으로 기능을 구현할 수 있다.
        // 2️⃣ 또한, reducer의 목적 또한 state가 바뀌는 방법을 매우 구체적으로 적는 것이기 때문에, action객체가 아닌, reducer함수에 state.count + state.valueToAdd을 적어주는 것이 나은 방법이다.

        // count: action.payload, ❌
        count: state.count + state.valueToAdd,
        valueToAdd: 0,
      };

    default:
      // ✅default case에 해당하는 리턴값이 반환된다는 것은 우리가 예상하지 못한
      // 타입의 액션을 요청(dispatch) 했다는 것이다.

      // 🗣️ 1. 어떤 사람들은 이렇게 Default case가 반환되는 경우, 프로그램상 문제가 있다고 판단하여 아래와 같이 에러를 던지는 코드를 작성하기도 한다.
      // throw new Error("unexpected action type: " + action.type);

      // 🗣️ 2. 하지만 또 어떤 사람들은, 예상치 못한 액션 타입을 dispatch했다고 해서 뭐 문제될 거 있어? 그냥 실수로 넘길 수도 있는거지. 라고 받아들이고, 굳이 이것 때문에 에러를 남기기 싫어한다. => 그냥 current state 리턴.
      return state;

    // 👉 둘 중 어떤 걸 선택할 지는 개인 취향!
    // Do you want to throw an error like 'hey, I'm seeing an action type that I wasn't expecting'?
    // Or do you want to ignore it and continue on?
  }

  // 🚨 No matter what, we always have to return a value from a reducer!!
  // 아무것도 리턴하지 않으면 state = undefined로 업데이트되어 아무것도 출력되지 않게 된다!! (에러 발생)
  // return state; // = return a current state!
};

function CounterPage({ initialCount }) {
  // const [count, setCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);

  // 🕹️ useReducer
  // * Conventions of useReducer = Each piece of state defined as a separate variable.
  // * Conventions of useReducer = All state for the whole component defined in ✨a single object✨ => state that we're gonna refer to get a value from is "an object" as well! (ex. {count: 10, valueToAdd: 0}) => 초기 상태 값은 보통 객체 형태로 정의되며, 상태 트리의 기본 값을 지정합니다

  // 1️⃣ So, we need to write like state.count or state.valueToAdd.. not just count or valueToAdd.
  // 2️⃣ It's very useful when we're developing more complex App. In the aspect of debugging, we don't need to do like console.log(count, valueToAdd ....blah blah) we just have to type 'state' in console.log() to see what's going on our state ✨object!✨

  // ✨ If you're using Immer... Wrap the 'reducer' function with 'produce' function! (💥순수 Redux만으로 개발된 어플리케이션에서는 보통 immer 라이브러리는 잘 쓰지 않는다.)
  // 👉 reducer 함수는 상태(state)를 업데이트하는 로직을 담고 있는 순수 함수
  // 👉 dispatch 함수는 단순히 "무언가 해야 한다"는 신호를 보내는 역할!
  // : 특정 action 객체를 reducer에 전달하여 해당 reducer 함수에 현재 상태와 action을 넘겨주어 상태를 업데이트한다.

  // 👉 useReducer(reducer, initialState)의 두 번째 매개변수는 초기 상태 값
  // : 초기 상태 값은 보통 객체 형태로 정의되며, 상태 트리의 기본 값을 지정
  const [state, dispatch] = useReducer(produce(reducer), {
    count: initialCount,
    valueToAdd: 0,
  });

  console.log(state);

  const increment = () => {
    // setCount(count + 1); // setter function 쓰는 대신에 action객체를 해당 상태를 다루는 (해당 상태관리를 담당하는) reducing 함수에 dispatch하면, 특정 로직이 실행되어 state 변경 -> 화면 리렌더링

    // 293. Understanding Action Objects
    dispatch({
      type: INCREMENT_COUNT,
    }); // dispatch()를 호출하면 React는 해당 액션 타입에 맞는 reducer 함수를 찾아서 호출한다!

    // ref) dispatch()는 단 하나의 인자(action 객체)만 받을 수 있다.
    // ❗️ 만약 하나 이상의 인자를 전달하려 하면 무시된다.
    // reducer 함수도 두 가지 인자(state와 action)만 받아 동작한다.
    // 간결한 구조 덕분에 데이터 흐름이 예측 가능하다.
  };

  const decrement = () => {
    // setCount(count - 1);

    dispatch({
      type: DECREMENT_COUNT, // I'm going to dispatch an action object with a type of 'DECREMENT_COUNT' which we defined already in order to prevent making typos.
    });
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
    // action obj : { type: ~~ , payload: ~~ } => "convention"
    dispatch({
      type: SET_VALUE_TO_ADD,
      payload: value, // 🙇‍♀️
      // 👉 payload는 액션 객체의 속성으로, 리듀서에서 특정 로직을 실행할 때 사용할 추가 데이터
      // action.payload 이 값은 나중에 Toolkit을 사용하면 ✨action creator의 매개변수로 들어가는 인자값에 해당✨한다. action creator는 액션 객체를 자동으로 만들어주는데, 이때 payload값은 action creator의 매개변수에 해당하고, type값은 해당 리듀서(여러 리듀서 존재)의 name 속성 + '/' + 리듀서 이름으로 구성되어 내부적으로 만들어진다.
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setCount(count + valueToAdd);
    // setValueToAdd(0);

    dispatch({
      type: ADD_VALUE_TO_COUNT,
      // 🍏 action 객체에 써주는 것은 좋은 방법이 아니다!!
      // -> reducer() 함수에 적도록 하자.
      // payload: state.count + state.valueToAdd,
    });
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
