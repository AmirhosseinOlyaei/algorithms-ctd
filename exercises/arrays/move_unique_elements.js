// Given an array of sorted numbers, move all non-duplicate number instances at the beginning of the array in-place. The non-duplicate numbers should be sorted and you should not use any extra space so that the solution has constant space complexity i.e., .

// Move all the unique number instances at the beginning of the array and after moving return the length of the subarray that has no duplicate in it.

// Example 1:

// Input: [2, 3, 3, 3, 6, 9, 9]
// Output: 4
// Explanation: The first four elements after moving element will be [2, 3, 6, 9].
// Example 2:

// Input: [2, 2, 2, 11]
// Output: 2
// Explanation: The first two elements after moving elements will be [2, 11].
// Constraints:

// 1 <= nums.length <= 3 * 104
// -100 <= nums[i] <= 100
// nums is sorted in non-decreasing order.

/*
Pseudocode:
function moveUnique(nums):
  if nums is empty:
    return 0
  
  writeIndex = 0
  
  for readIndex from 0 to nums.length - 1:
    if readIndex === 0 OR nums[readIndex] !== nums[readIndex - 1]:
      nums[writeIndex] = nums[readIndex]
      writeIndex++
  
  return writeIndex
*/

function moveUnique(nums) {
  if (nums.length === 0) {
    return 0;
  }
  
  let writeIndex = 0;
  
  for (let readIndex = 0; readIndex < nums.length; readIndex++) {
    if (readIndex === 0 || nums[readIndex] !== nums[readIndex - 1]) {
      nums[writeIndex] = nums[readIndex];
      writeIndex++;
    }
  }
  
  return writeIndex;
}

// Test cases
console.log(moveUnique([2, 3, 3, 3, 6, 9, 9])); // Output: 4
console.log(moveUnique([2, 2, 2, 11])); // Output: 2

/*
option 2

    [2, 3, 6, 9, 3, 3, 9] => 9 === 9 => true
                         j
                     i

    [2, 11, 2, 2]
                  j
         i

     // How Pointers move
     // Compare values that pointers i and j point to
        // if values are different
            // swap front val with back + 1 val
            // move both pointers
        // if values are same
            // move front pointer
        // return front pointer index + 1


*/ 
