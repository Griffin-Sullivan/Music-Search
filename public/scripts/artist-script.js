var accessToken;

$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3000/access_token',
        contentType: "application/json",
        accepts: "application/json"
    }).done(function(data) {
            console.log(data);
            accessToken = data.access_token;
            runMainSearch();
            });

    loadRecentSearchesOnLoad();
    
});




var search = document.getElementById("search-box");
search.value = localStorage.getItem('value');

function runMainSearch() {
    if (search.value === localStorage.getItem('value')) {
        localStorage.clear();
        console.log(search.value);
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
                var homeArtistImg = data.artists.items[0].images[0].url;
                $("#artist-name").text(data.artists.items[0].name);
                var homeArtistName = data.artists.items[0].name;
                $("#artist-followers").text("Followers: " + formatNumber(data.artists.items[0].followers.total));
                $("#artist-genre").text("Genre: " + data.artists.items[0].genres[0]);
                createRecent(homeArtistName, homeArtistImg);
                var artistID = data.artists.items[0].id;

                console.log(data);
                        

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
                        for (var i = 1; i < 9; i++) {
                            if (data.artists[i-1]) {
                                $('#related-image-' + i).attr("src", data.artists[i-1].images[0].url);
                                $('#related-artist-name-' + i).text(data.artists[i-1].name);
                                $('#related-followers-' + i).text("Followers: " + formatNumber(data.artists[i-1].followers.total));
                            }
                        }
                        
                    }
                });
            }
        });

    }

}

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
                   var artistImage = data.artists.items[0].images[0].url;
                    $("#artist-name").text(data.artists.items[0].name);
                    var artistName = data.artists.items[0].name;
                    $("#artist-followers").text("Followers: " + formatNumber(data.artists.items[0].followers.total));
                    $("#artist-genre").text("Genre: " + data.artists.items[0].genres[0]);
                    createRecent(artistName, artistImage);

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
                            
                            for (var i = 1; i < 9; i++) {
                                if (data.artists[i-1]) {
                                    $('#related-image-' + i).attr("src", data.artists[i-1].images[0].url);
                                    $('#related-artist-name-' + i).text(data.artists[i-1].name);
                                    $('#related-followers-' + i).text("Followers: " + formatNumber(data.artists[i-1].followers.total));
                                }
                            }
                            
                        }
                    });
                }
            });
            
            
         
            
        }
    });
}

function createRecent(name, picture) {
    $.ajax({
        url: "http://localhost:3000/recent",
        type: "GET",
        success: function(data) {
            var isRepeat = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].search === name && data[i].image === picture) {
                    isRepeat = true;
                    console.log(isRepeat);
                }
            }

            if (!isRepeat) {
                console.log("false");
                var data = {};
                data.search = name;
                data.image = picture;
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: "http://localhost:3000/recent",
                    success: function(data) {
                        console.log("success");
                        loadRecentSearches();
                    }
                });
            }
        }
    });
    
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


function deleteRecentSearch(id) {
    $.ajax({
        url: "http://localhost:3000/recent/" + id,
        type: "DELETE",
        success: function(data) {
            console.log("successfully deleted " + id);
        }
    });
}