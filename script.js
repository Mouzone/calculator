import ListNode from "./linked_list_node"
import operate from "./calculator_func"

let operation = false
const head = new ListNode()
let curr_digit = head

const display = document.querySelector(".display")
let is_display_empty = true
const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    button.addEventListener("click", event => {
        if (event.currentTarget.classList.contains("clear")) {
            display.textContent = "0000000000"
            is_display_empty = true
        } else if (is_display_empty) {
            if (event.currentTarget.classList.contains("number")) {
                display.textContent = event.currentTarget.textContent
                is_display_empty = false
                curr_digit.next = new ListNode(event.currentTarget.textContent)
                curr_digit = curr_digit.next
            }
        } else {
            if (event.currentTarget.classList.contains("number")) {
                display.textContent += event.currentTarget.textContent
                curr_digit.next = new ListNode(event.currentTarget.textContent)
                curr_digit = curr_digit.next
            }
            if (event.currentTarget.classList.contains("operation")) {
                if (operation) {
                    if (curr_digit.type === "number") {
                        // submit for operation
                        // if not "=" then store operation such that after calculating display "result op" and append any input to end
                        // operation to false
                    }
                } else {
                    display.textContent += event.currentTarget.textContent
                    curr_digit.next = new ListNode((event.currentTarget.textContent))
                    curr_digit = curr_digit.next
                    operation = true
                }
            }
        }
    })
})
