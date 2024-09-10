const operation = {
  prevNumber: "",
  currNumber: "",
  operator: "",
  isCalculated: false,
};

const calculator = (function () {
  function add(num1, num2) {
    return num1 + num2;
  }

  function substract(num1, num2) {
    return num1 - num2;
  }

  function multiply(num1, num2) {
    return num1 * num2;
  }

  function divide(num1, num2) {
    return num1 / num2;
  }

  function modulo(num1, num2) {
    return num1 % num2;
  }

  return {
    add,
    substract,
    multiply,
    divide,
    modulo,
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  //FETCH DOM ELEMENTS
  const clearBtn = document.querySelector("#allclear");
  const backBtn = document.querySelector("#back");
  const decimalBtn = document.querySelector("#decimal");

  const numberBtns = document.querySelectorAll('button[data-type="number"]');
  const operatorBtns = document.querySelectorAll(
    'button[data-type="operator"]'
  );
  const equalBtn = document.querySelector('button[data-type="equal"]');

  const lastOperationScreen = document.querySelector("#lastOperationScreen");
  const currentOperationScreen = document.querySelector(
    "#currentOperationScreen"
  );

  /**
   * ADD EVENT LISTENER TO KEYDOWN EVENTS
   */
  window.addEventListener("keydown", (e) => {
    const CODE = e.code;
    switch (CODE) {
      //HANDLE NUMBER KEYS
      case "Digit0":
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
      case "Digit7":
      case "Digit8":
      case "Digit9":
      case "Numpad0":
      case "Numpad1":
      case "Numpad2":
      case "Numpad3":
      case "Numpad4":
      case "Numpad5":
      case "Numpad6":
      case "Numpad7":
      case "Numpad8":
      case "Numpad9":
        handleNumberInput(CODE.slice(-1));
        break;

      // HANDLE OPERATORS KEYS
      case "NumpadAdd":
      case "Equal":
        handleOperatorInput("+");
        break;
      case "NumpadSubtract":
      case "Minus":
        handleOperatorInput("-");
        break;
      case "NumpadMultiply":
      case "KeyX":
        handleOperatorInput("*");
        break;
      case "NumpadDivide":
      case "Slash":
        handleOperatorInput("/");
        break;

      // SPECIAL SYMBOLS KEYS
      case "Enter":
      case "NumpadEnter":
        handleEquatorInput();
        break;
      case "Backspace":
      case "Delete":
        handleBackspace();
        break;
      case "Escape":
        clearCalculator();
        break;
      case "Period":
      case "NumpadDecimal":
        handleDecimalPoint();
        break;
    }
  });

  clearBtn.addEventListener("click", () => clearCalculator());

  backBtn.addEventListener("click", () => handleBackspace());

  decimalBtn.addEventListener("click", () => handleDecimalPoint());

  numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () =>
      handleNumberInput(numberBtn.value)
    );
  });

  operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", () =>
      handleOperatorInput(operatorBtn.value)
    );
  });

  equalBtn.addEventListener("click", () => handleEquatorInput());

  /**
   * Handle the event when user inputs numbers. Store it as current number and update the DOM
   * @param {string} value - The input value of number from keydown or click event
   */
  function handleNumberInput(value) {
    if (operation.isCalculated) return;
    currentOperationScreen.innerText === "0"
      ? (currentOperationScreen.innerText = value)
      : (currentOperationScreen.innerText += value);
    operation.currNumber = Number(currentOperationScreen.innerText);
  }

  /**
   * Handle the event of decimal input, and prevent multiple decimal input
   */
  function handleDecimalPoint() {
    if (operation.isCalculated) return;
    if (currentOperationScreen.innerText.indexOf(".") == "-1") {
      currentOperationScreen.innerText += ".";
      operation.currNumber = parseFloat(currentOperationScreen.innerText);
    }
  }

  /**
   * Handle the event when user inputs operators. Store it as current operator and update the DOM.
   * If there is no current number, modify the operator only, otherwise update the current number as previous number
   * @param {string} value - The input value of operator from keydown or click event
   */
  function handleOperatorInput(value) {
    if (operation.isCalculated) return;
    if (operation.prevNumber && operation.currNumber) handleOperation();

    if (currentOperationScreen.textContent === "") {
      lastOperationScreen.textContent = operation.prevNumber + " " + value;
    } else {
      lastOperationScreen.textContent =
        currentOperationScreen.textContent + " " + value;
      operation.prevNumber = operation.currNumber;
      operation.currNumber = "";
    }
    operation.operator = value;
    currentOperationScreen.textContent = "";
  }

  /**
   * Handle the event when user hit backspace or delete key. Remove the last digit and display 0 when there's no more digit
   */
  function handleBackspace() {
    if (operation.isCalculated) {
      return clearCalculator();
    }
    let currentDigit = currentOperationScreen.innerText;
    currentOperationScreen.innerText = currentDigit.substring(
      0,
      currentDigit.length - 1
    );
    if (currentOperationScreen.innerText === "")
      currentOperationScreen.innerText = "0";
  }

  /**
   * Handle the event when user hit equator key. Do the operation and display the result
   */
  function handleEquatorInput() {
    if (operation.currNumber !== "" && operation.prevNumber !== "") {
      lastOperationScreen.textContent +=
        currentOperationScreen.textContent + " = ";
      handleOperation();
      operation.isCalculated = true;
    }
  }

  /**
   * Handle the clear function to reset all status.
   */
  function clearCalculator() {
    operation.prevNumber = "";
    operation.currNumber = "";
    operation.operator = "";
    operation.isCalculated = false;
    lastOperationScreen.textContent = "";
    currentOperationScreen.textContent = "0";
  }

  /**
   * Handle the logical function of operation
   */
  function handleOperation() {
    let result;
    const { operator, prevNumber, currNumber } = operation;
    switch (operator) {
      case "+":
        result = calculator.add(prevNumber, currNumber);
        break;
      case "-":
        result = calculator.substract(prevNumber, currNumber);
        break;
      case "*":
        result = calculator.multiply(prevNumber, currNumber);
        break;
      case "/":
        result = calculator.divide(prevNumber, currNumber);
        break;
      case "%":
        result = calculator.modulo(prevNumber, currNumber);
        break;
    }
    currentOperationScreen.textContent = result;
    operation.currNumber = result;
    operation.prevNumber = "";
    operation.operator = "";
  }
});
