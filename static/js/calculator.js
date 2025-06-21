let expression = "";
let displayExpression = "";

function appendToExpression(value) {
    const lastChar = expression.slice(-1);
    const operators = ["+", "-", "*", "/"];
    const displayOperators ={
        "*": "×",
        "/": "÷",
        "+": "+",
        "-": "−"
    }

    // Prevent double operators
    if (operators.includes(value)) {
        if (expression !== "" && !operators.includes(lastChar)) {
            expression += value;
            displayExpression += displayOperators[value];

        }
    } else {
        expression += value;
        displayExpression += value;
    }

    document.getElementById("display").value = displayExpression;
}

function calculate() {
    try {
        if (expression.includes("/0")) {
            throw new Error("Division by zero");
        }

        const result = eval(expression);
        document.getElementById("display").value = result;
        expression = result.toString();
        displayExpression = result.toString();
    } catch (error) {
        document.getElementById("display").value = "Error";
        expression = "";
    }
}

function clearDisplay() {
    expression = "";
    displayExpression;
    document.getElementById("display").value = "";
}

function backspace(){
    if(expression.length > 0){
        expression = expression.slice(0,-1);
        displayExpression = displayExpression.slice(0,-1);
        document.getElementById("display").value =displayExpression;
    }
}
