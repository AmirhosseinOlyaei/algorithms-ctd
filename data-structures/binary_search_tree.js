/*
  Tree
  - Data structure made up of linked nodes
  - Each node can link to any number of other nodes
  - Each node can have at most 1 parent
  - The root node does not have any parent node

  Binary Tree
  - Each node can only have 2 children

  Binary Search Tree
  - Left subtree contains values less than the parent node
  - Right subtree contains values greater than the parent node
*/

class Node {
    constructor(value = null) {
        // value is normally considered the key (unique)
        this.value = value
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }

    /*
      Insert - O(n)
      Creates a node with given value and inserts it in BST
  
      Create a node with a value and store it
      If no root node exists, set root to new node and return
      Create a current node variable and set it to root
      Repeat until insertion
        If val < current node val
          If no left child on current node, add new node to left
          Else set current node to left child
        If val > current node val
          If no right child on current node, add new node to right
          Else set current node to right child
    */
    // Please note that this 'insert' function is iterative, but usually we use recursion with BSTs
    insert(value) {
        // Input validation: ensure value is a valid number
        if (typeof value !== 'number' || isNaN(value)) {
            console.log(`Cannot insert: ${value} is not a valid number`)
            return false
        }

        const newNode = new Node(value)

        // If no root node exists, set root to new node and return
        if (this.root === null) {
            this.root = newNode
            return
        }

        // Starting from the root node
        let current = this.root

        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode
                    return
                } else {
                    current = current.left
                }
            } else {
                if (current.right === null) {
                    current.right = newNode
                    return
                } else {
                    current = current.right
                }
            }
        }
    }

    /*
      insertRecursive - O(h) where h is the height of the tree
      Recursive version of insert - more idiomatic for BST operations
      
      Algorithm:
      - Base case: if currentNode is null, create and return new node
      - If value < currentNode.value, recurse left
      - If value > currentNode.value, recurse right
      - Return currentNode to maintain tree structure
    */
    insertRecursive(value) {
        // Input validation: ensure value is a valid number
        if (typeof value !== 'number' || isNaN(value)) {
            console.log(`Cannot insert: ${value} is not a valid number`)
            return false
        }

        this.root = this._insertRecursiveHelper(this.root, value)
        return true
    }

    _insertRecursiveHelper(currentNode, value) {
        // Base case: found the spot to insert
        if (currentNode === null) {
            return new Node(value)
        }

        // Recurse left or right based on value comparison
        if (value < currentNode.value) {
            currentNode.left = this._insertRecursiveHelper(currentNode.left, value)
        } else {
            currentNode.right = this._insertRecursiveHelper(currentNode.right, value)
        }

        // Return the unchanged node pointer
        return currentNode
    }

    /*
      isValidBST - O(n) where n is the number of nodes
      Validates that the tree maintains BST property
      
      Algorithm:
      - Use in-order traversal (left, root, right)
      - Each node must be greater than all nodes in left subtree
      - Each node must be less than all nodes in right subtree
    */
    isValidBST() {
        return this._isValidBSTHelper(this.root, null, null)
    }

    _isValidBSTHelper(node, min, max) {
        // Empty tree or leaf's child is valid
        if (node === null) {
            return true
        }

        // Check if current node violates BST property
        // Note: duplicates are allowed on the right, so we use < for min (strict) and >= for max
        if ((min !== null && node.value < min) || (max !== null && node.value >= max)) {
            return false
        }

        // Recursively validate left and right subtrees
        return this._isValidBSTHelper(node.left, min, node.value) &&
            this._isValidBSTHelper(node.right, node.value, max)
    }

    /*
      getMinVal - O(h) where h is the height of the tree
      Returns the minimum value in the BST
  
      In a BST, the minimum value is always at the leftmost node.
      This is because all values less than a node are stored in its left subtree.
      
      Algorithm:
      - If tree is empty, return null
      - Start at root and keep going left until there's no left child
      - Return the value at that node
    */
    getMinVal() {
        // Handle empty tree case
        if (this.root === null) {
            return null
        }

        // Start at the root
        let current = this.root

        // Keep traversing left until we reach the leftmost node
        while (current.left !== null) {
            current = current.left
        }

        // The leftmost node contains the minimum value
        return current.value
    }
}

// Example usage:
const bst = new BST()
bst.insert(19)
bst.insert(21)
bst.insert(10)
bst.insert(2)
bst.insert(18)

console.log("BST structure:", bst)
console.log("\nMinimum value in BST:", bst.getMinVal()) // Should print 2

// Visual representation of the tree:
/*
        19
       /  \
      10   21
     /  \
    2   18
    
  The minimum value (2) is at the leftmost position
*/

// Additional test cases:
console.log("\n=== Additional Test Cases ===")

// Test with single node
const bst2 = new BST()
bst2.insert(50)
console.log("Single node BST - Min value:", bst2.getMinVal()) // Should print 50

// Test with empty tree
const bst3 = new BST()
console.log("Empty BST - Min value:", bst3.getMinVal()) // Should print null

// Test with all nodes going left
const bst4 = new BST()
bst4.insert(100)
bst4.insert(75)
bst4.insert(50)
bst4.insert(25)
console.log("Left-skewed BST - Min value:", bst4.getMinVal()) // Should print 25

// === New Test Cases ===

// Test input validation
console.log("\n=== Input Validation Tests ===")
const bst5 = new BST()
bst5.insert("not a number") // Should log error
bst5.insert(undefined) // Should log error
bst5.insert(NaN) // Should log error
bst5.insert(42) // Should succeed
console.log("After invalid inserts, min value:", bst5.getMinVal()) // Should print 42

// Test recursive insert
console.log("\n=== Recursive Insert Tests ===")
const bst6 = new BST()
bst6.insertRecursive(50)
bst6.insertRecursive(30)
bst6.insertRecursive(70)
bst6.insertRecursive(20)
bst6.insertRecursive(40)
console.log("Recursive insert BST - Min value:", bst6.getMinVal()) // Should print 20
console.log("Is valid BST:", bst6.isValidBST()) // Should print true

// Test duplicate handling (duplicates go to the right)
console.log("\n=== Duplicate Handling Tests ===")
const bst7 = new BST()
bst7.insert(10)
bst7.insert(10) // Duplicate - goes to right
bst7.insert(10) // Another duplicate
console.log("BST with duplicates - Min value:", bst7.getMinVal()) // Should print 10
console.log("Is valid BST:", bst7.isValidBST()) // Should print true

// Test tree structure validation
console.log("\n=== Tree Structure Validation ===")
const bst8 = new BST()
bst8.insert(15)
bst8.insert(10)
bst8.insert(20)
bst8.insert(8)
bst8.insert(12)
bst8.insert(17)
bst8.insert(25)
console.log("Balanced BST is valid:", bst8.isValidBST()) // Should print true
console.log("Min value:", bst8.getMinVal()) // Should print 8

/*
  Visual representation of bst8:
        15
       /  \
      10   20
     / \   / \
    8  12 17  25
*/
