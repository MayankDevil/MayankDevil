/*
-   website-14 "PROFILE"
-   Designed | Developed by Mayank
-   All Right Reserved Mayank ( https://github.com/MayankDevil/ )
-   JavaScript : js/script
*/

$(document).ready(function () {

    /* variable target */
        
    let nav_item = $('#nav .link .item')
    
    let nav_link = $("#nav .link")
    
    let section = $("section")

    /*
        ---------------------------------------------------------------------
        | navLinkActive function : pass index to active section or nav link |
        ---------------------------------------------------------------------
    */

    function navLinkActive(index) {
        
        if (window.innerWidth > 768) 
        {
            section.hide()
            section.eq(index).show("slow")

            nav_item.hide()
            nav_item.eq(index).show("slow")
        }
    }
    navLinkActive(0);  // default nav_link active
                    
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
        --------------------------------
        [ experiencce Section function ] ---
        --------------------------------
    */

    function experienceSection (data) {
        
        if (data != null) {

            $("#experience #work").html(`<h2> work experience </h2>`)

            data.reverse().forEach(function (element) {
                
               $("#experience #work").append(`<div class="work">
                    <h4> ${element.company} <span class="pipe">|</span> <span class="time"> ${element.time} </span> </h4>
                    <a href="${element.website}" target="_blank" class="office_link"> ${element.website} </a>
                    <h5> ${element.position} </h5>
                    <p> ${element.description} </p>

                    <a href="${element.experience_letter}" title="download experience letter" download class="btn letter_btn"> <span class="bi bi-file-pdf"></span> ${element.company} letter </a>

                </div>`)
            })

            $("#experience #work").append(`<h2> education experience </h2>`)

            const EDUCATION_DATA = [
                    
                {
                    title: "(BCA) Bacholar of Computer Application",
                    time: "2021-2024",
                    institute: "Post Graduation Goverment College [PU]",
                    location: "Sector-11 Chandigarh"
                },
                {
                    title: "(IT) Information Technology",
                    time: "2019-2021",
                    institute: "Goverment Model Senior Secondary School [CBSE]",
                    location: "Sector-23A Chandigarh"
                },
                {
                    title: "Matrix",
                    time: "2021-2024",
                    institute: "Goverment Model High School [CBSE]",
                    location: "Vikas Nagar, Chandigarh"
                }

            ]
            
            EDUCATION_DATA.forEach(data => {
                
                $("#experience #work").append(`
                    <div class="work">
                        <h4> ${data.title} <span class="pipe">|</span> <span class="time"> ${data.time} </span> </h4>
                        <h5> ${data.institute} </h5>
                        <p> ${data.location} </p>
                    </div>
                `)
            })
        }
    }

    /*
        ---------------------------------
        [ repositories Section function ] ---
        ---------------------------------
    */

    function repositoriesSection (data) { 

        if (data != null) {

            data = data.filter((element) => {
                return element.isPrivate == false
            })

            $.each(data, function (index, element) {

                if (element.look != null) {
                    
                    $("#repositories").append(`<div class="folder">
                        
                        <a href="./data/design/${(element.url != null )? element.url : '#'}" target="_blank" class="look">
                            <img src="public/design/${element.look}" alt="" class="image">
                        </a>

                        <details>
                            <summary>   
                                <h4> ${element.name} </h4>
                                    
                                <h6> ${element.description} </h6>
                                
                            </summary>
                            <ul id="list">
                                <li> ${element.techStack.join(" | ")} </li>
                                <li> ${element.clone} </li>
                                <li> <a href="${element.url}" class="url"> ${element.url} </a> </li>
                            </ul>
                        </details>
                    </div>`)
                }
            })            
        }
        else {} 
    }

    /* unactive account request */

    function unActiveAccount (request) {

        if (request == 'PLEASE')
        {
            localStorage.removeItem('activeAccount')
            location.reload()
        } 
        else 
        {
            console.log('(unActive request denied)_')   
        }
    }

    /* 
        ----------------------------------------------------------------------
        | function request server to load the account data and store locally |
        ----------------------------------------------------------------------
    */

    let location = "https://mayankdevil.github.io/myData/public/api/admin.json";

    let account = null
    
    // localStorage.setItem('activeAccount',JSON.stringify(hijack)) // hack    

    if (localStorage.getItem('activeAccount')) 
    {
        account = JSON.parse(localStorage.getItem('activeAccount'))

        experienceSection(account.experience)

        repositoriesSection(account.data)

        $("#cv_btn").attr("href", account.resume)
    }
    else
    {
        $.ajax({
            url : location,
            type : 'GET',
            beforeSend : function () {

                $("#experience #work").append(`<div class="loader"> loading data ... </div>`)
            },
            success : function (response) {

                account = response.admin.find(admin => admin.username === 'Mayank')
                
                localStorage.setItem('activeAccount',JSON.stringify({
                    resume : account.resume,
                    experience : account.experience,
                    data : account.data
                }))

                account = JSON.parse(localStorage.getItem('activeAccount'))

                experienceSection(account.experience)

                repositoriesSection(account.data)

                $("#cv_btn").attr("href", account.resume)
            },
            error : (error) => {

                if (!navigator.onLine) 
                {
                    console.log(`( network offline )_`)
                }
                console.log(`[ data loading error ] : ${error}`)
            },
            complete : function () {

                $("#experience #work .loader").hide()
            }
        })
    }
    document.title = `Mayank`;
})

// The End ----------