# f-sort

A fast, small (~0.5 KB gzipped) and dependency-free JavaScript library to sort arrays. It uses quick sort internally to sort arrays _in place_, without recursion. Simply replace JavaScript's built-in `Array.prototype.sort` with f-sort's `sort` to see ~2x performance. This is especially for helpful for large arrays.

The cherry on top of the cake - it sorts numbers in the increasing order of value, out of the box, [something that can not be said for JavaScript's native sort method](https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly) :)

## Installation

```bash
npm install f-sort
#OR
yarn add f-sort
```

## API Reference

### `sort()`

_Definition:_

```javascript
sort(
    array: any[], // required
    comparator?: function, // optional
    pivotExtractor?: function // optional
) -> any[]
```

#### Parameters

1. `array: any[]` | _Required_ | The array that will be sorted in place.
1. `comparator: function(a: any, b: any) -> Number` | _Optional_ | A function used to compare two elements of the array. The function is passed two elements of the array, and it should return a number denoting the comparison of the two elements -

    1. `comparator(a, b) < 0` - `a < b`
    1. `comparator(a, b) === 0` - `a === b`
    1. `comparator(a, b) > 0` - `a > b`

    _Default value_

    ```javascript
    (a, b) => a - b;
    ```

    This default comparator sorts the array in increasing order if it comprises of numbers.

    ##### Provided comparator

    `f-sort` provides 2 comparators out of the box -

    1. `ascNumberComparator` - Sorts numbers in ascending order (default comparator)
    1. `descNumberComparator` - Sorts numbers in descending order

    These can be imported as -

    ```javascript
    import { comparators } from "f-sort";
    ```

    And used as

    ```javascript
    sort(arr, comparators.ascNumberComparator); // ascending order
    sort(arr, comparators.descNumberComparator); // descending order
    ```

1. `pivotExtractor: function(arr: any[], left: Number, right: Number) -> Number` | _Optional_ | A function that returns the pivot to partition the array between left (inclusive) and right (exclusive) indices. This parameter is exposed for more advance uses - the default value works for most cases. The returned pivot must be in the range in the following range - `left <= pivot < right`>

    ##### Default value

    The default pivot extractor returns the middle element of the range between
    `left` and `right`.

    ```javascript
    // Return the index between left and right
    // Same as Math.floor((left + right) / 2), but faster.
    (arr, left, right) => (left + right) >>> 1;
    ```

    The `pivotExtractor` argument can be used to implement more advanced pivot selection techniques like quick select.

    ##### Provided pivotExtractors

    `f-sort` provides 4 pivot extractors out of the box -

    1. `mid` - Returns the middle index of the range as the pivot (Default)
    1. `first` - Returns the first index of the range (left) as the pivot
    1. `last` - Returns the last index of the range (right - 1) as the pivot
    1. `random` - Returns a random index in the range left to right - 1

    These can be import as -

    ```javascript
    import { pivotExtractors } from "f-sort";
    ```

    And used as

    ```javascript
    sort(arr, undefined, pivotExtractors.mid);
    sort(arr, undefined, pivotExtractors.first);
    sort(arr, undefined, pivotExtractors.last);
    sort(arr, undefined, pivotExtractors.random);
    ```

## Usage and examples

Import the sort function from f-sort, and simply pass the array to sort. The function does not create a copy of the array, and sorts it in-place, and returns the sorted array.

```JavaScript
import { sort } from "f-sort";
const arr = [-1, 1, 100, 20000, 8];
const sortedArr = sort(arr);
console.log("sortedArr:", sortedArr);
console.log("arr:", arr);
```

The following code outputs -

```
arr: [ -1, 1, 8, 100, 20000 ]
sortedArr: [ -1, 1, 8, 100, 20000 ]
```

Notice, the returned array is just a reference to the array passed into the function. If you wish to make a sorted copy of the array, clone the array before passing it into sort, like so -

```JavaScript
import { sort } from "f-sort";
const arr = [-1, 1, 100, 20000, 8];
const sortedArr = [...arr];
sort(sortedArr);
console.log(sortedArr);
console.log(arr);
```

The following code outputs -

```
arr: [ -1, 1, 100, 20000, 8 ]
sortedArr: [ -1, 1, 8, 100, 20000 ]
```

### Using a comparator

A comparator can be passed to `sort()` to help sort the array in a custom order, or to sort incomparable types, like objects.

1. Sorting numbers by the squares of their values

    ```javascript
    const arr = [-2, 1, 2, -3];
    sort(arr, (a, b) => a * a - b * b);
    console.log("arr:", arr);
    ```

    The following snippet outputs -

    ```
    arr: [ 1, 2, -2, -3 ]
    ```

1. Sorting an array of objects, of the shape -
    ```javascript
    { x: Number, y: Number };
    ```
    The following snippet sorts an array of such objects by the value of their `x` property.
    ```javascript
    const arr = [
    	{ x: 100, y: 21 },
    	{ x: -50, y: 1000 },
    	{ x: 99, y: 100 },
    	{ x: 200, y: -100 },
    ];
    sort(arr, (a, b) => a.x - b.x);
    console.log("arr:", arr);
    ```
    The following code outputs -
    ```
    arr: [
        { x: -50, y: 1000 },
        { x: 99, y: 100 },
        { x: 100, y: 21 },
        { x: 200, y: -100 }
    ]
    ```
