const _loaded_css = {}

const __calls = [];
const $ = function(fn) {

    __calls.push(fn);

}

document.onreadystatechange = function() {
    if (document.readyState == "complete") {

        for (var i = __calls.length - 1; i >= 0; i--) {
            __calls[i]();
        }

    }
}

const loadcss = function(u) {

    if (u in _loaded_css) {
        return;
    }
    let link = document.createElement("link");
    link.setAttribute("href", u);
    link.setAttribute("rel", "stylesheet");
    document.head.appendChild(link);

    _loaded_css[u] = 1;
}


const C = function(tag) {
    return document.createElement(tag);
}
const openWindow = function() {
    loadcss("/static/css/c.css");
    let box = C("div");
    box.setAttribute("class", "layoutBox");
    let closeBtn = C("div");
    closeBtn.setAttribute("class", "close");
    let _btn = C("div");
    _btn.setAttribute("class", "closeIcon");
    closeBtn.appendChild(_btn);
    box.style.display = "none";
    box.appendChild(closeBtn);

    this.hide = () => {
        box.style.display = "none";
        return this;
    }

    this.show = (ts) => {

        setTimeout(() => {
            box.style.display = "block";
        }, ts);
        return this;

    }

    this.remove = () => {
        document.body.removeChild(box);
        return this;
    }

    this.iframe = (src) => {
        let ifr = C("iframe");
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("scrolling", "auto");
        ifr.setAttribute("height", "100%");
        ifr.setAttribute("width", "100%");
        ifr.setAttribute("sandbox", "allow-same-origin allow-scripts allow-top-navigation allow-forms");

        ifr.src = src;
        box.appendChild(ifr);
        return this;

    }

    this.html = (strs) => {
        let div = C("div");
        div.setAttribute("class", "w-content");
        div.innerHTML = strs;
        box.appendChild(div);
        return this;
    }

    closeBtn.addEventListener("click", this.remove);
    document.body.appendChild(box);
}


$(function() {
    if (document.querySelector(".look_more")) {


        document.querySelector(".look_more").addEventListener("click", function() {
            document.querySelector(".body").classList.remove("maxbox");
            document.querySelector(".look_more").style.display = "none";

        });
    }
});