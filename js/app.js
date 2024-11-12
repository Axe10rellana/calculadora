// DOM Variables
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");

// Variables for calc
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

// Functions
const handleNumberClick = (e) => {
  if (e.target.innerText === "." && haveDot) return;
  if (e.target.innerText === ".") haveDot = true;
  dis2Num += e.target.innerText;
  display2El.innerText = dis2Num;
};

const mathOperation = () => {
  const num1 = parseFloat(result);
  const num2 = parseFloat(dis2Num);
  switch (lastOperation) {
    case "X":
      result = num1 * num2;
      break;
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "/":
      result = num2 === 0 ? "No se puede dividir por 0" : num1 / num2;
      break;
    case "%":
      result = num1 % num2;
      break;
  }
};

const clearVar = (operation = "") => {
  dis1Num += `${dis2Num} ${operation} `;
  display1El.innerText = dis1Num;
  display2El.innerText = "";
  dis2Num = "";
  tempResultEl.innerText = result;
};

const handleOperationClick = (e) => {
  if (!dis2Num) return;
  haveDot = false;
  const operationName = e.target.innerText;
  if (dis1Num && dis2Num && lastOperation) {
    mathOperation();
  } else {
    result = parseFloat(dis2Num);
  }
  clearVar(operationName);
  lastOperation = operationName;
};

const handleEqualClick = () => {
  if (!dis1Num || !dis2Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  dis2Num = result;
  dis1Num = "";
};

const clearAll = () => {
  display1El.innerText = "0";
  display2El.innerText = "0";
  tempResultEl.innerText = "0";
  dis1Num = "";
  dis2Num = "";
  result = "";
  lastOperation = "";
  haveDot = false;
};

const clearLastEntry = () => {
  display2El.innerText = "0";
  dis2Num = "";
};

const handleKeyPress = (e) => {
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(e.key)) {
    clickButtonEl(e.key);
  } else if (["+", "-", "/", "%"].includes(e.key)) {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("X");
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === "Backspace") {
    deleteLastDigit();
  }
};

const clickButtonEl = (key) => {
  numbersEl.forEach(button => {
    if (button.innerText === key) button.click();
  });
};

const clickOperation = (key) => {
  operationEl.forEach(operation => {
    if (operation.innerText === key) operation.click();
  });
};

const clickEqual = () => equalEl.click();

const deleteLastDigit = () => {
  if (display2El.innerText === (result !== null ? result.toString() : "")) {
    clearAll();
  } else if (dis2Num) {
    dis2Num = dis2Num.slice(0, -1);
    display2El.innerText = dis2Num || "0";
  }
};

// Events
numbersEl.forEach(number => number.addEventListener("click", handleNumberClick));
operationEl.forEach(operation => operation.addEventListener("click", handleOperationClick));
equalEl.addEventListener("click", handleEqualClick);
clearAllEl.addEventListener("click", clearAll);
clearLastEl.addEventListener("click", clearLastEntry);
window.addEventListener("keydown", handleKeyPress);