/*
-   website 14 : "PROFILE"
-   Profile CopyRight by Mayank
-   Designed : Mayank
-   Mayank All Right Reserved
-   JavaScript : js/script
*/
try
{
    /* variable target */

    let navitem = document.querySelectorAll('#nav .link .item')
    
    let navlink = document.querySelectorAll("#nav .link")
    
    let section = document.querySelectorAll("section")

    var n = 0;  // number active

    /*
        ----------------------------------------------------------------------
        | navlink active function : pass index to active section or nav link |
        ----------------------------------------------------------------------
    */

    function navlink_active(index)
    {
        for(let i = n; i < navlink.length; i++)
        {
            section[i].style.display = 'none'
            navitem[i].style.display = 'none'
        }
        section[index].style.display = 'block'
        navitem[index].style.display = 'inline-block'
    }
    navlink_active(n);  // default navlink active

    /*
        ----------------------------------------------------------------
        | for each nav link on click this element index navlink active |
        ----------------------------------------------------------------
    */ 

    navlink.forEach((element,index) => {

        element.onclick = () => {

            navlink_active(index)
        }
        element.onmouseover = () => {

            for(let i = n; i < navitem.length; i++)
            {
                navitem[i].style.display = 'none'
            }
            navitem[index].style.display = 'inline-block'

        }
        element.onmouseout = () => {

            for(let i = n; i < navitem.length; i++)
            {
                navitem[i].style.display = 'none'
            }
            navitem[index].style.display = 'inline-block'
        }
    })

    /*
        --------------------------------------------
        [ next button onlick bond 1 navlink active ]
        --------------------------------------------
    */ 
    
    document.getElementById("next_btn").onclick = () => {
        
        navlink_active(1)
    }
}
catch(error)
{
    window.console.error(alert(error));
}
// The End ----------