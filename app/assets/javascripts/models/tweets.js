//global object for global variables
var twitterClient = {
    currentPage: 1,
    maxId: 1
}



var Tweet = Backbone.Model.extend({

});



var Tweets = Backbone.Collection.extend({
    model: Tweet,


    url: "/api/retrieveTweets/abcd",

    initialize: function(){
        this.fetch({data: {page: twitterClient.currentPage}, reset: false});
        
    },

    comparator: function() {
        
    },


    sortByRetweets: function(retweetSortedDirection){
        this.comparator = function(tweet){
            if(retweetSortedDirection == false){
                return -tweet.get("retweet_count");
            } else{
                return tweet.get("retweet_count");
            }
        }
    },

    sortByMaxId: function(){
        this.comparator = function(tweet){
            return tweet.get("id");
        }
    },

    sortByTweetCount: function(){
        this.comparator = function(tweet){
            return -tweet.get("user").statuses_count;
        }
    },

    sortByFollowers: function(followersSortedDirection){
        this.comparator = function(tweet){
          if(followersSortedDirection == false){
            return -tweet.get("user").followers_count;
          } else {
            return tweet.get("user").followers_count;
          }
        }
    }

    
});



//use jquery to get the stuff in the form, use this.model.set to send it to the model, define url in model, call this.model.save();

var TweetPost = Backbone.Model.extend({
    url: "api/posttweet",

    defaults:{
        message: ''
        
    },

    validate: function(attrs, options){
        console.log(attrs.message);
        if(attrs.message == ''){
            
            return "please fill in all the text boxes"
        }
    }

});