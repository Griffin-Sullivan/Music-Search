var accessToken = "";


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
                    $("#playlist-name").text(data.playlists.items[0].name);
                    $("#playlist-maker").text("made by: " + data.playlists.items[0].owner.display_name);
                    $("#num-songs").text(data.playlists.items[0].tracks.total + " songs");
                    console.log(data);
                }
            });
            
         
            
        }
    });
}