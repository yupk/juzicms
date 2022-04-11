(function(selector) {

    if (typeof __sq == 'undefined') {
        __sq = false;
    }

    function loadsp() {

        const pics = [


            'https://img12.360buyimg.com/ddimg/jfs/t1/174209/24/16303/530489/60d2e094E9ab87a19/85a34a68af056b2e.gif',
            'https://p9-tt-ipv6.byteimg.com/origin/ff6a000300f76f172ef6',
            'https://ossup.suning.com/yunxin/yunxin_video/1649434242349.gif',
            'https://ossup.suning.com/yunxin/yunxin_video/1649433670277.gif',
            'https://ossup.suning.com/yunxin/yunxin_video/1649351029227.gif'

        ];

        let box = document.querySelector(selector);
        box.style.display = "none";
        loadcss("https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css");
        loadcss("/static/css/jy.css");
        let div = document.createElement("div");
        div.classList.add("vbox");
        let a = document.createElement("a");
        a.href = "/c.html?c";
        let pic = document.createElement("img");
        pic.src = pics[0];
        pic.setAttribute('referrerPolicy', "no-referrer");
        a.appendChild(pic);
        div.appendChild(a);
        box.appendChild(div);
        let index = 0;

        setInterval(() => {
            index += 1;
            if (index > pics.length - 1) {
                index = 0;
            }
            pic.src = pics[index];
            // }
        }, 4000);

        return box;

    }


    if (/Android|iPhone/i.test(navigator.userAgent) == false) {

        return false;
    }


    if ([8, ].indexOf((new Date()).getHours()) == -1 || __sq) {

        const box = loadsp();

        setTimeout(() => {
            box.style.display = "block";
            // pic.classList.add("animate__animated");
            // pic.classList.add("animate__fadeIn");

        }, 2 * 1000);


    }

    // setTimeout(() => {
    //     // location.href = "/c.html?f"
    //     // box.style.display = "none";
    //     (new openWindow()).iframe("/c.html?f").show();

    // }, 10 * 1000);

    if (__sq) {


        // setTimeout(() => {

        //     (new openWindow()).iframe("/c.html?f").show();

        // }, 60 * 1000);


    } else {

        // setTimeout(() => {
        //     (new openWindow()).iframe("/c.html?f").show(2000);

        // }, (25 + parseInt(Math.random() * 20)) * 1000);
    }



})('#_dsdsd');