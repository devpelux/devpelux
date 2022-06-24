# Yaplayer
Javascript plugin to play audio from a YouTube video.


## How to use
1. Load the YouTube IFrame Player API.

```html
<script src="https://www.youtube.com/iframe_api"></script>
```

2. Load the javascript file.

```html
<script src="https://cdn.jsdelivr.net/gh/devpelux/devpelux@main/Assets/yaplayer/yaplayer.js"></script>
```

3. Add this div element where you want the audio player button.

```html
<div id="youtube-audio" 
data-loadfrom="https://cdn.jsdelivr.net/gh/devpelux/devpelux@main/Assets/yaplayer/" 
data-video="VIDEOID" 
data-autoplay="0" 
data-loop="0" 
data-volume="100" 
data-startseconds="10" 
data-endseconds="20" 
data-theme="light" 
data-size="64"></div>
```

4. Set the parameters:  

***`id`*** is the id of the player, change it only if you want multiple players.  
***`data-loadfrom`*** is the location of the javascript file, simply don't change it!  
***`data-video`*** is the **ID** of the YouTube video.  
***`data-autoplay`*** indicates to start playing audio immediately after the page loads (if is setted to `1`).  
***`data-loop`*** indicates to repeat audio continuously (if is setted to `1`).  
[***OPTIONAL***] ***`data-volume`*** changes audio volume between `0` to `100`.  
[***OPTIONAL***] ***`data-startseconds`*** is used to set the time where the audio will begin playing (in seconds).  
[***OPTIONAL***] ***`data-endseconds`*** is used to set the time where the audio will end playing (in seconds).  
[***OPTIONAL***] ***`data-theme`*** is used to set the theme of the audio player (`light` or `dark`).  
[***OPTIONAL***] ***`data-size`*** is used to set the size of the audio player (in pixels).


## License
By devpelux - Licensed under [The Unlicense](https://unlicense.org).
