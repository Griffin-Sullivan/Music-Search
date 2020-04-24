var accessToken = "";

var mainSearch = document.getElementById("home-search-input");

if(mainSearch) {
    mainSearch.addEventListener("keyup", function(e){
        if(e.keyCode === 13) {
            window.location.href = "pages/artists.html";
            
        }
    });
}

