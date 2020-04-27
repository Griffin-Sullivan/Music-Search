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
                url: 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=album',
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function(data) {
                   
                    $("#main-album-pic").attr("src", data.albums.items[0].images[0].url);
                    var albumImg = data.albums.items[0].images[0].url;
                    $("#album-name").text(data.albums.items[0].name);
                    var albumName = data.albums.items[0].name;
                    $("#album-artist").text(data.albums.items[0].artists[0].name);
                    $("#album-year").text(data.albums.items[0].release_date);
                    console.log(data);
                    createRecent(albumName, albumImg);
                    var artistID = data.albums.items[0].artists[0].id;

                    $.ajax({
                        url: 'https://api.spotify.com/v1/recommendations?seed_artists=' + artistID + '&limit=50',
                        type: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + accessToken,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        success: function(data) {
                            var relatedAlbums = [];
                            var albumArtist = [];
                            var albumYear = [];
                            var albumArt = [];
                            var i = 0;

                            while(relatedAlbums.length < 6) {
                                if (!relatedAlbums.includes(data.tracks[i].album.name)){
                                    relatedAlbums.push(data.tracks[i].album.name);
                                    albumArtist.push(data.tracks[i].artists[0].name);
                                    albumYear.push(data.tracks[i].album.release_date);
                                    albumArt.push(data.tracks[i].album.images[0].url);
                                }
                                i++;

                            }
                            
                            console.log(albumYear);

                            for (var j = 1; j < 7; j++) {
                                $("#album-art-" + j).attr("src", albumArt[j-1]);
                                $("#album-name-" + j).text(relatedAlbums[j-1]);
                                $("#album-artist-" + j).text(albumArtist[j-1]);
                                $("#release-year-" + j).text(albumYear[j-1]);
                            }
                                
                            
                          
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