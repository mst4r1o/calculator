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

let firstNum;
let secondNum;
let operator;

function operate(operator, a, b) {
    return operator(a, b);
}