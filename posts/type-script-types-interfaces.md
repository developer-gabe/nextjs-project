---
title: 'TypeScript: Types & Interfaces'
date: '2024-05-14'
tags: ['typescript', 'types', 'interfaces']
---

TypeScript is certainly here to stay and in modern development setups it's nearly impossible to avoid. One of the main reasons it exists and is so popular is because of its type system. In this post I'll be breaking down some of the Types and Interfaces that TypeScript has to offer.

## Types

In TypeScript types are used to specify the kind of data a variable can hold. For example, you can define a variable to hold a `string`, `number`, `boolean`, `object`, etc. But how is this helpful? By defining types, we are able to catch errors at compile time, rather than at runtime. Meaning we can catch errors before they actually happen in the browser. If you're using VS Code like myself, you'll notice that anytime there is an error in your TypeScript file, it will be very clearly underlined in red. TypeScript is great at catching these errors and helping you fix them before they become a real problem.

Diving into the different types that TypeScript has to offer, we have:

```typescript
//String
let myString: string = 'Hello world!';

//Number
let myNumber: number = 42;

//Boolean
let myBoolean: boolean = true;

//Array
let myArray: number[] = [1, 2, 3, 4, 5];

//Object
let myObject: { name: string, age: number } = {
	name: 'Mikel Arteta',
	age: 39
};

//Any
let myAny: any = 'Howdy, world!';

//Void
function myFunction(): void {
	console.log('');
}

//Null
let myNull: null = null;

//Undefined
let myUndefined: undefined = undefined;

//Never
function myError(message: string): never {
	throw new Error(message);
}
```

Granted there are more types that TypeScript has to offer, and you can even go as far as creating your own custom types but for now, just know that these are some of the basic types that you'll come across in TypeScript.

## Interfaces

Interfaces are a bit different from types in that they are used to define the structure of an object, rather than the type of data a variable can hold. In a typical JavaScript object, you can add any property to an object at any time. While convenient, this can be a bit dangerous as you may not always know what properties an object has. This is where interfaces come into play. They allow you to define the structure of an object, sort of like a blueprint. This way, you can be sure that an object has the properties you expect it to have, thus reducing the chances of unexpected behavior.

Let's take a look at what an interface looks like in your typical TypeScript file.

```typescript
interface footballPlayer {
	name: string;
	age: number;
	position: string;
	team: string;
	retired: boolean;
}

let player: footballPlayer = {
	name: 'Martin Odegaard',
	age: 22,
	position: 'Midfielder',
	team: 'Arsenal'
	retired: false
};
```

In the example above, we've defined an interface called `footballPlayer` that has five properties: `name`, `age`, `position`,`team`, and `retired`. We then create a variable called `player` that is of type `footballPlayer`. This means that the `player` object must have the properties defined in the `footballPlayer` interface. If we were to add a property that is not defined in the interface, let's say `goalsScored`, TypeScript would throw an error, letting us know that `goalsScored` is not a valid property for the `footballPlayer` interface.

While TypeScript may seem like it's doing the most to keep your JavaScript code rigid and strict, it's truly doing us a favor by not only catching errors before they happen but also making our code more predictable and easier to understand. The benefits of including TypeScript in any team based project are certainly up there. 