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

export default function operate(left, right, operation) {
    if (operation === "+") {
        return add(left, right)
    } else if (operation === "-") {
        return subtract(left, right)
    } else if (operation === "*") {
        return multiply(left, right)
    } else if (operation === "/") {
        return divide(left, right)
    } else {
        return "Operation Does Not Exist"
    }
}