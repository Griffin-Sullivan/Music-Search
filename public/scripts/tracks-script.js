
var accessToken = "";


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
                    $("#track-name").text(data.tracks.items[0].name);
                    var artistNames = data.tracks.items[0].artists[0].name;
                    // if (data.tracks.items[0].artists[1].name) {
                    //     artistNames = artistNames + " feat. " + data.tracks.items[0].artists[1].name;
                    // }
                    // for (var i = 2; i < data.tracks.items[0].artists.length; i++) {
                    //     artistNames = artistNames + ", " + data.tracks.items[0].artists[i].name;
                    // }
                    $("#track-artist").text(artistNames);
                    $("#track-album").text(data.tracks.items[0].album.name);
                    
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