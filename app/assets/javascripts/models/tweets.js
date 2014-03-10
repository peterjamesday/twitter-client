//global object for global variables
var twitterClient = {
    currentPage: 1

}



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