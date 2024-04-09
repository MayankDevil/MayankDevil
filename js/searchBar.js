/*
-   website-14 ""
-   Designed | Developed by Mayank
-   All Right Reserved Mayank ( https://github.com/MayankDevil/ )
-   JavaScript : ./js/searchBar.js
*/
try
{
    /* Target AND Variable */

    let searchBar = document.querySelector(' #search #bar ')

    let folder = document.getElementsByClassName('folder')

    /*
        -------------------------------------------------------------------------
        | on key up if folder deatail includes search value than display folder |
        -------------------------------------------------------------------------
    */

    searchBar.onkeyup = () => {

        for (let i = 0; i < folder.length; i++)
        
            (folder[i].lastElementChild.firstElementChild.innerText.toLowerCase().includes(searchBar.value.toLowerCase()))? folder[i].style.display = 'block' : folder[i].style.display = 'none'
    }
    
    document.title = `MayankDevil`
}
catch(error)
{
    window.console.error(`${error}`)
}
// The End ----------