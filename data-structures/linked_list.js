/* Node Implementation, to be used in the linked list */
// Input: a value, and a pointer for where the node points to. Default is null
class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

/*
  Linked List Implementation

  Abstract Data Type
  
  - Do not have indexes
  - Connected via nodes with a next pointer
  - Random access is not allowed (no index)
  - Less memory wasted by allocating and deallocating space (unlike array)
  - Accessing element => O(n)
  - Insert/Remove from beginning (head node) => O(1)
  - Insert/Remove from anywhere else => O(n)
*/

class LinkedList {
  constructor(value) {
    this.head = null // Points to the first Node in the list, initially empty
    this.size = 0 // Tracks the total number of nodes in the list, starts at 0
  }

  printList() {
    // Create a curr pointer starting at the head to traverse through each node in the list
    let curr = this.head

    // Build a string representation of the list that will show all values connected by arrows
    let result = ""

    // Iterate through each node in the list until we reach the end (null)
    while (curr !== null) {
      result += curr.value

      // Add an arrow separator between nodes, but not after the last node
      if (curr.next !== null) {
        result += " -> "
      }

      // Move the curr pointer forward to the next node in the list
      curr = curr.next
    }

    // Print the formatted list to the console, or "Empty list" if there are no nodes
    console.log(result || "Empty list")
  }

  iterateListWithTwoPointers() {
    // Initialize prev pointer to null since there is no node before the head
    let prev = null

    // Initialize curr pointer at the head to start traversing from the beginning
    let curr = this.head

    console.log("Iterating through list with two pointers:")

    // Traverse the list maintaining two pointers that track adjacent nodes
    while (curr !== null) {
      console.log(`prev: ${prev ? prev.value : "null"}, curr: ${curr.value}`)

      // Move both pointers forward one position: prev catches up to curr, curr advances to next
      prev = curr
      curr = curr.next
    }

    // Display the final state where curr has reached the end and prev points to the tail node
    console.log(`prev: ${prev ? prev.value : "null"}, curr: null (end of list)`)
  }

  /*
    Get value at a specific index in the list
    
    - Traverse the list from head to the specified index
    - Return the value at that index
    - Return null if index is out of bounds
    
    BigO: O(n) where n is the index position
  */
  get(index) {
    // Check if the index is negative or exceeds the list size, return null for invalid index
    if (index < 0 || index >= this.size) {
      console.log(`Index ${index} is out of bounds`)
      return null
    }

    // Start at the head of the list to begin traversal
    let curr = this.head

    // Traverse through the list, moving forward one node at a time until we reach the target index
    for (let i = 0; i < index; i++) {
      curr = curr.next
    }

    // Return the value stored at the node at the specified index
    return curr.value
  }

  /*
    Set/update the value at a specific index in the list
    
    - Traverse the list to find the node at the specified index
    - Update that node's value to the new value provided
    - Return true if successful, false if index is out of bounds
    
    BigO: O(n) where n is the index position
  */
  set(index, value) {
    // Check if the index is negative or exceeds the list size, return false for invalid index
    if (index < 0 || index >= this.size) {
      console.log(`Cannot set value: Index ${index} is out of bounds`)
      return false
    }

    // Start at the head of the list to begin traversal
    let curr = this.head

    // Traverse through the list, moving forward one node at a time until we reach the target index
    for (let i = 0; i < index; i++) {
      curr = curr.next
    }

    // Update the value at the target node with the new value provided
    curr.value = value

    // Return true to indicate the operation was successful
    return true
  }

  /*
    Add a node to List as new Head

    -  Creates a new node using the value passed
    -  Set next property of new node to the current head.
    -  Set head to the new node.
    -  Edge case: List has a single node, node becomes tail.
    -  Increment size by 1

    BigO: O(1)
  */
  appendToHead(value) {
    // Create a new node with the specified value that will become the new head of the list
    const newNode = new Node(value)

    // Connect the new node to the existing list by pointing its next to the current head
    // This is critical: we must establish this link before moving the head pointer
    newNode.next = this.head

    // Update the head pointer to reference the new node, making it the first node in the list
    this.head = newNode

    // Increment the size counter to reflect the addition of one node to the list
    this.size++
  }

  appendToTail(value) {
    // your work here
    // create a node whose value is `value` 
    // add it to the tail of the list
  }

  /*
    Add a node after the nth index in the list
    
    - Create a new node with the provided value
    - Traverse to the node at index n
    - Insert the new node after that position
    - Must maintain proper pointer connections to avoid losing the list
    
    BigO: O(n) where n is the index position
  */
  appendToNth(n, value) {
    // Check if the index n is negative or exceeds the valid range for insertion
    if (n < 0 || n >= this.size) {
      console.log(`Cannot insert: Index ${n} is out of bounds`)
      return false
    }

    // Create a new node with the specified value that will be inserted into the list
    const newNode = new Node(value)

    // Start at the head to traverse to the node at index n
    let curr = this.head

    // Traverse through the list until we reach the node at index n (the node after which we'll insert)
    for (let i = 0; i < n; i++) {
      curr = curr.next
    }

    // Connect the new node to the rest of the list by pointing its next to curr's next
    // This must happen BEFORE we change curr's next pointer, or we'll lose the rest of the list
    newNode.next = curr.next

    // Connect the node at index n to the new node, inserting it into the list
    curr.next = newNode

    // Increment the size counter to reflect the addition of one node to the list
    this.size++

    // Return true to indicate the operation was successful
    return true
  }

  /*
    Insert a node with value 50 before any node with value 1
    
    - Search through the list for a node with value 1
    - If found at the head, insert 50 as the new head
    - If found elsewhere, insert 50 before it by updating previous node's next pointer
    - If not found, do nothing and return false
    - Returns true if insertion occurred, false otherwise
    
    BigO: O(n) - must traverse the list to find the node with value 1
  */
  insert50before1() {
    // If the list is empty, return false to indicate no insertion occurred
    if (this.head === null) {
      return false
    }

    // Special case: if the head node has value 1, insert 50 as the new head
    if (this.head.value === 1) {
      // Create a new node with value 50 that will become the new head
      const newNode = new Node(50)

      // Connect the new node to the current head (which has value 1)
      newNode.next = this.head

      // Update head to point to the new node, making 50 the first element
      this.head = newNode

      // Increment size to reflect the addition of the new node
      this.size++

      // Return true to indicate successful insertion
      return true
    }

    // For all other cases, use two pointers to traverse the list
    // prev tracks the node before curr so we can insert between them
    let prev = this.head
    let curr = this.head.next

    // Traverse the list looking for a node with value 1
    // Only create the new node if we actually find a node with value 1
    while (curr !== null) {
      // Check if the current node has value 1
      if (curr.value === 1) {
        // Create a new node with value 50 to insert before the node with value 1
        // Node is only created here after confirming value 1 exists
        const newNode = new Node(50)

        // Connect the new node to the node with value 1
        // This must happen first to avoid losing the rest of the list
        newNode.next = curr

        // Connect the previous node to the new node, inserting it into the list
        prev.next = newNode

        // Increment size to reflect the addition of the new node
        this.size++

        // Return true to indicate successful insertion
        return true
      }

      // Move both pointers forward to continue searching
      prev = curr
      curr = curr.next
    }

    // If we've traversed the entire list without finding value 1, return false
    // No node was created unnecessarily since we only create after finding value 1
    return false
  }
}

const linkedlist = new LinkedList()
console.log(linkedlist) // should be empty

// Making a new Head node every time (adding to beginning of list):
linkedlist.appendToHead(15) // becomes Head node (and Tail node)
linkedlist.appendToHead(9) // becomes new Head node; 15 is still Tail 
linkedlist.appendToHead(26) // becomes new Head node; 15 is still Tail
console.log(linkedlist) // should be 26 -> 9 -> 15

// Test printList():
console.log("\nTesting printList():")
linkedlist.printList() // should print: 26 -> 9 -> 15

// Test iterateListWithTwoPointers():
console.log("\nTesting iterateListWithTwoPointers():")
linkedlist.iterateListWithTwoPointers()

// Test get() function:
console.log("\n=== Testing get(index) ===")
console.log("Current list:")
linkedlist.printList() // 26 -> 9 -> 15
console.log("get(0):", linkedlist.get(0)) // should return 26
console.log("get(1):", linkedlist.get(1)) // should return 9
console.log("get(2):", linkedlist.get(2)) // should return 15
console.log("get(5):", linkedlist.get(5)) // should return null (out of bounds)
console.log("get(-1):", linkedlist.get(-1)) // should return null (negative index)

// Test set() function:
console.log("\n=== Testing set(index, value) ===")
console.log("Before set operations:")
linkedlist.printList() // 26 -> 9 -> 15
console.log("set(1, 100) - changing middle value from 9 to 100")
linkedlist.set(1, 100) // change 9 to 100
linkedlist.printList() // 26 -> 100 -> 15
console.log("set(0, 50) - changing head value from 26 to 50")
linkedlist.set(0, 50) // change 26 to 50
linkedlist.printList() // 50 -> 100 -> 15
console.log("set(5, 999) - attempting to set out of bounds index")
linkedlist.set(5, 999) // should fail

// Test appendToNth() function:
console.log("\n=== Testing appendToNth(n, value) ===")
console.log("Before appendToNth operations:")
linkedlist.printList() // 50 -> 100 -> 15
console.log("appendToNth(0, 75) - inserting 75 after index 0")
linkedlist.appendToNth(0, 75) // insert 75 after index 0
linkedlist.printList() // 50 -> 75 -> 100 -> 15
console.log("appendToNth(2, 88) - inserting 88 after index 2")
linkedlist.appendToNth(2, 88) // insert 88 after index 2
linkedlist.printList() // 50 -> 75 -> 100 -> 88 -> 15
console.log("appendToNth(10, 999) - attempting to insert at out of bounds index")
linkedlist.appendToNth(10, 999) // should fail

console.log("\n=== Final List State ===")
console.log("Final list:")
linkedlist.printList()
console.log("Final size:", linkedlist.size)

// Test insert50before1() function:
console.log("\n\n=== CHALLENGE: Testing insert50before1() ===")

// Test Case 1: Insert when 1 is at the head
console.log("\n--- Test Case 1: Value 1 at the head ---")
const list1 = new LinkedList()
list1.appendToHead(5)
list1.appendToHead(3)
list1.appendToHead(1)
console.log("Before:")
list1.printList() // 1 -> 3 -> 5
const result1 = list1.insert50before1()
console.log("Insertion successful:", result1)
console.log("After:")
list1.printList() // 50 -> 1 -> 3 -> 5
console.log("Size:", list1.size)

// Test Case 2: Insert when 1 is in the middle
console.log("\n--- Test Case 2: Value 1 in the middle ---")
const list2 = new LinkedList()
list2.appendToHead(7)
list2.appendToHead(1)
list2.appendToHead(4)
list2.appendToHead(2)
console.log("Before:")
list2.printList() // 2 -> 4 -> 1 -> 7
const result2 = list2.insert50before1()
console.log("Insertion successful:", result2)
console.log("After:")
list2.printList() // 2 -> 4 -> 50 -> 1 -> 7
console.log("Size:", list2.size)

// Test Case 3: Insert when 1 is at the tail
console.log("\n--- Test Case 3: Value 1 at the tail ---")
const list3 = new LinkedList()
list3.appendToHead(1)
list3.appendToHead(8)
list3.appendToHead(6)
console.log("Before:")
list3.printList() // 6 -> 8 -> 1
const result3 = list3.insert50before1()
console.log("Insertion successful:", result3)
console.log("After:")
list3.printList() // 6 -> 8 -> 50 -> 1
console.log("Size:", list3.size)

// Test Case 4: No value 1 in the list
console.log("\n--- Test Case 4: No value 1 in the list ---")
const list4 = new LinkedList()
list4.appendToHead(9)
list4.appendToHead(7)
list4.appendToHead(3)
console.log("Before:")
list4.printList() // 3 -> 7 -> 9
const result4 = list4.insert50before1()
console.log("Insertion successful:", result4)
console.log("After:")
list4.printList() // 3 -> 7 -> 9 (unchanged)
console.log("Size:", list4.size)

// Test Case 5: Empty list
console.log("\n--- Test Case 5: Empty list ---")
const list5 = new LinkedList()
console.log("Before:")
list5.printList() // Empty list
const result5 = list5.insert50before1()
console.log("Insertion successful:", result5)
console.log("After:")
list5.printList() // Empty list (unchanged)
console.log("Size:", list5.size)
