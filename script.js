function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b != 0) {
        return a / b;
    }
}

let numA;
let numB;
let op;

function operate(a, op, b) {
    switch (op) {
        case 'add':
            return add(a, b);
            break;
        case 'subtract':
            return subtract(a, b);
            break;
        case 'multiply':
            return multiply(a, b);
            break;
        case 'divide':
            return divide(a, b);
            break;
    }
}

function getDigit(d) {
    let io = document.querySelector('.io');
    io.textContent = `${io.textContent}${d}`;
}

function getOp(o) {
    let io = document.querySelector('.io');
    numA = parseInt(io.textContent);
    io.textContent = `${io.textContent}${o}`;
    switch (o) {
        case '/':
            op = 'divide';
            break;
        case 'x':
            op = 'multiply';
            break;
        case '-':
            op = 'subtract';
            break;
        case '+':
            op = 'add';
            break;
    }
}

function calc() {
    let io = document.querySelector('.io');
    numB = parseInt(io.textContent.match(/[x\+-\/].+/)[0].slice(1));
    let result = operate(numA, op, numB);
    let inputs = document.querySelector('.inputs');
    inputs.textContent = io.textContent;
    io.textContent = result;
}

let digits = document.querySelectorAll('.num');
digits.forEach(digitBtn => {
    if (digitBtn.textContent != '+/-') {
        digitBtn.addEventListener('click', () => getDigit(digitBtn.textContent));
    }
}); 

let operators = document.querySelectorAll('.op');
operators.forEach(opBtn => {
    if (opBtn.textContent === '=') {
        opBtn.addEventListener('click', () => calc());
    } else {
        opBtn.addEventListener('click', () => getOp(opBtn.textContent));
    }
}); 