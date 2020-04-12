var mainSearch = document.getElementById("home-search-input");

if(mainSearch) {
    mainSearch.addEventListener("keyup", function(e){
        if(e.keyCode === 13) {
            let searchInput = mainSearch.value;
            alert(searchInput);
        }
    });
}

var search = document.getElementById("search-box");

if(search) {
    search.addEventListener("keyup", function(e){
        if(e.keyCode === 13) {
            let searchInput = search.value;
            alert(searchInput);
        }
    });
}