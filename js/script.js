
/*
- Profile "version-(2.0.0)"
- File : ./js/script.js
*/

$(document).ready(function () {

    /* Target variable */
        
    let nav_item = $('#nav .link .item')
    
    let nav_link = $("#nav .link")
    
    let section = $("section")

    /*
        ---------------------------------------------------------------------
        | navLinkActive function : pass index to active section or nav link |
        ---------------------------------------------------------------------
    */
    function navLinkActive(index) {
        
        if (window.innerWidth > 768) {

            section.hide()
            section.eq(index).show("slow")

            nav_item.hide()
            nav_item.eq(index).show("slow")
        }
    }
    navLinkActive(1);  // default nav_link active
                    
    /*
        -----------------------------------------------------------------
        | for each nav link on click this element index nav link active |
        -----------------------------------------------------------------
    */ 
    nav_link.each(function (index) {

        $(this).on({

            "click" : () => {

                if (window.innerWidth > 768) 
                {
                    navLinkActive(index)
                } 
                else 
                {
                    $("html, body").animate({
                        scrollTop: section.eq(index).offset().top
                    }, 600)
                    
                    nav_item.hide();
                    nav_item.eq(index).show();
                }
            },
            "mouseover" : () => {

                nav_link.eq(index).css({
                    "box-shadow" : "0 0 5px 0 var(--gray)"
                })
            },
            "mouseout" : () => {

                nav_link.eq(index).css({
                    "box-shadow" : "none"
                })
            },
        })
    })

    /*
        ----------------------------------
        [ window resize show all section ]
        ----------------------------------
    */
    $(window).on("resize", function () {
        
        if (window.innerWidth <= 768) 
        {
            section.show()
        }
    })

    /*
        -----------------------------------------------
        [ next button on click bond 1 nav link active ]
        -----------------------------------------------
    */
    $("#next_btn").click(() => {
        
        if (window.innerWidth > 768)
        {
            navLinkActive(1)
        }    
    })

    /*
        -------------------------------------------------------------------------
        | on key up if folder deatail includes search value than display folder |
        -------------------------------------------------------------------------
    */   
    try
    {
        let searchBar = document.querySelector(' #search #bar ')

        let folder = document.getElementsByClassName('repos')

        searchBar.addEventListener("keyup" ,function () {

            for (let i = 0; i < folder.length; i++)
            {
                if (folder[i].lastChild.firstElementChild.innerText.toLowerCase().includes(searchBar.value.toLowerCase()))
                {
                    folder[i].style.display = 'block'
                }
                else
                {
                    folder[i].style.display = 'none'

                }
            }           
        })
    }
    catch(error)
    {
        window.console.error(`${error}`)
    }
})

// developer Mayank | ( https://github.com/MayankDevil/ )