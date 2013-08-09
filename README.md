818.md
======

五个演示点：

    articles[0] = {
        title : "武林广场",
        description : "1",
        picUrl : "http://www.shipin7.com/static/images/b8c0144298a843bfa2e626bfd8eb799c/bea2ee9bac6acd692d1d9962d027620f/1_web.jpeg",
        url : "http://115.236.50.15:8080/Ehome/415095074&1&1&0&115.236.50.10&7990.m3u8"
    };
    articles[1] = {
        title : "我家鱼缸",
        description : "2",
        picUrl : "http://www.shipin7.com/static/images/b8c0144298a843bfa2e626bfd8eb799c/9816556e25703fac10e287d788e6c092/1_web.jpeg",
        url : "http://115.236.50.15:8080/Ehome/418359619&1&1&0&115.236.50.10&7990.m3u8"
    };
    articles[2] = {
        title : "可迪超市",
        description : "3",
        picUrl : "http://www.shipin7.com/static/images/b8c0144298a843bfa2e626bfd8eb799c/bc1eed135f9d0e7cb91d437d7336fe9f/1_web.jpeg",
        url : "http://115.236.50.15:8080/Ehome/416121732&1&1&0&115.236.50.10&7990.m3u8"
    };
    articles[3] = {
        title : "广州海康",
        description : "",
        picUrl : "http://www.shipin7.com/static/images/b8c0144298a843bfa2e626bfd8eb799c/8ee83abdc80c58e295044970895b8595/1_web.jpeg",
        url : "http://115.236.50.15:8080/Ehome/416693234&1&1&0&115.236.50.10&8990.m3u8"
    };
    
    


浏览器支持的html5不支持流格式、也就是说，将使用ffmpeg编码并存放在硬盘上的文件，通过http传递给浏览器，浏览器可以正常播放。
但是使用ffmpeg以流的格式实时转换的视频流，浏览器就无法识别。两种方式对于ffmpeg使用的参数有一点不同，使用的参数分别如下：

> 流方式：

> ffmpeg -y -i INPUT_FILE -r 30000/1001 -b 2M -bt 4M -vcodec libx264 -vpre hq -threads 0 -async 1 -acodec libfaac -ac 2 
-ab 160k -ar 48000 -f h264 -

> 文件方式：

> ffmpeg -y -i INPUT_FILE -r 30000/1001 -b 2M -bt 4M -vcodec libx264 -vpre hq -threads 0 -async 1 -acodec libfaac -ac 2 
-ab 160k -ar 48000 -f ipod OUTPUT_FILE.m4v


### ffmpeg在树莓派中的安装

* 1. <code>git clone git://source.ffmpeg.org/ffmpeg.git ffmpeg</code>
* 2. <code>cd ffmpeg</code>
* 3. <code>.configure</code> Type './configure' to create the configuration. A list of configure options is printed 
by running '<code>configure --help</code>'. 'configure' can be launched from a directory different from the FFmpeg sources to 
build the objects out of tree. To do this, use an absolute path when launching 'configure', e.g. 
'<code>/ffmpegdir/ffmpeg/configure</code>'.
* 4. <code>make</code> Then type '<code>make</code>' to build FFmpeg. GNU Make 3.81 or later is required.
* 5. <code>make install</code> Type '<code>make install</code>' to install all binaries and libraries you built.

### sox在Mac操作系统下的安装

* 1. 下载sox Mac OS X binaries（http://sourceforge.net/projects/sox/files/sox/）
* 2. 设置环境变量 ~/.bash_profile （一般在这个文件中添加用户级环境变量）
* 3. 在末尾添加export PATH=/opt/local/bin:/opt/local/sbin:$PATH

### ffmpeg命令
> ffmpeg -v verbose -f vfwcap  -s 320x240 -r 25 -i 0 -c:v libx264 -crf 18 -profile:v baseline -maxrate 50k -bufsize 35k 
-pix_fmt yuv420p  -flags -global_header -hls_time 3 -hls_list_size 3 -hls_wrap 2 -start_number 0 out.m3u8


