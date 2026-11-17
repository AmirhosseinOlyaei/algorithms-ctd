def three_sum(arr):
    """
    Find all unique triplets in the array that sum to zero.

    Args:
        arr: List of integers

    Returns:
        List of lists containing unique triplets that sum to zero
    """
    arr.sort()
    result = []
    n = len(arr)

    for i in range(n - 2):
        # Skip duplicates for the first element
        if i > 0 and arr[i] == arr[i - 1]:
            continue

        left = i + 1
        right = n - 1

        while left < right:
            current_sum = arr[i] + arr[left] + arr[right]

            if current_sum == 0:
                result.append([arr[i], arr[left], arr[right]])

                # Skip duplicates for left pointer
                while left < right and arr[left] == arr[left + 1]:
                    left += 1
                # Skip duplicates for right pointer
                while left < right and arr[right] == arr[right - 1]:
                    right -= 1

                left += 1
                right -= 1
            elif current_sum < 0:
                left += 1
            else:
                right -= 1

    return result


# Test cases
if __name__ == "__main__":
    test_cases = [
        ([-3, 0, 1, 2, -1, 1, -2], [[-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]),
        ([-5, 2, -1, -2, 3], [[-5, 2, 3], [-2, -1, 3]]),
        ([-3, 2, 0], []),
        ([-1, 0, 1, -1, 0, 1], [[-1, 0, 1]]),
    ]

    for i, (input_arr, expected) in enumerate(test_cases, 1):
        result = three_sum(input_arr)
        print(f"Example {i}:")
        print(f"Input: {input_arr}")
        print(f"Output: {result}")
        print(f"Expected: {expected}")
        print(
            f"{'✓' if sorted([sorted(t) for t in result]) == sorted([sorted(t) for t in expected]) else '✗'}"
        )
        print()
