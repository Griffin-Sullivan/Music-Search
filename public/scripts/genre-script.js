var accessToken = "";


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
                    $("#search-genre-img").attr("src", data.artists.items[0].images[0].url);
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