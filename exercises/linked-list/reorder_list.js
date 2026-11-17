// Code a function named reorderList() which takes head as its 1 parameter.
// The parameter is the first node of a linked list. Your reorderList function
// should change this linked list. It should reorder this linked list and
// alternate between starting nodes and ending nodes of the original list.
// The function should return the head node.

// INPUT
// head: first ListNode of a linked list (guaranteed 2+ nodes)

// OUTPUT
// The same head node, with the list rewired in place to alternate
// first half / reversed second half (zipper order).

// BRAINSTORM
// clarifying questions
// - Can head be null or a single node?
//   List is guaranteed to have 2+ nodes. (We still guard it cheaply.)
// - Is extra space allowed?
//   Both solutions implemented: an O(1)-space pointer version
//   (reorderList) and an O(n)-space array version (reorderListWithArray).
// - Does the original list get mutated?
//   Yes, modifying the original list is expected.
//
// examples
// 1 -> 2 -> 3 -> 4       => 1 -> 4 -> 2 -> 3
//   first half: 1 -> 2 | second half: 3 -> 4 (reversed: 4 -> 3)
// 1 -> 2 -> 3 -> 4 -> 5  => 1 -> 5 -> 2 -> 4 -> 3
//   first half: 1 -> 2 -> 3 | second half: 4 -> 5 (reversed: 5 -> 4)
//   (odd length: first half keeps the extra middle node, it lands last)
//
// observations
// - Three sub-steps: find midpoint, reverse second half, merge alternately.
// - Slow/fast pointers find the split: when fast can no longer jump 2,
//   slow sits on the last node of the first half.
// - After the split, the reversed second half is never longer than the
//   first half, so merging "first, second, first, second..." always ends
//   cleanly on a first-half node.
// edge cases
// - 2 nodes: no reordering visible, just relinked (1 -> 2 stays 1 -> 2)
// - 3 nodes: only the last two swap (1 -> 3 -> 2)
// - odd length: middle node stays in first half and ends up last

// PLAN
// pseudocode
// function reorderList(head):
//   if head or head.next is null: return head
//   // 1. find end of first half with slow/fast
//   slow = head; fast = head
//   while fast.next and fast.next.next:
//     slow = slow.next; fast = fast.next.next
//   // 2. cut and reverse second half
//   second = slow.next
//   slow.next = null
//   prev = null; cur = second
//   while cur:
//     nxt = cur.next; cur.next = prev; prev = cur; cur = nxt
//   // 3. zipper merge: p1 walks first half, p2 walks reversed half
//   p1 = head; p2 = prev
//   while p2:
//     n1 = p1.next; n2 = p2.next
//     p1.next = p2; p2.next = n1
//     p1 = n1; p2 = n2
//   return head

// CODE

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// O(1) space: split at midpoint, reverse second half, zipper merge.
function reorderList(head) {
  if (!head || !head.next) return head;

  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let prev = null;
  let cur = slow.next;
  slow.next = null;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }

  let p1 = head;
  let p2 = prev;
  while (p2) {
    const n1 = p1.next;
    const n2 = p2.next;
    p1.next = p2;
    p2.next = n1;
    p1 = n1;
    p2 = n2;
  }

  return head;
}

// O(n) space alternative: collect nodes in an array, relink with two
// pointers walking in from both ends.
function reorderListWithArray(head) {
  if (!head || !head.next) return head;

  const nodes = [];
  for (let cur = head; cur; cur = cur.next) {
    nodes.push(cur);
  }

  let i = 0;
  let j = nodes.length - 1;
  while (i < j) {
    nodes[i].next = nodes[j];
    i++;
    nodes[j].next = nodes[i];
    j--;
  }
  nodes[i].next = null;

  return head;
}

function displayLinkedList(head) {
  let display = "";
  let cur = head;

  while (cur) {
    display += "Node " + cur.val + " -> ";
    cur = cur.next;
  }

  display += "null";
  console.log(display);
}

function runSingleTest(head, expectedMessage, title) {
  console.log("---------------" + title + "------------------------------------------");

  console.log("Starting Linked List:");
  displayLinkedList(head);

  head = reorderList(head);

  console.log("expected output: " + expectedMessage);

  console.log("Ending Linked List:");
  displayLinkedList(head);
}

function runTests() {
  let linkedListHead = null;

  linkedListHead = new ListNode(1);
  linkedListHead.next = new ListNode(2);
  runSingleTest(linkedListHead, "1 -> 2", "test 1");

  linkedListHead = new ListNode(1);
  linkedListHead.next = new ListNode(2);
  linkedListHead.next.next = new ListNode(3);
  runSingleTest(linkedListHead, "1 -> 3 -> 2", "test 2");

  linkedListHead = new ListNode(1);
  linkedListHead.next = new ListNode(2);
  linkedListHead.next.next = new ListNode(3);
  linkedListHead.next.next.next = new ListNode(4);
  runSingleTest(linkedListHead, "1 -> 4 -> 2 -> 3", "test 3");

  linkedListHead = new ListNode(1);
  linkedListHead.next = new ListNode(2);
  linkedListHead.next.next = new ListNode(3);
  linkedListHead.next.next.next = new ListNode(4);
  linkedListHead.next.next.next.next = new ListNode(5);
  runSingleTest(linkedListHead, "1 -> 5 -> 2 -> 4 -> 3", "test 4");

  linkedListHead = new ListNode(1);
  linkedListHead.next = new ListNode(2);
  linkedListHead.next.next = new ListNode(3);
  linkedListHead.next.next.next = new ListNode(4);
  linkedListHead.next.next.next.next = new ListNode(5);
  linkedListHead.next.next.next.next.next = new ListNode(6);
  linkedListHead.next.next.next.next.next.next = new ListNode(7);
  linkedListHead.next.next.next.next.next.next.next = new ListNode(8);
  linkedListHead.next.next.next.next.next.next.next.next = new ListNode(9);
  linkedListHead.next.next.next.next.next.next.next.next.next = new ListNode(10);
  linkedListHead.next.next.next.next.next.next.next.next.next.next = new ListNode(11);
  runSingleTest(
    linkedListHead,
    "1 -> 11 -> 2 -> 10 -> 3 -> 9 -> 4 -> 8 -> 5 -> 7 -> 6",
    "test 5",
  );
}

runTests();

// Time Complexity
// reorderList: O(n) - three linear passes (find mid, reverse, merge),
//   each node visited a constant number of times.
// reorderListWithArray: O(n) - one pass to collect, one pass to relink.
//
// Space Complexity
// reorderList: O(1) - only a handful of pointers; list is rewired in place.
// reorderListWithArray: O(n) - the nodes array holds every node.

// ---
// Terminal output:
// → node reorder_list.js
// ---------------test 1------------------------------------------
// Starting Linked List:
// Node 1 -> Node 2 -> null
// expected output: 1 -> 2
// Ending Linked List:
// Node 1 -> Node 2 -> null
// ---------------test 2------------------------------------------
// Starting Linked List:
// Node 1 -> Node 2 -> Node 3 -> null
// expected output: 1 -> 3 -> 2
// Ending Linked List:
// Node 1 -> Node 3 -> Node 2 -> null
// ---------------test 3------------------------------------------
// Starting Linked List:
// Node 1 -> Node 2 -> Node 3 -> Node 4 -> null
// expected output: 1 -> 4 -> 2 -> 3
// Ending Linked List:
// Node 1 -> Node 4 -> Node 2 -> Node 3 -> null
// ---------------test 4------------------------------------------
// Starting Linked List:
// Node 1 -> Node 2 -> Node 3 -> Node 4 -> Node 5 -> null
// expected output: 1 -> 5 -> 2 -> 4 -> 3
// Ending Linked List:
// Node 1 -> Node 5 -> Node 2 -> Node 4 -> Node 3 -> null
// ---------------test 5------------------------------------------
// Starting Linked List:
// Node 1 -> Node 2 -> Node 3 -> Node 4 -> Node 5 -> Node 6 -> Node 7 -> Node 8 -> Node 9 -> Node 10 -> Node 11 -> null
// expected output: 1 -> 11 -> 2 -> 10 -> 3 -> 9 -> 4 -> 8 -> 5 -> 7 -> 6
// Ending Linked List:
// Node 1 -> Node 11 -> Node 2 -> Node 10 -> Node 3 -> Node 9 -> Node 4 -> Node 8 -> Node 5 -> Node 7 -> Node 6 -> null
// > 2026-11-17 14:24:03 EST > ao > ~/projects/ctd/apprenticeship/algorithms-ctd > main > * ? >
// →
