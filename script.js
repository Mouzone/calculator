function add(left, right) {
    return left + right
}

function subtract(left, right) {
    return left - right
}

function multiply(left, right) {
    return left * right
}

function divide(left, right) {
    return left / right
}

let left = 0
let right = 0
let operation = ""
function operate(left, right, operation) {
    if (operation === "add") {
        return add(left, right)
    } else if (operation === "subtract") {
        return subtract(left, right)
    } else if (operation === "multiply") {
        return multiply(left, right)
    } else if (operation === "divide") {
        return divide(left, right)
    } else {
        return "Operation Does Not Exist"
    }

}