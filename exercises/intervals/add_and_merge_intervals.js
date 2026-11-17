// Create a function named addAndMergeIntervals which takes 2 parameters:
// startingList (a list of start,end time pairs) and newInterval (a single
// start time and end time pair). This function should NOT edit the original
// startingList. Instead, it should return a new list with the newInterval
// inserted into the new list AND any overlapping times should be merged into
// one interval. The resulting list that is returned should not have any
// overlapping time intervals. All times should be in army time (24 hour
// clock time).

// INPUT
// startingList: array of [start, end] pairs, sorted by start time, no overlaps
//   e.g. [[1,2],[3,5],[6,9]]
// newInterval: a single [start, end] pair
//   e.g. [2,5]

// OUTPUT
// A NEW array of [start, end] pairs containing newInterval, with all
// overlapping intervals merged. Sorted by start time, no overlaps.
// startingList is left unchanged.

// BRAINSTORM
// clarifying questions
// - Is startingList already sorted by start time?
//   Yes, it will already be sorted by start times.
// - Are intervals in startingList already non-overlapping?
//   startingList will NOT have any overlapping intervals that are NOT
//   merged already.
// - Does touching count as overlap, e.g. [1,2] and [2,5]?
//   Yes, touching = overlap.
// - Can intervals cross midnight (e.g. [22,3])?
//   No, you won't come across this case. You can always assume the end
//   time will be > the start time for each pair.

// examples
// startingList = [[1,2],[3,5],[6,9]], newInterval = [2,5]
//   -> [[1,5],[6,9]]   (newInterval merges [1,2] and [3,5])
// startingList = [[1,2],[3,5],[6,9]], newInterval = [10,23]
//   -> [[1,2],[3,5],[6,9],[10,23]]   (no overlap, appended at end)
// startingList = [], newInterval = [2,3]
//   -> [[2,3]]   (empty list, just insert)

// observations
// - Each existing interval falls into one of 3 buckets vs newInterval:
//   1. entirely before (end < newStart): goes to result unchanged
//   2. overlapping/touching: expands newInterval to min(start), max(end)
//   3. entirely after (start > newEnd): goes to result unchanged
// - Because the list is sorted, a single left-to-right pass is enough.
// edge cases
// - startingList is empty -> return [newInterval]
// - newInterval before all / after all -> prepend / append
// - newInterval swallows all intervals -> one big merged interval
// - newInterval inside an existing interval -> that interval unchanged
// - newInterval touches endpoints (adjacent) -> merge

// PLAN
// pseudocode
// function addAndMergeIntervals(startingList, newInterval):
//   result = empty list
//   merged = [newInterval.start, newInterval.end]  (copy, grow as we merge)
//   i = 0
//   // pass 1: everything ending before merged.start -> push to result
//   while i < length AND startingList[i].end < merged.start:
//     push startingList[i], i++
//   // pass 2: everything overlapping merged -> expand merged
//   while i < length AND startingList[i].start <= merged.end:
//     merged.start = min(merged.start, startingList[i].start)
//     merged.end   = max(merged.end,   startingList[i].end)
//     i++
//   // push the merged interval
//   push merged to result
//   // pass 3: everything after -> push unchanged
//   while i < length:
//     push startingList[i], i++
//   return result

// CODE

function addAndMergeIntervals(startingList, newInterval) {
  const result = [];
  const merged = [newInterval[0], newInterval[1]];
  let i = 0;

  while (i < startingList.length && startingList[i][1] < merged[0]) {
    result.push(startingList[i]);
    i++;
  }

  while (i < startingList.length && startingList[i][0] <= merged[1]) {
    merged[0] = Math.min(merged[0], startingList[i][0]);
    merged[1] = Math.max(merged[1], startingList[i][1]);
    i++;
  }

  result.push(merged);

  while (i < startingList.length) {
    result.push(startingList[i]);
    i++;
  }

  return result;
}

// Test cases
console.log(
  addAndMergeIntervals(
    [
      [1, 2],
      [3, 5],
      [6, 9],
    ],
    [2, 5],
  ),
);
// Expected: [[1,5],[6,9]]

console.log(
  addAndMergeIntervals(
    [
      [1, 2],
      [3, 5],
      [6, 9],
    ],
    [10, 23],
  ),
);
// Expected: [[1,2],[3,5],[6,9],[10,23]]

console.log(addAndMergeIntervals([], [2, 3]));
// Expected: [[2,3]]

console.log(
  addAndMergeIntervals(
    [
      [1, 2],
      [3, 5],
      [6, 9],
    ],
    [0, 24],
  ),
);
// Expected: [[0,24]]  (newInterval swallows everything)

console.log(addAndMergeIntervals([[1, 5]], [2, 3]));
// Expected: [[1,5]]  (newInterval contained inside existing)

console.log(
  addAndMergeIntervals(
    [
      [1, 2],
      [6, 9],
    ],
    [2, 6],
  ),
);
// Expected: [[1,9]]  (touching endpoints merge)

// Original list must be untouched
const original = [
  [1, 2],
  [3, 5],
  [6, 9],
];
addAndMergeIntervals(original, [2, 5]);
console.log(original); // Expected: [[1,2],[3,5],[6,9]]

// Time Complexity
// O(n) - single pass through startingList, each interval visited once.
//
// Space Complexity
// O(n) - the new result list (required since we cannot edit startingList).
// Excluding the output, auxiliary space is O(1).
