import { useState } from "react";

const btnValues = [
  ["+", "-", "x", "÷"],
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
  [0, ".", "AC", "="],
];

export default function App() {
  return (
    <>
      <div className="title">
        <h1>Calculator App</h1>
      </div>
      <div className="app">
        <Calculator />;
      </div>
    </>
  );
}

function Calculator() {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  function numClickHandler(e) {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num:
        calc.num === 0 && value === "0"
          ? "0"
          : calc.num % 1 === 0
          ? Number(calc.num + value)
          : calc.num + value,
      res: !calc.sign ? 0 : calc.res,
    });
  }

  function resetClickHandler() {
    setCalc({ sign: "", num: 0, res: 0 });
  }

  function operatorClickHandler(e) {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  }

  function enterClickHandler() {
    if (calc.sign && calc.num) {
      const sum = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "x"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === 0 && calc.sign === "/"
            ? "Undefined"
            : sum(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  }

  function decimalClickHandler(e) {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  }

  return (
    <div className="calculator">
      <Screen value={calc.num ? calc.num : calc.res} />
      <Buttons>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={
                btn === "="
                  ? "button button--enter"
                  : btn === "+" || btn === "-" || btn === "x" || btn === "÷"
                  ? "button button--operator"
                  : "button"
              }
              value={btn}
              onClick={
                btn === "AC"
                  ? resetClickHandler
                  : btn === "="
                  ? enterClickHandler
                  : btn === "+" || btn === "-" || btn === "x" || btn === "÷"
                  ? operatorClickHandler
                  : btn === "."
                  ? decimalClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </Buttons>
    </div>
  );
}

function Screen({ value }) {
  return <div className="screen">{value}</div>;
}

function Buttons({ children }) {
  return <div className="buttons">{children}</div>;
}

function Button({ className, value, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}
