---
title: 'The .map() Method'
date: '2023-03-18'
tags: ['javascript', 'object', 'map']
---

If you're working with objects in JavaScript, you'll sometimes find yourself needing to transform an array into a new one with modified values.

In comes the .map() method - .map() is an immutable method that creates a new array with the results of calling a function on every element in the original array. Think of it like copying and pasting an existing array as a brand new one with a modified version of each element.

Let's take a look at an example to understand the .map() method in action. Consider the following array of numbers

```javascript
const numbers = [1, 2, 3, 4, 5];
```

Now, let's say we want to create a new array where each element is 2X the value of the corresponding element in the original array. Using the .map() method we can do it like so

```javascript
const doubledNumbers = numbers.map(num => num * 2);
console.log(doubledNumbers);
// Output: [2, 4, 6, 8, 10]
```

In this example, we use an arrow function as an argument on the .map() method. The function takes one argument (num), which represents the current element being processed, and returns a new value (num * 2). The .map() method then returns a new array with the modified values.

Something to keep in mind when working with the .map() method is that it always returns a _new_ array with the same number of elements as the original array. If the function passed to the .map() method does not return a value, the resulting array will contain undefined values.

To recap: the .map() method is a powerful tool in JavaScript for transforming arrays into new ones with modified values. It allows you to create a new array without modifying the original one, which is particularly useful when working with large datasets. Keep in mind that it always returns a new array with the same number of elements as the original, and that the original array remains unchanged.