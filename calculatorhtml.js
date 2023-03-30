const numberButton = document.querySelectorAll('.number-btn');
const operatorButton = document.querySelectorAll('.operator-btn');
const equalButton = document.querySelector('.equal-btn');
const allClearButton = document.querySelector('.clear-btn');
const deleteButton = document.querySelector('.delete-btn');
const previousOperandNumber = document.querySelector('.previous-operand');
const currentOperandNumber = document.querySelector('.current-operand');

let previousOperand = '';
let currentOperand = '';
let operator = undefined;

const addNumber = (number) => {
  if (number === '.' && currentOperand.includes('.')) {
    return;
  }
  currentOperand = currentOperand + number;
};

const showDisplay = () => {
  currentOperandNumber.innerText = currentOperand;
  previousOperandNumber.innerText = previousOperand;
};


const getOperation = () => {
  let result;
  let previousOperandToNumber = parseFloat(previousOperand);
  let currentOperandToNumber = parseFloat(currentOperand);
  if (isNaN(previousOperandToNumber) || isNaN(currentOperandToNumber)) {
    return;
  }
  switch(operator) {
    case '+':
      result = previousOperandToNumber + currentOperandToNumber;
      break;
    case '-':
      result = previousOperandToNumber - currentOperandToNumber;
      break;
    case '÷':
      if (currentOperandToNumber === 0) {
        currentOperand = 'Error. Please restart operation.';
        return;
      } else {
      result = previousOperandToNumber / currentOperandToNumber; 
      };
      break;
    case '*':
      result = previousOperandToNumber * currentOperandToNumber;
      break;  
    default: 
     return;
  }
  currentOperand = result;
  operator = undefined;
  previousOperand = '';
};

const chooseOperation = (operatorInput) => {
  if (currentOperand === '') {
    return;  
  }
  if (operatorInput === '√') {
    const currentOperandToNumber = parseFloat(currentOperand);
    if (isNaN(currentOperandToNumber) || currentOperandToNumber < 0) {
      currentOperand = 'Invalid input';
      return;
    }
    currentOperand = Math.sqrt(currentOperandToNumber).toString();
    previousOperand = '';
    return;
  }
  if (previousOperand !== '') {
    getOperation();
  }
  operator = operatorInput;
  previousOperand = currentOperand;
  currentOperand = '';
  showDisplay();
};

const handleAllClearButton = () => {
  currentOperand = '';
  previousOperand = '';
  operator = undefined;
};

const handleDeleteButton = () => {
   currentOperand = currentOperand.slice(0, -1);
   showDisplay();
};

const registerEventListeners = () => {
  deleteButton.addEventListener('click', function(){
    handleDeleteButton();
  })

  equalButton.addEventListener('click', ()=> {
    getOperation();
    showDisplay();
  })

  allClearButton.addEventListener('click', ()=> {
    handleAllClearButton();
    showDisplay();
  })
};

const displayNumbers = () => {
  numberButton.forEach((button) => {
  button.addEventListener('click', () => {
    addNumber(button.innerText);
    showDisplay();
  })
});
};

const registerOperatorButtons = () => {
  operatorButton.forEach((button) => {
    button.addEventListener('click', () => {
      chooseOperation(button.innerText);
      showDisplay();
    })
  });
};


const startCalculator = () => {
  displayNumbers();
  registerOperatorButtons();
  chooseOperation();
  registerEventListeners();
};

startCalculator();
