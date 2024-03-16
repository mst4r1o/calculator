// Setting up basic math functions
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

// Declaring variables for math equation to take place
let prevNum = "0";
let nextNum = "";
let operator = null;
let equalPressed = false;

function operate(operator, a, b) {
    return operator(a, b);
};

// Setting up display
const display = document.querySelector(".display");

// Setting up number buttons
const numberBtns = document.querySelectorAll("button.number");
numberBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log(btn.name);
        if (equalPressed) {
            prevNum = "0";
            nextNum = "";
            operator = null;
        }
        nextNum += btn.name;
        display.innerHTML = nextNum;
        equalPressed = false;
    });
});

// Setting up operator buttons
const opBtns = document.querySelectorAll("button.operator");
opBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log(btn.name, operator);

        if (operator != null && !equalPressed) {
            console.log("not null");
            prevNum = operate(operator, +prevNum, +nextNum);
        } else if (equalPressed) {
            nextNum = "";
        } else {
            prevNum = nextNum !== "" ? nextNum : prevNum;
        }

        nextNum = "";
        equalPressed = false;
        display.innerHTML = prevNum;

        operator = btn.name == "add" ? addNum
                 : btn.name == "subtract" ? subtractNum
                 : btn.name == "multiply" ? multiplyNum
                 : btn.name == "divide" ? divideNum
                 : null;
    });
});

const equalBtn = document.querySelector("button.equal");
equalBtn.addEventListener("click", () => {
    console.log(equalBtn.name, operator);
    if (operator == divideNum && nextNum == 0) {
        clearBtn.click();
        display.innerHTML = "Don't even.";
        return;
    }
    
    if (operator == null) {
        prevNum = nextNum;
    } else {
        prevNum = operate(operator, +prevNum, +nextNum);
    }
    equalPressed = true;
    display.innerHTML = prevNum;
});

const clearBtn = document.querySelector("button.clear");
clearBtn.addEventListener("click", () => {
    display.innerHTML = 0;
    prevNum = "0";
    nextNum = "";
    operator = null;
    equalPressed = false;
});