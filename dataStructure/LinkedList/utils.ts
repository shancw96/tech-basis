import { Node } from ".";

export function toArray(head: Node) {
  let ans = [];
  while(head) {
    ans.push(head.val);
    head = head.next;
  }
  return ans;
}