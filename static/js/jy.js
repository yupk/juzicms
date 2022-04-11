(function(selector) {

    const pics = [
        'https://wx3.sinaimg.cn/mw2000/72c61cacgy1gz9b8zmpinj20hs05kdg4.jpg',
        'https://wx1.sinaimg.cn/mw2000/72c61cacgy1gz9b8zsfpaj20hs05kaad.jpg',
        'https://wx1.sinaimg.cn/mw2000/72c61cacgy1gz9b8zwyqbj20hs05kaad.jpg'
    ];

    let box = document.querySelector(selector);
    box.style.display = "none";
    loadcss("https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css");
    loadcss("/static/css/jy.css");
    let div = document.createElement("div");
    div.classList.add("vbox");
    let a = document.createElement("a");
    a.href = "https://www.meetword.cn/html/114/index.html?from=3301985";
    let pic = document.createElement("img");
    
    pic.setAttribute('referrerPolicy', "no-referrer");

    pic.src = pics[0];
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



    setTimeout(() => {

        box.style.display = "block";
        pic.classList.add("animate__animated");
        pic.classList.add("animate__fadeIn");

    }, 1 * 1000);





})('#__jiaoyou');