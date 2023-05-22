```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    body, html {
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    
    iframe {
      width: 80%;
      height: 80%;
      border: none;
    }
    #fullscreen-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1;
    }
  </style>
    <script>
    function toggleFullscreen() {
      var iframe = document.getElementById("quiz-iframe");
      
      if (!document.fullscreenElement) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  </script>
</head>
<body>
    <button id="fullscreen-btn" onclick="toggleFullscreen()">Toggle Fullscreen</button>
    <iframe id="quiz-iframe" src="https://jigyasa-admin-ebyaq5fgu-thelalitkumar.vercel.app" allowfullscreen></iframe>
</body>
</html>
```
