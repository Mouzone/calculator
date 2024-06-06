import operate from "./calculator_func.js"

let operation = "" // if operation was ever pressed
let left = ""
let right = ""

const display = document.querySelector(".display")
const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    button.addEventListener("click", event => {
        const curr_button = event.currentTarget
        if (curr_button.classList.contains("clear")) {
            display.textContent = "0000000000"
            left = ""
            right = ""
            operation = ""
        } else if (!operation) {
            if (curr_button.classList.contains("number")) {
                if (!left){
                    display.textContent = curr_button.textContent
                } else {
                    display.textContent += curr_button.textContent
                }
                left += curr_button.textContent
            } else if (curr_button.classList.contains("operation")) {
                display.textContent += curr_button.textContent
                operation = curr_button.textContent
            }
        } else {
            if (curr_button.classList.contains("number")) {
                display.textContent += curr_button.textContent
                right += curr_button.textContent
            }
            if (curr_button.classList.contains("operation")) {
                left = display.textContent = operate(parseInt(left), parseInt(right), operation)
                right = ""
                if (curr_button.textContent === "="){
                    operation = ""
                } else {
                    operation = curr_button.textContent
                    display.textContent += operation
                }

            }
        }
    })
})
