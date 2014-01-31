function loadPosts(){
    
    $.ajax({
      url: "/api/retrieveTweets/abcd",
      type: "GET",
      data: {
        page: 1
      }, 
        success: function(response) {
        
            var template = window.JST["test"];
            
            $(".list").append(template(response));
            listHover(response);
            findLocation(response);
            sortTweetCount(response);
        }
       
    });
}


loadPosts();





function listHover (el){
    var template = window.JST["tweetCount"];
    $('.popUp').hide();
    $(".bubble").hover(function(){
        
        var bubbleTop = $(this).offset().top + 50;
        var bubbleIndex = $(this).index();
                $('.popUp').show();
                $('.popUp').append(template({status: el.statuses[bubbleIndex]}));
                $('.popUp').css("top",bubbleTop);
            
        }, function(){
            $('.popUp').empty();
            $('.popUp').hide();
            
        }
    );
}


function findLocation(allTweets){
    var locationCount = {};
    
    for(var i = 0; i < allTweets.statuses.length; i++ ){
        var location = allTweets.statuses[i].user.location;
        if(locationCount.hasOwnProperty(location)){
            locationCount[location] += 1;
        } else{
            locationCount[location] = 1;
        }
    }
    
}


$(document).ajaxComplete(function(){
    
    createList();
});

// $(document).on("click", ".bubble", function(){
// 	$(this).hide();
// })

function checkScroll(){
    var docPosition = $(document).scrollTop();
    if(docPosition + 1000 > $(document).height()){
        
        loadPosts();
    }

}

$(document).scroll(function(){
    checkScroll();
})

//need to make this not affect order of other status_count
function sortTweetCount(response){

var sortedTweets = response.statuses.sort(function(a, b){
    return b.user.statuses_count - a.user.statuses_count;
    });
    var topThree = sortedTweets.slice(0, 3);
    
    for(var i = 0; i < 3; i++){
        $('.leftPanel').append("<h2>" + topThree[i].user.screen_name + ": " + topThree[i].user.statuses_count + "</h2>");
    }
}




var options = {
    valueNames: ['retweet', 'name', 'text', 'tweetCount', 'followers']
};


function createList () {
    var tweetList = new List('tweet-list', options);

}