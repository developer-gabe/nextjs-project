---
title: 'Next.js Image Component' 
date: '2023-05-16'
tags: ['javascript', 'nextjs', 'react', 'optimization']
---

Let's dive into the `<Image>` component, a supercharged variant of the HTML `<img>` element. It's engineered to elevate our app's Core Web Vitals by providing a bunch of performance enhancements.

The Next.js `<Image>` component cleverly serves the ideal image size for every device, leveraging modern image formats. This makes sure our images load quickly, boosting those Core Web Vitals scores.

The `<Image>` component also champions stability. It helps us prevent Cumulative Layout Shift, a problem that happens when images load on our page and cause the layout to bounce around. By avoiding this, we maintain a stable app and offer our users a smooth experience. By loading images just as they're about to enter the viewport, we can reduce the amount of data that needs to load when someone visits your site.

To get started with the `<Image>` component in our Next.js app, we first need to import it with this line of code

```javascript
import Image from 'next/image'
```

Once we've added the `<Image>` component to our toolkit, we can specify the source of our image, whether it's local or remote. For local images, we can import our .jpg, .png, or .webp files with code like this

```javascript
import profilePic from '../public/me.jpg'
```

Next.js will then automatically determine the width and height of our image based on the file we imported. These values are employed to prevent any layout shift while our image is loading. We can display our image with the `<Image>` component like so

```javascript
<Image
  src={profilePic}
  alt="Photo of the author"
/>
```

If we're working with remote images, we'll need to manually input the width and height, as Next.js can't access remote files during the build process 

```javascript
<Image
  src="remote.com/me.jpg"
  alt="Photo of the author"
  width={500}
  height={500}
/>
```

It's important to note that Next.js has a built-in loader for images that utilizes its Image Optimization API. This API can optimize images from anywhere on the web and serves them from the Next.js web server. However, if we want to serve our images from a CDN or image server, we can craft our own loader function with just a few lines of JavaScript.

An additional handy feature of the `<Image>` component is that it allows us to set the priority of our images. This is particularly useful for fine-tuning the Largest Contentful Paint element for each page. By tagging the image that will be the LCP element with the priority property, Next.js can prioritize it, leading to a noticeable boost in LCP.

 With the addition of the `Image` component, we can ensure that our images are consistently at their best, delivering an unrivaled experience to our users.