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
    curr_button.classList?.add("active")
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

const clear_button = document.querySelector(".clear")
clear_button.addEventListener("click", event=> {
    display.textContent = "0000000000"
    left = ""
    right = ""
    operation = ""
    removeActive()
})

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
            if (!operation && event.currentTarget.textContent !== "=") {
                operation = event.currentTarget.textContent
                removeActive(event.currentTarget)
            } else if (right) {
                let result = 0
                result = operate(parseInt(left), parseInt(right), operation)
                left = result.toString()
                right = ""
                resultToSigFig(result)
                removeActive(event.currentTarget)
                if (event.currentTarget.textContent === "="){
                    operation = ""
                } else {
                    operation = event.currentTarget.textContent
                }
            }
        }
    })
})
