document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let calculationDone = false; // Flag to track if a calculation has been done
    let storedResult = null; // Variable to store the result of the calculation

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = button.textContent;
            if (value === '=') {
                calculate();
            } else if (value === 'C') {
                clear();
            } else if (value === 'DEL') {
                deleteLast();
            } else if (value === '.') {
                addDot();
            } else {
                if (calculationDone && !isOperator(value)) { // If a calculation has been done and the input is not an operator, clear the display
                    display.value = '';
                    calculationDone = false;
                }
                display.value += value;
            }
        });
    });

    function calculate() {
        let expression = display.value;
        expression = expression.replace(/\^/g, '**');
        try {
            // Use the Function constructor to avoid direct use of eval
            const result = Function(`return ${expression}`)();
            if (!isNaN(result)) {
                storedResult = result; // Store the result only if it's a valid number
            }
            display.value = result;
            calculationDone = true; // Set flag to true after calculation
        } catch (error) {
            display.value = 'Error';
        }
    }

    function clear() {
        display.value = '';
        calculationDone = false;
    }

    function deleteLast() {
        display.value = display.value.slice(0, -1);
    }

    function addDot() {
        const lastValue = display.value.split(/[\+\-\*\/\^]/).pop();
        if (!lastValue.includes('.')) {
            display.value += '.';
        }
    }

    function isOperator(value) {
        return ['+', '-', '*', '/', '^'].includes(value);
    }
});