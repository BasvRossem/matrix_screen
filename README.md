# Matrix Screen

That one part of the matrix with the symbols falling from above. It is made in javascript.

I was looking around on YouTube the other day and found the youtube channel Coding Train (a very fun channel to watch, I highly recomment them). On this channel Emily Xie made a guest appearance and created a matrix like effect. It looked quite cool, but some people in the comments mentioned that the letters in the matrix don't "wain down", but rather they are statically placed and the character changes to the new spot. I took this as a challenge and made my own version of the Matrix effect, partially following Emily's instructions.

<iframe width="560" height="315" src="https://www.youtube.com/embed/S1TQCi9axzg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The code can be found on this Github page. Feel free to take a look and copy and improve upon it!

The javascript sketch is made using the p5 library, just as in the video. The code is quite simple. The characters are a custom symbol class and those symbols are stored in a stream class. A symbol can be the first in a stram and it will have a slightly lighter colour. The background is slightly transparent so the sybols leave a trailing effect.
