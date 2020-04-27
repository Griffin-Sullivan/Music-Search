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
                url: 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function(data) {
                    $("#genre-name").text(data.artists.items[0].genres[0]);
                    var genreName = data.artists.items[0].genres[0];
                    $("#search-genre-img").attr("src", data.artists.items[0].images[0].url);
                    var genreImg = data.artists.items[0].images[0].url;
                    createRecent(genreName, genreImg);
                    console.log(data);
                    
                    var artistGenre = data.artists.items[0].genres[0];
                    var artistID = data.artists.items[0].id;

                    $.ajax({
                        url: 'https://api.spotify.com/v1/artists/' + artistID + '/related-artists',
                        type: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + accessToken,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        success: function(data) {
                            console.log(data);
                            var relatedGenre = [];
                            var genreArt = [];

                            var i = 0;

                            while(relatedGenre.length < 8) {
                                for (var y = 0; y < data.artists[i].genres.length; y++) {
                                    if ((!relatedGenre.includes(data.artists[i].genres[y])) && (data.artists[i].genres[y] !== artistGenre)){
                                        relatedGenre.push(data.artists[i].genres[y]);
                                        
                                        
                                    }
                                }
                                i++;
                            }

                            for(var x = 0; x < 8; x++)
                            {
                                genreArt.push(data.artists[x].images[0].url);
                            }

                            for (var j = 1; j < 9; j++) {
                                $("#related-genre-img-" + j).attr("src", genreArt[j-1]);
                                $("#related-artist-name-" + j).text(relatedGenre[j-1]);
                            }

                            console.log(relatedGenre);
                            console.log(genreArt);
                            
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