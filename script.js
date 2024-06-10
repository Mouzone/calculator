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
    if (number.toString().length <= 10){
        updateDisplay()
        return
    }
    let MAX_LENGTH = 10
    let exponentLength = Math.floor(Math.log10(Math.abs(number))).toString().length;
    let precision = MAX_LENGTH - 5 - exponentLength;  // Adjust 5 for "e+XX" and the decimal point

    if (precision < 0) precision = 0;  // Ensure precision is not negative

    display.textContent = number.toExponential(precision);
}

const number_buttons = document.querySelectorAll(".number")
const equal_button = document.querySelector("#equal")
number_buttons.forEach(number_button => {
    number_button.addEventListener("click", event => {
        equal_button.classList.remove("active")
        if (!operation) {
            if (left === "0"){
                left = ""
            }
            left += event.currentTarget.textContent
        } else {
            if (right === "0"){
                right = ""
            }
            right += event.currentTarget.textContent
        }
        updateDisplay()
    })
})

const operation_buttons = document.querySelectorAll(".operation")
operation_buttons.forEach(operation_button => {
    operation_button.addEventListener("click", event => {
        if (left){
            if (!operation && event.currentTarget.textContent !== "=") {
                operation = event.currentTarget.textContent
                removeActive(event.currentTarget)
            } else if (right) {
                if (operation === "/" && parseFloat(right) === 0) {
                    console.log("here")
                    display.textContent = "ERROR"
                    left = ""
                    right = ""
                    operation = ""
                    removeActive()
                } else {
                    let result = 0
                    result = operate(parseFloat(left), parseFloat(right), operation)
                    left = result.toString()
                    right = ""
                    resultToSigFig(result)
                    removeActive(event.currentTarget)
                    if (event.currentTarget.textContent === "="){
                        operation = ""
                    } else {
                        operation = event.currentTarget.textContent
                    }
                    equal_button.classList.remove("active")
                }
            }
        }
    })
})

const decimal_button = document.querySelector(".decimal")
decimal_button.addEventListener("click", event => {
    if (!operation) {
        if (!left) {
            left += "0"
        }
        left += "."
    } else {
        if (!right) {
            right += "0"
        }
        right += "."
    }
    updateDisplay()
})

const clear_button = document.querySelector(".clear")
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

        console.log("here")
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