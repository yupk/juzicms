(
    function() {


        Array.prototype.forEach.call(document.querySelectorAll('.vitem'), function(el) {
            el.addEventListener('click', () => {

                let video = el.getAttribute("data-source");

                // if (video.indexOf("ixigua.com") > -1) {
                    el.href = "/link.html?"+encodeURIComponent(video.replace("ixigua.com//", "ixigua.com/"));
                    el.target = "_blank";
                    // el.open();
                    return;
                // }


                // (new openWindow()).iframe(video).show();

                // document.querySelector("#webv").src = el.getAttribute("data-source");
                // document.querySelector(".wbx").style.display="block";
            });
        });


    }
)()