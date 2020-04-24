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
                    artistNames = artistNames + " feat. " + data.tracks.items[0].artists[1].name;
                    for (var i = 2; i < data.tracks.items[0].artists.length; i++) {
                        artistNames = artistNames + ", " + data.tracks.items[0].artists[i].name;
                    }
                    $("#track-artist").text(artistNames);
                    $("#track-album").text(data.tracks.items[0].album.name);
                    console.log(data);
                }
            });
            
         
            
        }
    });
}