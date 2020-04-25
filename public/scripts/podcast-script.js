var accessToken = "";


var search = document.getElementById("search-box");

if(search) {
    search.addEventListener("keyup", function(e){
        if(e.keyCode === 13) {
            let searchInput = search.value;
            $.ajax({
                url: 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=show',
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function(data) {
                   if (data.shows.items[0].images[0].url) {
                        $("#podcast-img").attr("src", data.shows.items[0].images[0].url);
                   }
                    $("#podcast-name").text("#1: " + data.shows.items[0].name);
                    $("#podcast-publisher").text(data.shows.items[0].publisher);
                    $("#podcast-description").text(data.shows.items[0].description);
                    console.log(data);

                    for (var i = 0; i < 8; i++) {
                        if (data.shows.items[i+1]) {
                            if (data.shows.items[i+1].images[0].url) {
                                $("#podcast-img-" + i).attr("src", data.shows.items[i+1].images[0].url);
                            }
                            $("#related-artist-name-" + i).text(data.shows.items[i+1].name);
                            $("#casters-" + i).text(data.shows.items[i+1].publisher);
                        }
                    }
                }
            });
            
         
            
        }
    });
}