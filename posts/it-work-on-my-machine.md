---
title: 'It Works on My Machine: Debugging Production bugs in NextJS'
date: '2024-05-24'
tags: ['javascript', 'nextjs', 'react', 'debugging']
---


One of the more frustrating things in the development cycle is when you have your code all tested and working as intended locally, and even in staging. But then when we deploy it to production and it breaks. What the hell. It worked on my machine!

I recently had to add a new `prop` to a component we use to showcase different types of entries from our CraftCMS instance and display it in a carousel fashion. The prop being added was pretty simple, called `ungatedResources` and it was a boolean. If set to true, my component would grab any entries labeled `resources` and display them in the carousel as usual but in addition, adds a bypass to the url so that the user doesn't have to fill out a form to download the resource. Nothing too crazy. 

It wasn't until I tested the component that I realized our bypass wasn't working as intended. Rather than take us to the thank you page with the resource ready to download, I got stuck with an ugly broken page with a "Loading..." indicator that never went away.