const screen = document.getElementById("screen");  // get the calculator screen element
const buttons = document.querySelectorAll('button');  // get all calculator buttons

// store current input, previous value, and operator
let current = '';
let previous = '';
let operator = null;

function updateScreen(value) {  // update the display screen
    screen.innerText = value || '0';  // if value is empty show 0
}

function appendNumber(num) {  // appends num to current input
    current += num;  // add num to current input
    updateScreen(current);  // updates display
}

function chooseOperator(op) {  // handles operator selection
    if (current === '') return;  // no current num -> do nothing
    if (previous !== '') compute();  // previous value -> compute first
    operator = op;  // store operator
    previous = current;  // move current value to previous
    current = '';  // set current to empty
}

function compute() {  // calculation
    let result;
    const prev = parseFloat(previous);  // convert string to float (number)
    const curr = parseFloat(current);  // convert string to float (number)

    if (isNaN(prev) || isNaN(curr)) return;  // invalid -> stop

    switch (operator) {  // operation performed based on operator
        case '+': result = prev + curr; break;  // add
        case '-': result = prev - curr; break;  // subtract
        case '*': result = prev * curr; break;  // multiply
        case '/': result = curr === 0 ? 'Error' : prev / curr; break;  // divide; prevent division by 0
        default: return;
    }

    current = result.toString();  // store result (as string)
    operator = null;  // reset operator
    previous = '';  // reset previous value
    updateScreen(current);  // update display
}

function backspace() {  // removes last digit
    current = current.slice(0, -1);  // remove last character from input
    updateScreen(current);  // updates display
}

function clearAll() {  // clears (resets) everything
    current = '';
    previous = '';
    operator = null;
    updateScreen('0');
}

// add click event listeners to all buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.value;  // get button value/operator
        const action = btn.dataset.action;  // get button action (clear/equals)

        if (value) {  // button has value/operator
            if (['+', '-', '*', '/'].includes(value)) {  // if operator
                chooseOperator(value);
            } else {  // otherwise number
                appendNumber(value);
            }
        }

        // handles actions
        if (action === 'clear') clearAll();
        if (action === 'equals') compute();
        if (action === 'backspace') backspace();
    });
});

