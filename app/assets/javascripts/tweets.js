/*
function loadPosts(currentPage){ //pass in page to loadPosts arg- currentPage
    
    $.ajax({
      url: "/api/retrieveTweets/abcd",
      type: "GET",
      data: {
        page: currentPage
      }, 
        success: function(response) {
        
            var template = window.JST["test"];

            $(".list").append(template(response));
            listHover(response);
            // findLocation(response);
            // sortTweetCount(response);
            lightBox();
        }
       
    });
}

//global object for global variables
var twitterClient = {
    currentPage: 1,

}



function paginate(){

    loadPosts(twitterClient.currentPage);
    twitterClient.currentPage += 1;
   
}

paginate();

function listHover (el){
    var template = window.JST["tweetCount"],
        bubbleTop,
        bubbleIndex;

    $('.popUp').hide();
    $('.bubble').hover(function(){
        
        bubbleTop = $(this).offset().top + 50;
        bubbleIndex = $(this).index();

                $('.popUp').show();
                $('.popUp').append(template({status: el.statuses[bubbleIndex]}));
                $('.popUp').css("top",bubbleTop);
            
        }, function(){
            $('.popUp').empty();
            $('.popUp').hide();
            
        }
    );
}


// generates an object with location and number of times it has existed

function findLocation(allTweets){
    var locationCount = {},
        location;
    
    for(var i = 0; i < allTweets.statuses.length; i++ ){
        location = allTweets.statuses[i].user.location;
        if(locationCount.hasOwnProperty(location)){
            locationCount[location] += 1;
        } else{
            locationCount[location] = 1;
        }
    }
    
}






function checkScroll(){
    var docPosition = $(document).scrollTop();
    if(docPosition + 1000 > $(document).height()){
        //this is too fast...
        paginate();
    }

}

$(document).scroll(function(){
    checkScroll();
})

//need to make this not affect order of other status_count
function sortTweetCount(response){
    var sortedTweets,
        topThree;

    $('.leftPanel').empty();

    sortedTweets = response.statuses.sort(function(a, b){
    return b.user.statuses_count - a.user.statuses_count;
    });

    topThree = sortedTweets.slice(0, 3);
    $('.leftPanel').append("<h1>Top 3 Tweeters</h1>")
    for(var i = 0; i < 3; i++){
        $('.leftPanel').append("<h2>" + topThree[i].user.screen_name + ": " + topThree[i].user.statuses_count + "</h2>");
    }
}



// Begin list.js integration

var options = {
    valueNames: ['retweet', 'name', 'text', 'tweetCount', 'followers']
};


function createList () {
    var tweetList = new List('tweet-list', options);
    
    //tweetList.items[i]
}

$(document).ajaxComplete(function(){
    
    createList();
    
});

// End list.js integration




$(document).on("click", ".form-button", function(){
    
    var tweetMessage,
        twitterUserName;

    tweetMessage = $('.form-input').val(); 
    twitterUserName = $('.form-username').val();
    
    postTweet(twitterUserName, tweetMessage);
});


function postTweet(twitterUserName, tweetMessage) {
  $.ajax({
    type: "post",
    url:"/api/posttweet",
    data: {
      username: twitterUserName,
      message: tweetMessage 
    },
    success: function(response){
      debugger
      $('.successMessage').show();
    }, 
    error: function(xhr, status, error){
        debugger
       var errorObject = JSON.parse(xhr.responseText);
       $('.errorMessage').show();
       $('.errorMessage').append("<h1>" + errorObject.error + "</h1>");
    }
  })

}

//handle error and success message view
$(document).on("click", function(){
    $('.errorMessage').hide();
    $('.errorMessage').empty();
    $('.successMessage').hide();
});

function lightBox(){
    $(".lightBox").show();
}





//new

$(document).scroll(function(){
    checkScroll();
});

function checkScroll(){
    var docPosition = $(document).scrollTop();
    if(docPosition + 1000 > $(document).height()){
        //this is too fast...
        paginate();
    }

}


function paginate(){
debugger
    tweets.fetch({data: {page: twitterClient.currentPage }});
    twitterClient.currentPage += 1;
   
}

*/


// var TweetsView = Backbone.View.extend({
//     render: function(){
//         debugger
//         this.collection.forEach(this.addOne, this);
//     },

//     addOne: function(tweetView){

//         var tweetView = new TweetView({model: tweet});
//         this.$el.append(tweetView.render().el);
//     }

// });





















//paginate, sort, listhover, post

// $(document).ready(function(){
    
//     var tweets = new Tweets();
//     window.tweet = new Tweet();
//     var tweetPost = new TweetPost();
//     var tweetsView = new TweetsView({collection: tweets});
//     var tweetPostView = new TweetPostView({model: tweetPost});
//     var sidebarView = new SidebarView({collection: tweets});

//     tweetPost.on("invalid", function(model, error){
//         debugger
//     });
//     // $('form').submit(function(event){
//     // event.preventDefault();
// // });
    
// });

//implement devise. and want to log in and log out with backbone. 
