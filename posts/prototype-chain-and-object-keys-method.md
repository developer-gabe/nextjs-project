---
title: 'Understanding the Prototype Chain with Object.keys()'
date: '2023-03-12'
tags: ['javascript', 'object', 'prototype']
---

>The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.
>
> -mdn web docs

When writing JavaScript, it is important to understand the concept of the prototype chain. Every JavaScript object has an internal property called the prototype, which is essentially a reference to another object (the prototype object). This prototype object too can have its own prototype object, creating an inception like chain of objects linked by their prototypes. 

One method that is often used when working with objects in JavaScript is <b>Object.keys().</b> It lets us to obtain a list of all the properties that are defined directly to an object. It doesn't include properties that are inherited from its prototype chain though. Let's explore how to use Object.keys() to understand the prototype chain and access properties defined on parent objects.

Consider this example object named child

```javascript
const child = {
  name: "Child Object",
  age: 10
};
```

What we have here is a simple object with two properties, name and age. We can define a parent object for our child object like this

```javascript
const parent = {
  name: "Parent Object",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
	//Output: Hello, my name is Parent Object
  }
};
```

We can then set the parent object as the prototype for the child using the Object.setPrototypeOf() method
 d
```javascript
Object.setPrototypeOf(child, parent);
```

Now, when we call Object.keys(child), we should only see the properties defined directly on the child object

```javascript
console.log(Object.keys(child)); 
//Output: ["name", "age"]
```

This is because Object.keys() will ever only return the object's own property names, it does not include inherited properties.

To access the properties defined on the parent, we can make use of the Object.getPrototypeOf() method to get the prototype of the child, and then call Object.keys() on it

```javascript
console.log(Object.keys(Object.getPrototypeOf(child))); 
//Output: ["name", "greet"]
```

So to recap: Object.keys() is a method used for getting a list of an object's own properties, but it does not include inherited properties. To access properties defined on parent objects, we can use Object.getPrototypeOf() to get the prototype of an object and then call Object.keys() on it.