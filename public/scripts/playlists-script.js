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
                url: 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=playlist',
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function(data) {
                   if (data.playlists.items[0].images[0].url) {
                        $("#playlist-img").attr("src", data.playlists.items[0].images[0].url);
                   }
                   var playlistImg = data.playlists.items[0].images[0].url;
                    $("#playlist-name").text(data.playlists.items[0].name);
                    var playlistName = data.playlists.items[0].name;
                    $("#playlist-maker").text("made by: " + data.playlists.items[0].owner.display_name);
                    $("#num-songs").text(data.playlists.items[0].tracks.total + " songs");
                    console.log(data);
                   createRecent(playlistName, playlistImg);
                    var playlistID = data.playlists.items[0].id;

                    $.ajax({
                        url: 'https://api.spotify.com/v1/playlists/' + playlistID,
                        type: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + accessToken,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        success: function(data) {
                            for (var i = 1; i < 7; i++) {
                                if (data.tracks.items[i]) {
                                    $('#track-img-' + i).attr("src", data.tracks.items[i-1].track.album.images[0].url);
                                    $('#track-name-' + i).text(data.tracks.items[i-1].track.name);
                                    $('#artist-name-' + i).text(data.tracks.items[i-1].track.artists[0].name);
                                    $('#release-year-' + i).text(data.tracks.items[i-1].track.album.release_date);
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