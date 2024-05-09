---
title: 'Client Side Errors in NextJS'
date: '2024-05-09'
tags: ['javascript', 'nextjs', 'react', 'client-side-errors', 'debugging']
---


NextJS is our preferred framework for building React applications here at Abnormal. It's relatively ease of use and the ability to handle server-side rendering out of the box makes it a great choice for our projects. However, one thing that can be a bit tricky to handle in NextJS is client-side errors. 

Server-side errors I generally find a bit easier to debug, as they're usually logged on the Vercel dashboard. Client-side errors, on the other hand, can be a bit more tricky to debug as those errors will not show up on the dashboard. Instead they show up as a broken page on your app, generally causing a bit of panic. But before we dive into debugging, I think it's best we  first understand what the difference is between a client-side vs server-side error?

## Client-side vs Server-side Errors

The names should give it away almost immediately but just to clarify: client-side errors happen on the client side, like a users browser or mobile phone. Server-side errors happen on the server, like your API or database. While both are errors, they are handled differently and thus we must approach debugging them differently.

## Debugging Client-side Errors

Whenever I come across a client-side error in one of our NextJS apps, the first thing I do is open up the browser console to see if there is any information that is relevant or helpful in debugging the error. Don't let the haters fool you, the browser console is a fantastic tool for debugging client-side errors as it will usually give you a stack trace and the line number where the error occurred. 

If I find that the browser console isn't necessarily helping me. My next go-to is to boot up my application locally and navigate to the page or component where the error occurred. Here, we can usually find detailed information about the error that is happening, down to the exact line of code that is causing the issue. Once the fix is applied, tested and confirmed, we push those changes up and deploy the app.

Another option is to use a service like Sentry to log client-side errors. Sentry is a solid tool for logging errors in your application and can be another way to track down client-side errors that are happening in your app. Though I personally find that the browser console and local debugging are usually enough to track down and fix client-side errors, some may find Sentry to be a better option, especially if you're working on a larger team.

That being said, client-side errors can be a bit tricky to debug in NextJS, but with the right tools and approach, they can be tracked down and fixed in no time. If you're working on a NextJS app and are struggling with client-side errors, I recommend using the tips above to help track down those errors. And when all else fails, we can always hit up the NextJS community for help.