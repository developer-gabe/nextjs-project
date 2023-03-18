---
title: 'A little bit of CSS micro-interactions and some cards'
date: '2020-03-07'
tags: ['css', 'micro-interactions']
---

I recently reworked my site to feature cards on the homepage that acts as a gallery for some of the recent drawings that I’ve done. 

Initially, I had the cards pop a bit on hover by giving them a drop shadow. I played around with various other properties for a few hours before ending up with the following

![Demonstrating the zoom-in and text-stretch effect that happens on mouse hover](https://dev-to-uploads.s3.amazonaws.com/i/ibo0jrauamuyh5tvzex8.gif)

A few micro-interactions are happening in the GIF above. 

- Zoom effect on the image
- Increased letter spacing in the title
- Box-shadow transitions between a subtle/noticeable state
 
These are all done in conjunction with CSS transitions, to give it a smooth effect, both in and out.

To create that, I started with three divs. One is the actual card, the second is where we will house the background image, and the third is our title box.

```html
<div class="card">
  <div class="card_background"> </div>
  <div class="title">
    <h2>Parallax Galaxy</h2>
  </div>
</div>
```

The CSS was a bit more involved. I also had to mess around with the transitions a bit until I got it just right.

```css
.card {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all .3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0, 0, 0, 0.295);
}

.card_background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 50vh;
  transition: all 2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover .card_background {
  transform: scale(1.1);
}

.card:hover .title {
  letter-spacing: 4px;
}

.title {
  position: absolute;
  left: 0;
  top: 2rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 1);
  max-width: 400px;
  transition: all 3s cubic-bezier(0.25, 0.8, 0.25, 1);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.title h2 {
  display: inline-block;
  width: auto;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
}

```

The end-effect functioning on multiple images. A relatively quick and easy way to spice-up any gallery.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/9oe5k60k38wgxhuh2e7o.gif)




