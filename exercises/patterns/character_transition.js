// Homework: Character transition pattern
// Given width and two characters, print a pattern where:
// - Line 0: first char appears width times, second char 0 times
// - Line 1: first char appears (width-1) times, second char 1 time
// - ...continues until...
// - Line width: first char appears 0 times, second char width times
const printPattern = (width, char1, char2) => {
    let result = ""

    // outer loop: each line (0 to width, inclusive)
    for (let line = 0; line <= width; line++) {
        // inner loop 1: print char1 (width - line) times
        for (let j = 0; j < width - line; j++) {
            result += char1
        }
        // inner loop 2: print char2 (line) times
        for (let k = 0; k < line; k++) {
            result += char2
        }
        // add newline after each line
        result += "\n"
    }

    console.log(result)
};

// Test
printPattern(5, 'x', 'o')
