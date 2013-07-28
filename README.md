818.md
======

浏览器支持的html5不支持流格式、也就是说，将使用ffmpeg编码并存放在硬盘上的文件，通过http传递给浏览器，浏览器可以正常播放。
但是使用ffmpeg以流的格式实时转换的视频流，浏览器就无法识别。两种方式对于ffmpeg使用的参数有一点不同，使用的参数分别如下：

> 流方式：

> ffmpeg -y -i INPUT_FILE -r 30000/1001 -b 2M -bt 4M -vcodec libx264 -vpre hq -threads 0 -async 1 -acodec libfaac -ac 2 
-ab 160k -ar 48000 -f h264 -

> 文件方式：

> ffmpeg -y -i INPUT_FILE -r 30000/1001 -b 2M -bt 4M -vcodec libx264 -vpre hq -threads 0 -async 1 -acodec libfaac -ac 2 
-ab 160k -ar 48000 -f ipod OUTPUT_FILE.m4v
