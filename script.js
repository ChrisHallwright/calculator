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

let op;
function whichNum() {
    if (/(?<!\()[x\/+-].+/.test(io.textContent)) {
        return 'B';
    } else {
        return 'A';
    }
}

let io = document.querySelector('.io');
let inputs = document.querySelector('.inputs');
let calced = false;

function parseNum(numText) {
    let rslt;
    let isPC = false;
    numText = numText.replace(/[\(\)]/g, '');
    if (/%/.test(numText)) {
        isPC = true;
        numText = numText.replace('%', '')
    }
    if (/\./.test(numText)) {
        rslt = parseFloat(numText);
    } else {
        rslt = parseInt(numText);
    }
    if (isPC) { rslt /= 100 }
    return rslt;
}

function getNumText(which) {
    if (which === 'A') {
        if (/(?<!\()[x\/+-]/.test(io.textContent)) {
            return io.textContent.match(/.+(?<!\()[x\/+-]/)[0].slice(0, -1);
        } else {
            return io.textContent;
        }
    } else {
        return io.textContent.match(/(?<!\()[x\/+-].+/)[0].slice(1);
    }
}

function getDigit(d) {
    if (io.textContent === '0' && d != '.') {
        io.textContent = ''
    };
    if (calced) {
        if (d === '.') {
            io.textContent = '0';
        } else {
            io.textContent = '';
        }
        inputs.textContent = '';
        calced = false;
    };
    // Don't allow double decimal points
    if (!(d === '.' && /\./.test(getNumText(whichNum())))) {
        io.textContent += d;
    }
}

function getOp(o) {
    // Avoid double operators
    if (/(?<!\()[x\/+-]/.test(io.textContent.slice(-1))) {
        return;
    }
    if (/.+(?<!\()[x\/+-].+/.test(io.textContent)) {
        calc();
    }
    if (calced && io.textContent[0] === '-') {
        io.textContent = `(${io.textContent})`;
    }
    calced = false;
    io.textContent += o;
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
    let result = operate(
        parseNum(getNumText('A')), op, parseNum(getNumText('B')));
    inputs.textContent = io.textContent;
    io.textContent = result;
    if (io.textContent.length > 6) {
        result = result.toPrecision(6);
        io.textContent = result;
    }
    calced = true;
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

let reverseSign = document.querySelector('#reverse-sign');
reverseSign.addEventListener('click', () => {
    const which = whichNum();
    let numText = getNumText(which);
    if (numText[0] === '(') {
        numText = numText.replace(/[\(\)-]/g, '');
    } else {
        numText = `(-${numText})`;
    }
    if (which === 'A') {
        io.textContent = numText;
    } else {
        io.textContent = io.textContent.match(/.+(?<!\()[x\/+-]/)[0] + numText;
    }
})