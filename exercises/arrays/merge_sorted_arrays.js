// Merge two sorted arrays into one sorted array.
// Two implementations: recursive and iterative.
// Also includes getMedianSortedArrs, which uses the merge to find the
// median of two sorted arrays.

// INPUT
// arr1, arr2: two arrays sorted in ascending order

// OUTPUT
// A new array containing all elements from both arrays, sorted.

// Iterative two-pointer - O(n + m) time, O(n + m) space
function mergeSortedArrays(arr1, arr2) {
    let i = 0;
    let j = 0;
    let merged = [];

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[j]);
            j++;
        }
    }

    // Add remaining elements
    while (i < arr1.length) {
        merged.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        merged.push(arr2[j]);
        j++;
    }

    return merged;
}

// Recursive - O(n + m) time, O(n + m) space
function mergeSortedArraysRecursive(arr1, arr2) {
    return mergeSortedArraysRecursively(arr1, 0, arr2, 0, []);
}

function mergeSortedArraysRecursively(arr1, arr1Ind, arr2, arr2Ind, mergedArr) {
    if (arr1Ind >= arr1.length) {
        const remainingToMerge = arr2.slice(arr2Ind);
        return mergedArr.concat(remainingToMerge);
    }

    if (arr2Ind >= arr2.length) {
        const remainingToMerge = arr1.slice(arr1Ind);
        return mergedArr.concat(remainingToMerge);
    }

    if (arr1[arr1Ind] < arr2[arr2Ind]) {
        mergedArr.push(arr1[arr1Ind])
        return mergeSortedArraysRecursively(arr1, arr1Ind + 1, arr2, arr2Ind, mergedArr)
    } else {
        mergedArr.push(arr2[arr2Ind])
        return mergeSortedArraysRecursively(arr1, arr1Ind, arr2, arr2Ind + 1, mergedArr)
    }
}

// Median of two sorted arrays, via merge - O(n + m) time
function getMedianSortedArrs(arr1, arr2) {
    const merged = mergeSortedArrays(arr1, arr2);
    const len = merged.length;
    const mid = Math.floor(len / 2);

    if (len % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    } else {
        return merged[mid];
    }
}

console.log(mergeSortedArrays([0, 2, 3, 5, 9], [1, 2, 4, 6, 7, 10]))
// → [0,1,2,2,3,4,5,6,7,9,10]

console.log(mergeSortedArraysRecursive([0, 2, 3, 5, 9], [1, 2, 4, 6, 7, 10]))
// → [0,1,2,2,3,4,5,6,7,9,10]

console.log(getMedianSortedArrs([1, 3], [2]));     // Output: 2
console.log(getMedianSortedArrs([1, 2], [3, 4]));  // Output: 2.5
