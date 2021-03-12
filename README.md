# JS_Share
Simple JS script for sharing links. It will get the current URL or you can set it manually.

---

## Overview
This script was built to help to deterine where your users mostly share your content. You can pass a callback function to the script, and it will return a event label for you to send in your Google Analytics or Facebook Pixel or whatever you want. This can help you to see which social media your public likes the most.

It also have a WhatsApp floating Widget

---

## How to use
Just load the script and the css on your HTML page, and then use: 
```javascript
<script>
Share.init({element:someElementId})
</script>
```

The script will render and append the generate HTML to the given element. 

---

## Parameters

You can pass an object to set the wrapper element, set/unset which social media you want your public to share, set if you want the social media name on its button, set if you want a button to show the options, set the URL and more stuff. 

Here's an example: 
```javascript
<script>
Share.init({element:shareWrapper,withText:false,withButton:true,shareButtonText:'share',withWindow:true,url:'https://mycustomurl',onShare:function(label){
        console.log(label);
      }});
</script>
```

You can set the WhatsApp widget with a string number, or an array of numbers. You can also set a corner side with "left" or "right" (default is "right") Here's an example:
```javascript
<script>
Share.createFloatingWhatsAppWidget("{phone Number Or array number goes here}","left");
</script>
```

Enjoy!
