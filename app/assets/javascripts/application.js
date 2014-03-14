// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require list
//= require jquery
//= require jquery_ujs
//= require underscore
//= require backbone
//= require backbone_rails_sync
//= require_tree ../templates
//= require_tree ./models
//= require_tree ./views
//= require_tree .

// Rails CSRF Protection
$(document).ajaxSend(function (e, xhr, options) {
  var token = $("meta[name='csrf-token']").attr("content");
  xhr.setRequestHeader("X-CSRF-Token", token);
});

_.templateSettings = {
    interpolate: /{{=(.+?)}}/g,
    evaluate: /{{(.+?)}}/g
};

Router = {
  '/signup': function () { new SignupView(); },
  '/login': function () { new LoginView(); },
// /tweets, also add models and views to folders
  route: function (path) {
    _.each(Router, function(callback, route) {
      if (!_.isRegExp(route)) {
        route = Backbone.Router.prototype._routeToRegExp(route);
      }
      if(route.test(path)) {
        var args = Backbone.Router.prototype._extractParameters(route, path);
        callback.apply(this, args);
      }
    });
  }
};

$(document).ready(function () {
  Router.route(window.location.pathname);
  var tweets = new Tweets();
    window.tweet = new Tweet();
    var tweetPost = new TweetPost();
    var tweetsView = new TweetsView({collection: tweets});
    var tweetPostView = new TweetPostView({model: tweetPost});
    var sidebarView = new SidebarView({collection: tweets});
    
    tweetPost.on("invalid", function(model, error){
        debugger
    });
});

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


