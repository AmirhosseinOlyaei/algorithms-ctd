// Given the basic BinarySearchTree class, 
// fill in the missing code for the insert function. 
// Then state the time complexity and space complexity of your insert code.

// INPUT

// OUTPUT

// BRAINSTORM
// clarifying questions
// examples
// observations
// edge cases

// PLAN
// pseudocode - don't skip this

// CODE

// Time Complexity 
// Space Complexity

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

        // to do

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

bst = new BinarySearchTree();
bst.insert(6);
bst.insert(2);
bst.insert(8);
bst.insert(0);
bst.insert(4);
bst.insert(7);
bst.insert(9);
bst.insert(10);
bst.printVisualization(); 
