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
                }
            });
            
         
            
        }
    });
}