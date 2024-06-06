import ListNode, {debugListNode} from "./linked_list_node.js"
import operate from "./calculator_func.js"

let operation = false // if operation was ever pressed
const head = new ListNode()
let curr_digit = head

const display = document.querySelector(".display")
const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    button.addEventListener("click", event => {
        const curr_button = event.currentTarget
        if (curr_button.classList.contains("clear")) {
            display.textContent = "0000000000"
            debugListNode(head.next)
            head.next = null
            curr_digit = head
        } else if (!head.next) {
            if (curr_button.classList.contains("number")) {
                display.textContent = curr_button.textContent
                curr_digit.next = new ListNode(curr_button.textContent, "number")
                curr_digit = curr_digit.next
            }
        } else {
            if (curr_button.classList.contains("number")) {
                display.textContent += curr_button.textContent
                curr_digit.next = new ListNode(curr_button.textContent, "number")
                curr_digit = curr_digit.next
            }
            if (curr_button.classList.contains("operation")) {
                if (operation) {
                    if (curr_digit.type === "number") {
                        // submit for operation
                        // if not "=" then store operation such that after calculating display "result op" and append any input to end
                        // operation to false
                    }
                } else {
                    display.textContent += curr_button.textContent
                    curr_digit.next = new ListNode(curr_button.textContent, "operation")
                    curr_digit = curr_digit.next
                    operation = true
                }
            }
        }
    })
})
