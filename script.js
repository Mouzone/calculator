import operate from "./calculator_func.js"

let operation = "" // if operation was ever pressed
let left = ""
let right = ""

const display = document.querySelector(".display")
function updateDisplay(){
    if (right) {
        display.textContent = right.slice(-10)
    } else {
        display.textContent = left.slice(-10)
    }
}

function removeActive(curr_button=null) {
    operation_buttons.forEach(operation_button => {
        operation_button.classList.remove("active")
    })
    curr_button?.classList?.add("active")
}

function resultToSigFig(number){
    let precision = 4
    if (number.toString().length > 10){
        while (number.toExponential(precision).toString().length > 10) {
            precision += 1
        }
        number = number.toExponential(precision)
    }
    display.textContent = number
}

const number_buttons = document.querySelectorAll(".number")
number_buttons.forEach(number_button => {
    number_button.addEventListener("click", event => {
        if (!operation) {
            left += event.currentTarget.textContent
        } else {
            right += event.currentTarget.textContent
        }
        updateDisplay()
    })
})

const operation_buttons = document.querySelectorAll(".operation")
operation_buttons.forEach(operation_button => {
    operation_button.addEventListener("click", event => {
        if (left){
            if (!operation) {
                operation = event.currentTarget.textContent
                removeActive(event.currentTarget)
            } else if (right) {
                if (operation === "/" && parseFloat(right) === 0) {
                    display.textContent = "ERROR"
                    left = ""
                    right = ""
                    operation = ""
                    removeActive()
                } else {
                    let result = operate(parseFloat(left), parseFloat(right), operation)
                    left = result.toString()
                    right = ""
                    resultToSigFig(result)
                    removeActive(event.currentTarget)
                    operation = event.currentTarget.textContent
                }
            }
        }
    })
})

const decimal_button = document.querySelector("#decimal")
decimal_button.addEventListener("click", event => {
    if (!operation) {
        if (!left.includes(".")){
            if (!left) {
                left += "0"
            }
            left += "."
        }
    } else {
        if (!right.includes(".")){
            if (!right) {
                right += "0"
            }
            right += "."
        }
    }
    updateDisplay()
})

const clear_button = document.querySelector("#clear")
clear_button.addEventListener('mousedown', function(event) {
    let holdTimeout = setTimeout(function() {
        // Actions to perform in the hold state
        display.textContent = "0000000000"
        right = ""
        left = ""
        operation = ""
        removeActive()
        // Add your hold state actions here
    }, 500);

    function cancelHold() {
        clearTimeout(holdTimeout);
        document.removeEventListener('mouseup', cancelHold);
        document.removeEventListener('mouseleave', cancelHold);

        if (right) {
            right = right.slice(0, -1)
        } else if (operation) {
            operation = ""
            removeActive()
        } else {
            left = left.slice(0,-1)
        }
        updateDisplay()
        if (!left) {
            display.textContent = "0000000000"
        }
    }

    document.addEventListener('mouseup', cancelHold);
    document.addEventListener('mouseleave', cancelHold);
});

const equal_button = document.querySelector("#equal")
equal_button.addEventListener("click", event => {
    if (left && right && operation) {
        if (operation === "/" && parseFloat(right) === 0) {
            display.textContent = "ERROR"
            left = ""
            right = ""
            operation = ""
            removeActive()
        } else {
            let result = operate(parseFloat(left), parseFloat(right), operation)
            left = result.toString()
            right = ""
            operation = ""
            resultToSigFig(result)
        }
    }
})

document.addEventListener("keydown", event => {
    const keyValue = event.key
    let button = document.querySelector(`button[value="${keyValue}"]`);
    if (keyValue === "Enter") {
        button = document.querySelector(`button[value="="]`);
    }
    if (keyValue === "Backspace") {
        if (right) {
            right = right.slice(0, -1)
        } else if (operation) {
            operation = ""
            removeActive()
        } else {
            left = left.slice(0,-1)
        }
        updateDisplay()
        if (!left) {
            display.textContent = "0000000000"
        }
    }
    if (button) {
        button.click();
    }
})