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
        if (nextNum.indexOf(".") != -1 && btn.name == ".") return;
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
        if (operator != null && !equalPressed) {
            prevNum = operate(operator, +prevNum, +nextNum);
        } else if (equalPressed) {
            nextNum = "";
        } else {
            prevNum = nextNum !== "" ? nextNum : prevNum;
        }

        nextNum = "";
        equalPressed = false;
        if (prevNum % 1 != 0) prevNum = Math.round(prevNum * 10 ** 7) / 10 ** 7;
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
        display.innerHTML = "nice try";
        return;
    }

    if (operator == null) {
        prevNum = nextNum;
    } else {
        prevNum = operate(operator, +prevNum, +nextNum);
    }
    equalPressed = true;
    if (prevNum % 1 != 0) prevNum = Math.round(prevNum * 10 ** 7) / 10 ** 7;
    display.innerHTML = prevNum;
});

const backBtn = document.querySelector("button.backspace");
backBtn.addEventListener("click", () => {
    nextNum = nextNum.slice(0, nextNum.length - 1);
    display.innerHTML = nextNum == "" ? 0 : nextNum;
});

const clearBtn = document.querySelector("button.clear");
clearBtn.addEventListener("click", () => {
    display.innerHTML = 0;
    prevNum = "0";
    nextNum = "";
    operator = null;
    equalPressed = false;
});


// Set up Keyboard Support
document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    if (keyName.match(/[0-9.]/)) {
        if (nextNum.indexOf(".") != -1 && keyName == ".") return;
        if (equalPressed) {
            prevNum = "0";
            nextNum = "";
            operator = null;
        }
        nextNum += keyName;
        display.innerHTML = nextNum;
        equalPressed = false;
    }
    console.log(keyName);

    if (keyName.match(/[-*+/]/)) {
        if (operator != null && !equalPressed) {
            prevNum = operate(operator, +prevNum, +nextNum);
        } else if (equalPressed) {
            nextNum = "";
        } else {
            prevNum = nextNum !== "" ? nextNum : prevNum;
        }

        nextNum = "";
        equalPressed = false;
        if (prevNum % 1 != 0) prevNum = Math.round(prevNum * 10 ** 7) / 10 ** 7;
        display.innerHTML = prevNum;

        operator = keyName == "+" ? addNum
                 : keyName == "-" ? subtractNum
                 : keyName == "*" ? multiplyNum
                 : keyName == "/" ? divideNum
                 : null;
    }

    if (keyName == "Backspace") {
        backBtn.click();
    }

    if (keyName == "Enter") {
        equalBtn.click();
    }

    if (keyName == "Escape") {
        clearBtn.click();
    }
})