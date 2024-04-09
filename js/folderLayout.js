/*
-   website-14 ""
-   Designed | Developed by Mayank
-   All Right Reserved Mayank ( https://github.com/MayankDevil/ )
-   JavaScript : ./js/folderLayout.js
*/
try
{
    /*
        ------------------------------------------------------------
        | folder structure function arguments data & return layout |
        ------------------------------------------------------------
    */

    function folderStructure(data)
    {
        return (`
            <!-- folder -->
            <div class="folder">

                <a href="./data/design/${data.look}" target="_self" class="look">

                    <img src="./data/design/${data.look}" alt="" class="image">

                </a>
            
                <div class="detail">

                    <h4> ${data.name} </h4>

                    <p> ${data.description} </p>

                    <div> <b>Status :</b> ${data.status} </div>

                    <div> <b>TechStack  :</b> ( ${data.techstack.join(' | ').toString()} )</div>

                    <div> <b>Responsive :</b> ${data.responsive} </div>

                    <div> <b>URL :</b> <a href="${data.url}" target="_blank" class="url">${data.url}</a> </div>

                </div>

            </div>
        `)
    }

    /* Target AND Variable */

    let repositories = document.getElementById('repositories')

    /*
        ------------------------------------------------------------------------------
        } for each element if access than insert adjacent HTML beforeend repositories 
        ------------------------------------------------------------------------------
    */ 
    
    kaarya_data.forEach((element) => {
        
        if (element.access)
            repositories.insertAdjacentHTML("beforeend",folderStructure(element).toString())
    })
    
    document.title = `MayankDevil`
}
catch(error)
{
    window.console.error(`${error}`)
}
// The End ----------