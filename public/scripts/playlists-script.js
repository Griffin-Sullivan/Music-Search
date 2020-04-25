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
                            // for (var i = 7; i < data.tracks.items.length; i++) {
                            //     var htmlBlock= '<div class="related-playlists" id="album-'+i+'">' +
                            //     '<table>' +
                            //     '<tr>' + 
                            //     '<td><img src="../images/placeholder.jpg" class="related-album-img" id="track-img-'+i+'"></td>' +
                            //     '<td> <ul>' +
                            //     '<li><h2 class="playlists-color" id="track-name-'+i+'">playlist name</h2></li>' +
                            //     '<li><h3 class="artist-lable" id="artist-name-'+i+'">playlist creator</li>' +
                            //     '<li><h4 id="release-year-'+i+'">year</h3></li>' +
                            //     '</td></tr></table><hr height="3px" width="95%"></div>';
                                // var container = document.getElementsByClassName('.related-playlists-container')
                                // container.write(htmlBlock);
                            //     $("#album-" + i-1).after(htmlBlock);
                            // }

                            console.log(data);

                        }
                    });
                }
            });
            
         
            
        }
    });
}