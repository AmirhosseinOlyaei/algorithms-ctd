// Matrix Operations
// - Print corners
// - Print rows
// - Print columns
// - Print edges (clockwise)
// - Print spiral

const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];

// Print corners - O(1)
// pseudocode:
// check if matrix is empty
// print the first element of the first row (top-left)
// print the last element of the first row (top-right)
// print the first element of the last row (bottom-left)
// print the last element of the last row (bottom-right)
const printCorners = (matrix) => {
    if (!matrix.length || !matrix[0].length) return;

    const lastRow = matrix.length - 1;
    const lastCol = matrix[0].length - 1;

    console.log("Corners:");
    console.log(matrix[0][0]);           // top-left
    console.log(matrix[0][lastCol]);     // top-right
    console.log(matrix[lastRow][0]);     // bottom-left
    console.log(matrix[lastRow][lastCol]); // bottom-right
};

// Print all rows - O(n*m)
// pseudocode:
// loop through each row
// print the entire row
const printRows = (matrix) => {
    console.log("Rows:");
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(" "));
    }
};

// Print all columns - O(n*m)
// pseudocode:
// loop through each column index
//   loop through each row
//     collect the element at [row][col]
//   print the collected column
const printColumns = (matrix) => {
    console.log("Columns:");
    for (let col = 0; col < matrix[0].length; col++) {
        let column = [];
        for (let row = 0; row < matrix.length; row++) {
            column.push(matrix[row][col]);
        }
        console.log(column.join(" "));
    }
};

// Print edges clockwise - O(n + m)
// pseudocode:
// traverse top row (left to right)
// traverse right col (top to bottom, skip first)
// traverse bottom row (right to left, skip last)
// traverse left col (bottom to top, skip first and last)
const printEdges = (matrix) => {
    if (!matrix.length || !matrix[0].length) return;

    const result = [];
    const rows = matrix.length;
    const cols = matrix[0].length;

    // top row (left to right)
    for (let j = 0; j < cols; j++) {
        result.push(matrix[0][j]);
    }

    // right col (top to bottom, skip first element)
    for (let i = 1; i < rows; i++) {
        result.push(matrix[i][cols - 1]);
    }

    // bottom row (right to left, skip last element)
    if (rows > 1) {
        for (let j = cols - 2; j >= 0; j--) {
            result.push(matrix[rows - 1][j]);
        }
    }

    // left col (bottom to top, skip first and last)
    if (cols > 1) {
        for (let i = rows - 2; i > 0; i--) {
            result.push(matrix[i][0]);
        }
    }

    console.log("Edges (clockwise):");
    console.log(result.join(", "));
};

// Print spiral - O(n*m)
// pseudocode:
// set boundaries: top, bottom, left, right
// while boundaries haven't crossed:
//   traverse top row (left to right), then shrink top
//   traverse right col (top to bottom), then shrink right
//   traverse bottom row (right to left), then shrink bottom
//   traverse left col (bottom to top), then shrink left
// repeat until all elements visited
const printSpiral = (matrix) => {
    if (!matrix.length || !matrix[0].length) return;

    const result = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // top row (left to right)
        for (let j = left; j <= right; j++) {
            result.push(matrix[top][j]);
        }
        top++;

        // right col (top to bottom)
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;

        // bottom row (right to left)
        if (top <= bottom) {
            for (let j = right; j >= left; j--) {
                result.push(matrix[bottom][j]);
            }
            bottom--;
        }

        // left col (bottom to top)
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }

    console.log("Spiral:");
    console.log(result.join(", "));
};

// Test all functions
console.log("=== Matrix ===");
matrix.forEach(row => console.log(row.join("\t")));
console.log("");

printCorners(matrix);
console.log("");

printRows(matrix);
console.log("");

printColumns(matrix);
console.log("");

printEdges(matrix);
console.log("");

printSpiral(matrix);
