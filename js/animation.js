/*
-   website-14 ""
-   Designed | Developed by Mayank
-   All Right Reserved Mayank ( https://github.com/MayankDevil/ )
-   JavaScript : ./js/animation.js
*/

$(document).ready(function () {

    /* this animation is developed by chatgpt help */

    function createBubble() {

        /* set random value */
        
        let size = Math.random() * 20 + 10;
        let left = Math.random() * $(window).width()

        let randomColor = randomData(hexdecimal_set)

        /* create bubble or set style */

        let $bubble = $("<div></div>").css({

            position: "absolute",
            bottom: "0px",
            left: left + "px",
            width: size + "px",
            height: size + "px",
            background: randomColor,
            opacity: 0.7,
            "border-radius": "50%",
            "z-index": "-1"
        })

        $("#bubble_animation_container").append($bubble)

        /* animate bubble going up and fading out and remove bubble element at end */
        
        $bubble.animate({

            bottom: "1000px",
            opacity: 0
            
        }, 10000, "linear", function () {
            
            $(this).remove()
        })
    }

    function randomData(data) {

        return data[Math.floor(Math.random() * data.length)]
    }

    let hexdecimal_set = ["#ffe5d0", "#fecba1", "#feb272", "#fd9843", "#fd7e14"]

    /* create anaimtion container and append on body */

    $("body").append('<div id="bubble_animation_container"></div>');

    // Set styles for background using jQuery

    $("#bubble_animation_container").css({
        position: "fixed",
        width: "100%",
        height: "100vh",
        top: "0",
        left: "0",
        overflow: "hidden",
        "z-index": "-1"
    });

    /* generate bubbles every 300ms */

    setInterval(createBubble, 300);
});

// The End ----------