var accessToken;

$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3000/access_token',
        contentType: "application/json",
        accepts: "application/json"
    }).done(function(data) {
            console.log(data);
            accessToken = data.access_token;
            });

    clearSearches();
});

var mainSearch = document.getElementById("home-search-input");

if(mainSearch) {
    mainSearch.addEventListener("keyup", function(e){
        if(e.keyCode === 13) {
            searchValue = mainSearch.value;
            localStorage.setItem('value', searchValue);
            window.location.href = "pages/artists.html";

            
            
            
        }
    });
}

function deleteRecentSearch(id) {
    $.ajax({
        url: "http://localhost:3000/recent/" + id,
        type: "DELETE",
        success: function(data) {
            console.log("successfully deleted " + id);
        }
    });
}

function clearSearches() {
    $.ajax({
        url: "http://localhost:3000/recent",
        type: "GET",
        success: function(data) {
            console.log(data);
            
            for (let i = 0; i < data.length; i++){
                deleteRecentSearch(data[i]._id);
            }
        }
    });
}