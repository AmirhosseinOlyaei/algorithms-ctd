/**
 * Find the length of the longest substring without repeating characters
 * 
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with length 3
 * 
 * Example 2:
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with length 1
 * 
 * Example 3:
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with length 3
 */

// ============================================================
// STEP 1: Understanding the Sliding Window Technique
// ============================================================
/**
 * Sliding Window is a technique where we maintain a "window" (a range)
 * that expands and contracts based on certain conditions.
 * 
 * For this problem:
 * - We use TWO POINTERS: left and right
 * - RIGHT pointer expands the window (moves forward)
 * - LEFT pointer contracts the window (moves forward when we find duplicates)
 * - We track characters in the current window using a Set or Map
 * 
 * Visual Example with "abcabcbb":
 * 
 * Step 1: window = "a"     -> length = 1
 * Step 2: window = "ab"    -> length = 2
 * Step 3: window = "abc"   -> length = 3 ✓ (max so far)
 * Step 4: window = "abc|a" -> duplicate 'a'! Shrink from left
 *         window = "bca"   -> length = 3
 * ... and so on
 */

// ============================================================
// STEP 2: Observations
// ============================================================
/**
 * observations:
 * 1. We need to track which characters are in our current window
 * 2. When we find a duplicate, we need to remove characters from the left
 *    until the duplicate is gone
 * 3. We keep track of the maximum window size we've seen
 * 4. A Set is perfect for tracking unique characters (O(1) lookup)
 * 5. Time complexity will be O(n) - each character visited at most twice
 *    (once by right pointer, once by left pointer)
 */

// ============================================================
// STEP 3: Pseudo Code
// ============================================================
/**
 * psuedo code:
 * 
 * function lengthOfLongestSubstring(s):
 *     initialize left pointer = 0
 *     initialize maxLength = 0
 *     initialize a Set to track characters in current window
 *     
 *     for right pointer from 0 to end of string:
 *         current character = s[right]
 *         
 *         // If character already exists in window, shrink from left
 *         while current character is in Set:
 *             remove s[left] from Set
 *             move left pointer forward
 *         
 *         // Add current character to window
 *         add current character to Set
 *         
 *         // Update max length
 *         maxLength = max(maxLength, right - left + 1)
 *     
 *     return maxLength
 */

// ============================================================
// STEP 4: Code Implementation
// ============================================================

function lengthOfLongestSubstring(s) {
    // Edge case: empty string
    if (s.length === 0) return 0;
    
    let left = 0;                    // Left pointer of the window
    let maxLength = 0;               // Track the maximum length found
    let charSet = new Set();         // Track characters in current window
    
    // Right pointer expands the window
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // While we have a duplicate, shrink window from left
        while (charSet.has(currentChar)) {
            charSet.delete(s[left]);
            left++;
        }
        
        // Add current character to our window
        charSet.add(currentChar);
        
        // Update max length (window size is right - left + 1)
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// ============================================================
// STEP 5: Detailed Walkthrough with Example
// ============================================================

function lengthOfLongestSubstringWithLogs(s) {
    console.log(`\n=== Finding longest substring for: "${s}" ===\n`);
    
    let left = 0;
    let maxLength = 0;
    let charSet = new Set();
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        console.log(`Step ${right + 1}: Checking character '${currentChar}' at index ${right}`);
        
        // Shrink window if duplicate found
        while (charSet.has(currentChar)) {
            console.log(`  ⚠️  Duplicate found! Removing '${s[left]}' from left`);
            charSet.delete(s[left]);
            left++;
        }
        
        // Add to window
        charSet.add(currentChar);
        const windowSize = right - left + 1;
        
        // Update max
        if (windowSize > maxLength) {
            maxLength = windowSize;
            console.log(`  ✓ New max length: ${maxLength}`);
        }
        
        // Show current state
        const window = s.substring(left, right + 1);
        console.log(`  Window: [${left}, ${right}] = "${window}" (size: ${windowSize})`);
        console.log(`  Characters in window: {${Array.from(charSet).join(', ')}}\n`);
    }
    
    console.log(`Final Answer: ${maxLength}\n`);
    return maxLength;
}

// ============================================================
// STEP 6: Alternative Solution Using Map (Optimization)
// ============================================================
/**
 * Instead of using a while loop to shrink the window,
 * we can use a Map to store the last index of each character.
 * This allows us to jump the left pointer directly to the right position.
 */

function lengthOfLongestSubstringOptimized(s) {
    let left = 0;
    let maxLength = 0;
    let charIndexMap = new Map();  // Store character -> last seen index
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // If character exists and is in current window
        if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar) >= left) {
            // Jump left pointer to position after the duplicate
            left = charIndexMap.get(currentChar) + 1;
        }
        
        // Update the character's position
        charIndexMap.set(currentChar, right);
        
        // Update max length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// ============================================================
// STEP 7: Test Cases
// ============================================================

console.log("====================================");
console.log("TESTING WITHOUT LOGS");
console.log("====================================\n");

// Test Case 1
console.log('Test 1: "abcabcbb"');
console.log("Expected: 3");
console.log("Result:", lengthOfLongestSubstring("abcabcbb"));
console.log();

// Test Case 2
console.log('Test 2: "bbbbb"');
console.log("Expected: 1");
console.log("Result:", lengthOfLongestSubstring("bbbbb"));
console.log();

// Test Case 3
console.log('Test 3: "pwwkew"');
console.log("Expected: 3");
console.log("Result:", lengthOfLongestSubstring("pwwkew"));
console.log();

// Test Case 4
console.log('Test 4: ""');
console.log("Expected: 0");
console.log("Result:", lengthOfLongestSubstring(""));
console.log();

// Test Case 5
console.log('Test 5: "dvdf"');
console.log("Expected: 3");
console.log("Result:", lengthOfLongestSubstring("dvdf"));
console.log();

console.log("\n====================================");
console.log("DETAILED WALKTHROUGH WITH LOGS");
console.log("====================================");

// Detailed walkthrough
lengthOfLongestSubstringWithLogs("abcabcbb");
lengthOfLongestSubstringWithLogs("pwwkew");

console.log("\n====================================");
console.log("TESTING OPTIMIZED VERSION");
console.log("====================================\n");

console.log('Test: "abcabcbb"');
console.log("Result:", lengthOfLongestSubstringOptimized("abcabcbb"));
console.log();

console.log('Test: "pwwkew"');
console.log("Result:", lengthOfLongestSubstringOptimized("pwwkew"));

// ============================================================
// STEP 8: Key Takeaways
// ============================================================
/**
 * KEY CONCEPTS TO REMEMBER:
 * 
 * 1. Sliding Window Pattern:
 *    - Use two pointers (left and right)
 *    - Right pointer explores new elements
 *    - Left pointer maintains window validity
 * 
 * 2. Time Complexity: O(n)
 *    - Each character is visited at most twice
 *    - Once by right pointer, once by left pointer
 * 
 * 3. Space Complexity: O(min(n, m))
 *    - n is string length
 *    - m is charset size (e.g., 26 for lowercase letters)
 * 
 * 4. When to use Sliding Window:
 *    - Finding subarrays/substrings that satisfy certain conditions
 *    - Need to optimize from O(n²) brute force to O(n)
 *    - Window size can grow and shrink dynamically
 * 
 * 5. Common Sliding Window Problems:
 *    - Longest substring without repeating characters (this one!)
 *    - Minimum window substring
 *    - Maximum sum subarray of size K
 *    - Longest substring with K distinct characters
 */
