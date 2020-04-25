var accessToken = "";


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
                    $("#album-name").text(data.albums.items[0].name);
                    $("#album-artist").text(data.albums.items[0].artists[0].name);
                    $("#album-year").text(data.albums.items[0].release_date);
                    console.log(data);

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