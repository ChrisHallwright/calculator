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
    if (b === 0) {
        alert('Division by zero is a no-no!');
    } else {
        return a / b;
    }
}

let numA;
let numB;
let op;
let io = document.querySelector('.io');
let inputs = document.querySelector('.inputs');
let calced = false;

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
    if (io.textContent === '0') { io.textContent = '' };
    if (calced) {
        io.textContent = '';
        inputs.textContent = '';
        calced = false;
    };
    io.textContent = `${io.textContent}${d}`;
}

function getOp(o) {
    if (/[x\+-\/]/.test(io.textContent.slice(-1))) {
        return;
    }
    if (/.+[x\+-\/].+/.test(io.textContent)) {
        calc();
        calced = false;
    } else {
        if (io.textContent.slice(-1) === '%') {
            numA = parseInt(io.textContent.slice(0, -1)) / 100;
        } else {
            numA = parseInt(io.textContent);
        }
    }
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
    numB = parseInt(io.textContent.match(/[x\+-\/].+/)[0].slice(1));
    let result = operate(numA, op, numB);
    inputs.textContent = io.textContent;
    io.textContent = result;
    if (io.textContent.length > 6) {
        result = result.toPrecision(6);
        io.textContent = result;
    }
    calced = true;
    numA = result;
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

let ac = document.querySelector('#ac');
ac.addEventListener('click', () => {
    io.textContent = '0';
    inputs.textContent = '';
})

let bsp = document.querySelector('#bsp');
bsp.addEventListener('click', () => {
    io.textContent = io.textContent.slice(0, io.textContent.length - 1);
})

let pc = document.querySelector('#pc');
pc.addEventListener('click', () => {
    io.textContent += '%';
})