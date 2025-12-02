function mergeSortedArrs(arr1, arr2) {
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

function getMedianSortedArrs(arr1, arr2) {
    const merged = mergeSortedArrs(arr1, arr2);
    const len = merged.length;
    const mid = Math.floor(len / 2);

    if (len % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    } else {
        return merged[mid];
    }
}


console.log(getMedianSortedArrs([1, 3], [2]));     // Output: 2
console.log(getMedianSortedArrs([1, 2], [3, 4]));  // Output: 2.5
