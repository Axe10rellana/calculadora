const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach(number => {
  number.addEventListener("click", e => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }

    dis2Num += e.target.innerText;
    display2El.innerText = dis2Num;
  });
});

operationEl.forEach(operation => {
  operation.addEventListener("click", e => {
    if (!dis2Num) result;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }

    clearVar(operationName);
    lastOperation = operationName;
  });
});

const clearVar = (name = "") => {
  dis1Num += dis2Num + " " + name + " ";
  display1El.innerText = dis1Num;
  display2El.innerText = "";
  dis2Num = "";
  tempResultEl.innerText = result;
};

const mathOperation = () => {
  if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(dis2Num) === 0 ? "No se puede dividir por 0" : parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
};

equalEl.addEventListener("click", e => {
  if (!dis1Num || !dis2Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

clearAllEl.addEventListener("click", e => {
  display1El.innerText = "0";
  display2El.innerText = "0";
  tempResultEl.innerText = "0";
  dis1Num = "";
  dis2Num = "";
  result = "";
});

clearLastEl.addEventListener("click", e => {
  display2El.innerText = "0";
  dis2Num = "";
});

window.addEventListener("keydown", e => {
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(e.key)) {
    clickButtonEl(e.key);
  } else if (["+","-", "/", "%"].includes(e.key)) {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("X");
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  }
});

const clickButtonEl = key => {
  numbersEl.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  });
};

const clickOperation = key => {
  operationEl.forEach(operation => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
};

const clickEqual = () => {
  equalEl.click();
};
