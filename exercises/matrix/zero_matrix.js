// Matrix Challenge: Zero rows + cols
// Write functions to zero out a specific row and column in a matrix

// Zero out all elements at a given row index
const zeroRow = (matrix, rowIndex) => {
    for (let col = 0; col < matrix[rowIndex].length; col++) {
        matrix[rowIndex][col] = 0
    }
    return matrix
}

// Zero out all elements at a given column index
const zeroCol = (matrix, colIndex) => {
    for (let row = 0; row < matrix.length; row++) {
        matrix[row][colIndex] = 0
    }
    return matrix
}

// Combined: zero out both a row and a column
const zeroRowAndCol = (matrix, rowIndex, colIndex) => {
    zeroRow(matrix, rowIndex)
    zeroCol(matrix, colIndex)
    return matrix
}

// Test
const matrix = [
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0]
]

const rowIndex = 2
const colIndex = 3

console.log("Original matrix:")
matrix.forEach(row => console.log(row))

console.log("\nAfter zeroing row", rowIndex, "and col", colIndex + ":")
zeroRowAndCol(matrix, rowIndex, colIndex)
matrix.forEach(row => console.log(row))
