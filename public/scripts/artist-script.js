var accessToken = "";


var search = document.getElementById("search-box");

if(search) {
    search.addEventListener("keyup", function(e){
        if(e.keyCode === 13) {
            let searchInput = search.value;
            function formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
              }
            $.ajax({
                url: 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function(data) {
                   
                   $("#main-artist-img").attr("src", data.artists.items[0].images[0].url);
                    $("#artist-name").text(data.artists.items[0].name);
                    $("#artist-followers").text("Followers: " + formatNumber(data.artists.items[0].followers.total));
                    $("#artist-genre").text("Genre: " + data.artists.items[0].genres[0]);
                    console.log(data);
                }
            });
            
         
            
        }
    });
}