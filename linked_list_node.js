export default class ListNode {
    constructor(val=null, type=null, next=null) {
        this.val = val
        this.type = type
        this.next = next
    }
}
export function parseLinkedList(node) {
    let left = ""
    let right = ""
    let operation =
    while (node) {

    }
}
export function debugListNode(node) {
    let output_array = []
    while (node){
        output_array.push(node.val)
        node = node.next
    }
    console.table(output_array)
}