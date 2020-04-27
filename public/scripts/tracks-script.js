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
                url: 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=track',
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function(data) {
                   
                   $("#main-track-img").attr("src", data.tracks.items[0].album.images[0].url);
                   var trackImg = data.tracks.items[0].album.images[0].url;
                    $("#track-name").text(data.tracks.items[0].name);
                    var trackName = data.tracks.items[0].name;
                    var artistNames = data.tracks.items[0].artists[0].name;
                    $("#track-artist").text(artistNames);
                    $("#track-album").text(data.tracks.items[0].album.name);
                    createRecent(trackName, trackImg);
                    
                    var trackID = data.tracks.items[0].id;
                    console.log(data);

                    $.ajax({
                        url: 'https://api.spotify.com/v1/recommendations?seed_tracks=' + trackID,
                        type: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + accessToken,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        success: function(data) {
                            for (var i = 1; i < 9; i++) {
                                $('#related-tracks-' + i).css("display", "block");
                            }

                            for (var i = 1; i < 9; i++) {
                                if (data.tracks[i-1]) {
                                    $('#related-tracks-img-' + i).attr("src", data.tracks[i-1].album.images[0].url);
                                    $('#related-track-name-' + i).text(data.tracks[i-1].name);
                                    $('#related-artist-name-' + i).text(data.tracks[i-1].artists[0].name);
                                    $('#related-album-name-' + i).text(data.tracks[i-1].album.name);
                                }
                                else {
                                    $('#related-tracks-' + i).css("display", "none");
                                }
                            }

                            console.log(data);
                        }
                     });
                }
            });
            
           
            
        }
    });
}

function createRecent(name, url) {
    var data = {};
    data.search = name;
    data.image = url;
    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: "http://localhost:3000/recent",
        success: function(data) {
            console.log("success");
            loadRecentSearches();
        }
    })
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