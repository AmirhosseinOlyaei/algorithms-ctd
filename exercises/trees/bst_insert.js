// Given the basic BinarySearchTree class, 
// fill in the missing code for the insert function. 
// Then state the time complexity and space complexity of your insert code.

// INPUT
// A single value (number) to insert into the BST

// OUTPUT
// Modifies the tree by adding the new value in the correct position
// Maintains BST property: left < parent < right

// BRAINSTORM
// clarifying questions
// - Should we allow duplicate values? (typically no)
// - What data type should values be? (assume numbers)
// - Should the function return anything? (typically void, just modify tree)

// examples
// Insert 6 into empty tree → becomes root
// Insert 2 into tree with 6 → goes to left of 6
// Insert 8 into tree with 6 → goes to right of 6
// Insert 4 into tree with [6, 2] → goes to right of 2

// observations
// - First insert always becomes root
// - Each subsequent insert needs to find correct position
// - Smaller values go left, larger go right
// - Process repeats recursively until leaf is found

// edge cases
// - Empty tree (insert becomes root)
// - Single node tree
// - Duplicate value (decide: ignore, replace, or allow)
// - Very deep tree (unbalanced)

// PLAN
// pseudocode - don't skip this
// 1. If tree is empty, create new node as root
// 2. Otherwise, start at root
// 3. Loop until we find the correct position:
//    - If value < current node value, move left
//    - If value > current node value, move right
//    - When we reach null, insert the new node there
// 4. No recursion needed - use a pointer to traverse

// CODE
// Time Complexity: O(h) where h is height - average O(log n), worst O(n)
// Space Complexity: O(1) - no extra space beyond the new node

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {

    constructor() {
        this.root = null;
    }

    insert(value) {
        // If tree is empty, make this the root
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        // Traverse the tree to find insertion point
        let current = this.root;
        while (true) {
            // If value is less than current, go left
            if (value < current.value) {
                if (current.left === null) {
                    current.left = new Node(value);
                    return;
                }
                current = current.left;
            }
            // If value is greater than current, go right
            else if (value > current.value) {
                if (current.right === null) {
                    current.right = new Node(value);
                    return;
                }
                current = current.right;
            }
            // Duplicate found, ignore it
            else {
                return;
            }
        }
    }

    printVisualization(node = this.root, space = 0, prefix = "Root: ") {
        // If the node is null, just return:
        if (!node) {
            return;
        }

        // Increase the distance between levels
        const DISTANCE = 10;
        const padding = " ".repeat(space);

        // 1. Process the right child first (it will appear at the top of the console)
        if (node.right) {
            this.printVisualization(node.right, space + DISTANCE, "R── ");
        }

        // 2. Print the current node
        console.log(`${padding}${prefix}${node.value}`);

        // 3. Process the left child (it will appear at the bottom of the console)
        if (node.left) {
            this.printVisualization(node.left, space + DISTANCE, "L── ");
        }
    }
}

const bst = new BinarySearchTree();
bst.insert(6);
bst.insert(2);
bst.insert(8);
bst.insert(0);
bst.insert(4);
bst.insert(7);
bst.insert(9);
bst.insert(10);
console.log("Initial tree:");
bst.printVisualization();

console.log("\nInserting duplicate 4 (should not change tree):");
bst.insert(4);
bst.printVisualization();
/*
Initial tree:
                              R── 10
                    R── 9
          R── 8
                    L── 7
Root: 6
                    R── 4
          L── 2
                    L── 0

Inserting duplicate 4 (should not change tree):
                              R── 10
                    R── 9
          R── 8
                    L── 7
Root: 6
                    R── 4
          L── 2
                    L── 0
*/