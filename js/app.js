/*
- Profile "version-(2.0.0)"
- File : ./js/app.js
*/

$(document).ready(function () {

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
                    time: "since 2019",
                    institute: "Goverment Model High School [CBSE]",
                    location: "Vikas Nagar, Chandigarh"
                }

            ].forEach(data => {
                
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

        $.getJSON("data.json", (response) => {

            let repos_list = response // ["indardanus", "entitycode", "games", "mydata", "gupt", "livechat"]
            
            // repos_list = response.filter((repos) => repos_list.includes(repos.name.toLowerCase()))
            
            $.each(repos_list, function (index, element) {
                
                let repos = $(`<a href="${element.html_url}" title="Click For OPEN" data-id="${element.id}">`).addClass('repos').append(`
                    <div>
                        <h4> ${element.name} </h4> 
                        <p> ${element.description} </p>
                        <span class="bi bi-github"></span>
                    </div>`)
                    
                $("#repositories").append(repos)
            })
        })
    }

    /* 
        ----------------------------------------------------------------------
        | function request server to load the account data and store locally |
        ----------------------------------------------------------------------
    */

    let location = "https://mayankdevil.github.io/myData/public/api/admin.json";

    let account = null;

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
            url: location,
            type: 'GET',

            beforeSend: function () {
                $("#experience #work")
                    .append(`<div class="loader"> loading data ... </div>`)
            },

            success: function (response) {

                const admin = response.admin.find(a => a.username === 'Mayank')

                $.getJSON(admin.data, function (repoData) {

                    account = {
                        resume: admin.resume,
                        experience: admin.experience,
                        data: repoData
                    }

                    localStorage.setItem('activeAccount', JSON.stringify(account))

                    experienceSection(account.experience)
                    repositoriesSection(account.data)
                    $("#cv_btn").attr("href", account.resume)

                }).fail(error => 
                    console.error(error)).done(() => 
                        console.log('~ data loaded'))

            },

            error: (error) => {

                if (!navigator.onLine) {
                    console.log("( network offline )")
                }

                console.log(`[ data loading error ] : ${error}`)
            },

            complete: function () {
                $("#experience #work .loader").hide()
            }
        })
    }
    document.title = `Mayank`;
})

// developer Mayank | ( https://github.com/MayankDevil/ )