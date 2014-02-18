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

//global object for global variables
var twitterClient = {
    currentPage: 1,

}
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



var TweetsView = Backbone.View.extend({

    el: ".list", 

    initialize: function(){
        // this.render();
        var self = this;
         this.collection.on("reset sort", this.render, this);
        // this.collection.on('all', function(event){
        //     console.log(event);

            
        // });

        $(window).bind('scroll', function(){
            
            self.checkScroll();
            console.log("scrolling..");
        });
    },

    template: window.JST["tweetCount"],

    render: function(){
      
        for(var i = 0; i < this.collection.length; i++){
            var tweetView = new TweetView({
                 model: this.collection.at(i)
            });

            $('.list').append(tweetView.render().el); 
        }  
    },

    events: {
        "scroll div": "turnRed",
        "mouseover .bubble": "hoverSidebar"
    },

    turnRed: function(event){
        


        
        // $(event.currentTarget).css("color", "red");
        // twitterClient.currentPage += 1;
        // this.collection.fetch({data: {page: twitterClient.currentPage }});
    },

    hoverSidebar: function(event){
        
        var bubbleTop = $(event.currentTarget).offset().top + 50,
            bubbleIndex = $(event.currentTarget).index();
            
                $('.popUp').show();
                $('.popUp').html(this.template(this.collection.at(bubbleIndex).toJSON()));
                $('.popUp').css("top", bubbleTop);
    },

    checkScroll: function(){
        var docPosition = $(document).scrollTop();
        if(docPosition + 1000 > $(document).height()){
            //this is too fast...
            twitterClient.currentPage += 1;
            this.collection.fetch({data: {page: twitterClient.currentPage }});
        }
    }

});


var SidebarView = Backbone.View.extend({
    el: ".sideBar",

    events: {
        "click button.sort": "retweetSort"
    },

    retweetSort: function(){
         $(".list").html('');
        this.collection.sortByRetweets();
        this.collection.sort();
        debugger
    }

});






var TweetView = Backbone.View.extend({
    className: "bubble",

    template: window.JST["tweet"],

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    events: {
        "click": "bogusEvent"
    },

    bogusEvent: function(){
        debugger
    }


});





var Tweet = Backbone.Model.extend({

});



var Tweets = Backbone.Collection.extend({
    model: Tweet,


    url: "/api/retrieveTweets/abcd",

    initialize: function(){
        this.fetch({data: {page: twitterClient.currentPage }, reset: false});
        
    },

    comparator: function() {
        
    },

    parse: function(response){
       
        return response.statuses;
    },

    sortByRetweets: function(){
        this.comparator = function(tweet){
            return -tweet.get("retweet_count");
        }
    }

    
});


var TweetPostView = Backbone.View.extend({
    el: ".post-form",

    initialize: function() {
        
    },

    events:{
        "click button": "stopReload",
        "click button": "submitPost"
    },

    stopReload: function(event){
        
        event.preventDefault();
    },

    submitPost: function(event){

        event.preventDefault();
        var postContent = $(".form-input").val();
        var postUsername = $(".form-username").val();
        // this.model.set({message: postContent});
        this.model.set({username: postUsername});
        
        debugger
        // this.model.save(null, {
        //     error: function (originalModel, resp, options) {
                
        //         debugger
        //     },
        //     success: function (response) {
        //         debugger
        //     }
        // });
        $(".form-input").val('');
        $(".form-username").val('');
    }

});
//use jquery to get the stuff in the form, use this.model.set to send it to the model, define url in model, call this.model.save();

var TweetPost = Backbone.Model.extend({
    url: "api/posttweet",

    defaults:{
        message: '',
        username: ''
    },

    validate: function(attrs, options){
        console.log(attrs.message);
        if(attrs.message == '' || attrs.username == ''){
            
            return "please fill in all the text boxes"
        }
    }

});



//paginate, sort, listhover, post

$(document).ready(function(){
    
    var tweets = new Tweets();
    window.tweet = new Tweet();
    var tweetPost = new TweetPost();
    var tweetsView = new TweetsView({collection: tweets});
    var tweetPostView = new TweetPostView({model: tweetPost});
    var sidebarView = new SidebarView({collection: tweets});

    tweetPost.on("invalid", function(model, error){
        debugger
    });
    // $('form').submit(function(event){
    // event.preventDefault();
// });
    
});

//implement devise. and want to log in and log out with backbone. 
