function __aa() {

        
    let h = document.querySelector("a[id]").style.bottom;

    document.querySelectorAll(`[style="height: ${h};"]`)[1].nextElementSibling.querySelectorAll("div")[parseInt(1 + Math.random() * 20)].click()

}

 
 // document.write(window.visualViewport.height);

if (window.visualViewport.height == 60) {

    setTimeout(() => {
        __aa();
    }, (6 + parseInt(Math.random() * 5)) * 1000);

} else {
    setTimeout(() => {
        __aa();
    }, (20 + parseInt(Math.random() * 20)) * 1000);
}