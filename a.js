function mergeSortedArrays(arr1, arr2) {
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

console.log(mergeSortedArrays([0, 2, 3, 5, 9], [1, 2, 4, 6, 7, 10]))
// → [0,1,2,2,3,4,5,6,7,9,10]