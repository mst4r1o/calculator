//Setting up basic math functions
function addNum(a, b) {
    return a + b;
};

function subtractNum(a, b) {
    return a - b;
};

function multiplyNum(a, b) {
    return a * b;
};

function divideNum(a, b) {
    return a / b;
};

//Declaring variables for math equation to take place
let prevNum = "0";
let nextNum = "";
let operator = null;

function operate(operator, a, b) {
    return operator(a, b);
};

//Setting up display
const display = document.querySelector(".display");

//Setting up number buttons
const numberBtns = document.querySelectorAll("button.number");
numberBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        nextNum += btn.name;
        display.innerHTML = nextNum;
    });
});

//Setting up operator buttons
const opBtns = document.querySelectorAll("button.operator");
opBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        operator = btn.name == "add" ? addNum
                 : btn.name == "subtract" ? subtractNum
                 : btn.name == "multiply" ? multiplyNum
                 : btn.name == "divide" ? divideNum
                 : null;
        console.log(operator);
    });
});

const equalBtn = document.querySelector("button.equal");
equalBtn.addEventListener("click", () => {
    prevNum = operate(operator, +prevNum, +nextNum);
    display.innerHTML = prevNum;
    nextNum = ""; 
})

const clearBtn = document.querySelector("button.clear");
clearBtn.addEventListener("click", () => {
    display.innerHTML = 0;
    prevNum = "";
    nextNum = "";
    operator = null;
});