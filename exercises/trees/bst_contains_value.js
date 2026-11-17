/*
  Problem: Given a BST and a value, determine if the value exists in the BST.
  Return a boolean.

  ============================================
  CLARIFYING QUESTIONS
  ============================================
  - What if tree is empty? → return false
  - What if value is not a valid number? → return false
  - Can there be duplicates? → Yes, duplicates go to right subtree (if you find the number, what should you do? even if it's a duplicate. answer: return true.)
  
  ============================================
  INPUT / OUTPUT
  ============================================
  Input: BST root node, target value (number)
  Output: boolean (true if found, false if not)
  
  Examples:
  - BST [19, 10, 21, 2, 18], target = 10 → true
  - BST [19, 10, 21, 2, 18], target = 99 → false
  - Empty BST, target = 5 → false

  ============================================
  PLANNING
  ============================================
  Key insight: BST is always sorted!
  - Left subtree contains values < parent
  - Right subtree contains values > parent
  
  We can use this property to search efficiently in O(h) time
  instead of O(n) linear search.

  Algorithm:
  1. Start at the root
  2. If current node is null → not found → return false
  3. If current node's value equals target → return true
  4. If target < current value → search left subtree
  5. If target > current value → search right subtree

  Time Complexity: O(h) where h = height of tree
    - O(log n) for balanced tree
    - O(n) worst case for skewed tree
  Space Complexity: O(1) iterative

  ============================================
  PSEUDOCODE
  ============================================
  function containsValue(value):
      if value is not a valid number:
          return false
      
      current = root
      
      while current is not null:
          if value equals current.value:
              return true
          else if value < current.value:
              current = current.left
          else:
              current = current.right
      
      return false

  ============================================
  CODE
  ============================================
*/

class Node {
    constructor(value = null) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }

    insert(value) {
        if (typeof value !== 'number' || isNaN(value)) {
            return false
        }

        const newNode = new Node(value)

        if (this.root === null) {
            this.root = newNode
            return true
        }

        let current = this.root

        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode
                    return true
                } else {
                    current = current.left
                }
            } else {
                if (current.right === null) {
                    current.right = newNode
                    return true
                } else {
                    current = current.right
                }
            }
        }
    }

    // Main solution: O(h) time, O(1) space
    containsValue(value) {
        // Input validation
        if (typeof value !== 'number' || isNaN(value)) {
            return false
        }

        let current = this.root

        while (current !== null) {
            if (value === current.value) {
                return true
            } else if (value < current.value) {
                current = current.left
            } else {
                current = current.right
            }
        }

        return false
    }
}

/*
  ============================================
  TESTS
  ============================================
*/

console.log("=== BST Contains Value Tests ===\n")

// Build test tree:
//        19
//       /  \
//      10   21
//     /  \
//    2   18

const bst = new BST()
bst.insert(19)
bst.insert(10)
bst.insert(21)
bst.insert(2)
bst.insert(18)

// Test 1: Value exists at root
console.log("Test 1 - Value at root (19):", bst.containsValue(19) === true ? "PASS" : "FAIL")

// Test 2: Value exists in left subtree
console.log("Test 2 - Value in left subtree (10):", bst.containsValue(10) === true ? "PASS" : "FAIL")

// Test 3: Value exists in right subtree
console.log("Test 3 - Value in right subtree (21):", bst.containsValue(21) === true ? "PASS" : "FAIL")

// Test 4: Value exists at leaf
console.log("Test 4 - Value at leaf (2):", bst.containsValue(2) === true ? "PASS" : "FAIL")

// Test 5: Value does NOT exist
console.log("Test 5 - Value not in tree (99):", bst.containsValue(99) === false ? "PASS" : "FAIL")

// Test 6: Value not in tree (between existing values)
console.log("Test 6 - Value between nodes (15):", bst.containsValue(15) === false ? "PASS" : "FAIL")

// Test 7: Empty tree
const emptyBST = new BST()
console.log("Test 7 - Empty tree:", emptyBST.containsValue(5) === false ? "PASS" : "FAIL")

// Test 8: Single node tree - found
const singleBST = new BST()
singleBST.insert(42)
console.log("Test 8 - Single node (found):", singleBST.containsValue(42) === true ? "PASS" : "FAIL")

// Test 9: Single node tree - not found
console.log("Test 9 - Single node (not found):", singleBST.containsValue(100) === false ? "PASS" : "FAIL")

// Test 10: Invalid input - string
console.log("Test 10 - Invalid input (string):", bst.containsValue("10") === false ? "PASS" : "FAIL")

// Test 11: Invalid input - NaN
console.log("Test 11 - Invalid input (NaN):", bst.containsValue(NaN) === false ? "PASS" : "FAIL")

// Test 12: Duplicate values (duplicates go right)
const dupBST = new BST()
dupBST.insert(10)
dupBST.insert(10)
dupBST.insert(10)
console.log("Test 12 - Duplicate values:", dupBST.containsValue(10) === true ? "PASS" : "FAIL")

console.log("\n=== All Tests Complete ===")
