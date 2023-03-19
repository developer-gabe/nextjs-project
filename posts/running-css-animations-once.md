---
title: 'Running CSS Animations Once Per Session'
date: '2020-07-18'
tags: ['css', 'animation', 'session-storage', 'beginner']
---

I was working on some intro animations the other day for my site and had an idea to have a user land on the homepage, and the word “hello” would slide in from the left greeting them.

The animation bit was reasonably straightforward, I used CSS animations to translate the text’s X value from -100% to zero. When testing the animation, I got what I wanted; the text now slid in from the left. 

```css
@keyframes slideInFromLeft {
	0% {
		transform: translateX(-100%);
	}

	100% {
		transform: translateX(0);
	}
}
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/kvbo9s9le9tv6m3nf41t.gif)

There was a problem though, every time I refreshed the page, the animation would replay, this got pretty annoying when navigating through the site and returning home. So I decided to use some JavaScript and the Window's session-storage property to solve my problem.

For those who may be unfamiliar with the session-storage property: think of it like local-storage. With local-storage, we can store data that won't expire. The difference with session-storage is that the data expires after the window or browser tab is closed.

I started with an if statement that read something like “If a property called animated within the session-storage property is equal to null, run the following code”  

```js
if (window.sessionStorage.getItem(‘animated’) === null) {} 
```
Within that if statement code block, I targeted the text that would be animating, added the “animate” class to it, which contained the CSS animation rule, and then set the animated property within session-storage to 1. 
```js
if (window.sessionStorage.getItem(‘animated’) === null) { 
	document.getElementById(‘my-text’).classList.add(‘animate’);
	window.sessionStorage.setItem(‘animated’ ,1);
} 
```
And now, the animation only fires once per session. A quick and easy way to ensure we don’t annoy our users with our fancy animations.