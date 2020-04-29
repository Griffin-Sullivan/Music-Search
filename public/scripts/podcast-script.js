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
    loadRecentSearchesOnLoad();
});


var search = document.getElementById("search-box");

if(search) {
    search.addEventListener("keyup", function(e){
        if(e.keyCode === 13) {
            let searchInput = search.value;
            $.ajax({
                url: 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=show',
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function(data) {
                    console.log(data);
                    if (data.shows.items[0].images.length > 0) {
                        $("#podcast-img").attr("src", data.shows.items[0].images[0].url);
                    }
                    var podcastImg = data.shows.items[0].images[0].url;
                    $("#podcast-name").text("#1: " + data.shows.items[0].name);
                    var podcastName = data.shows.items[0].name;
                    $("#podcast-publisher").text(data.shows.items[0].publisher);
                    $("#podcast-description").text(data.shows.items[0].description);
                    createRecent(podcastName, podcastImg);

                    for (var i = 0; i < 9; i++) {
                        if (data.shows.items[i+1]) {
                            if (data.shows.items[i+1].images[0].url) {
                                $("#podcast-img-" + i).attr("src", data.shows.items[i+1].images[0].url);
                            }
                            $("#related-artist-name-" + i).text(data.shows.items[i+1].name);
                            $("#casters-" + i).text(data.shows.items[i+1].publisher);
                        }
                    }
                }
            });
            
         
            
        }
    });
}
function createRecent(name, picture) {
    $.ajax({
        url: "http://localhost:3000/recent",
        type: "GET",
        success: function(data) {
            var isRepeat = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].search === name && data[i].image === picture) {
                    isRepeat = true;
                    console.log(isRepeat);
                }
            }

            if (!isRepeat) {
                console.log("false");
                var data = {};
                data.search = name;
                data.image = picture;
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: "http://localhost:3000/recent",
                    success: function(data) {
                        console.log("success");
                        loadRecentSearches();
                    }
                });
            }
        }
    });
    
}

function loadRecentSearches() {
    $.ajax({
        url: "http://localhost:3000/recent",
        type: "GET",
        success: function(data) {
            console.log(data);
            let totalLength = data.length - 2;
            
            if (data[totalLength]){
                $("#recent-img-1").attr("src", data[totalLength].image);
                $("#recent-search-1").text(data[totalLength].search); 
      
            }
            if (data[totalLength - 1]){
                $("#recent-img-2").attr("src", data[totalLength - 1].image);
                $("#recent-search-2").text(data[totalLength - 1].search); 
            }
            if (data[totalLength - 2]){
                $("#recent-img-3").attr("src", data[totalLength - 2].image);
                $("#recent-search-3").text(data[totalLength - 2].search); 
        
            }
            
            
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

function loadRecentSearchesOnLoad() {
    $.ajax({
        url: "http://localhost:3000/recent",
        type: "GET",
        success: function(data) {
            console.log(data);
            let totalLength = data.length - 1;
            
            if (data[totalLength]){
                $("#recent-img-1").attr("src", data[totalLength].image);
                $("#recent-search-1").text(data[totalLength].search); 
      
            }
            if (data[totalLength - 1]){
                $("#recent-img-2").attr("src", data[totalLength - 1].image);
                $("#recent-search-2").text(data[totalLength - 1].search); 
            }
            if (data[totalLength - 2]){
                $("#recent-img-3").attr("src", data[totalLength - 2].image);
                $("#recent-search-3").text(data[totalLength - 2].search); 
        
            }
            
            
        }
    });
}