
var TweetsView = Backbone.View.extend({

    el: ".list", 

    lastRendered: 0,

    initialize: function(){
        // this.render();
        var self = this;
         this.collection.on("reset sync", this.render, this);
         this.collection.on("sortRetweets", this.renderSortedList, this);

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
      
        for(var i = this.lastRendered; i < this.collection.length; i++){
            var tweetView = new TweetView({
                 model: this.collection.at(i)
            });

            $('.list').append(tweetView.render().el); 
        }  
    },

    events: {
        "mouseover .bubble": "hoverSidebar"
    },

  

    hoverSidebar: function(event){
        
        var bubbleTop = $(event.currentTarget).offset().top + 50,
            bubbleIndex = $(event.currentTarget).index();
            console.log("collection length: " + this.collection.length);
            console.log("bubbleIndex: " + bubbleIndex);
                $('.popUp').show();
                $('.popUp').html(this.template(this.collection.at(bubbleIndex).toJSON()));
                
                
                $('.popUp').css("top", bubbleTop);
    },

    checkScroll: _.throttle(function(){
        var docPosition = $(document).scrollTop();
        var self = this;

        if(docPosition + 1000 > $(document).height()){

              twitterClient.currentPage += 1;
              self.collection.sortByMaxId();
              self.collection.sort();
              
              twitterClient.maxId = self.collection.at(1).get("id");
              self.collection.fetch({data: {page: twitterClient.currentPage, max_id: twitterClient.maxId }, remove:false}); 
        }

        self.lastRendered = self.collection.length;
    }, 3000),

    renderSortedList: function(){
      
        for(var i = 0; i < this.collection.length; i++){
            var tweetView = new TweetView({
                 model: this.collection.at(i)
            });

            $('.list').append(tweetView.render().el); 
        }  
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



var SidebarView = Backbone.View.extend({
    el: ".sideBar",

    initialize: function(){
        this.collection.on("render", this.listTopThree, this);
    },

    render: function(){
        
        
    },

    events: {
        "click button.sortByRetweets": "retweetSort"
        // "click button.sortByFollowers": "listTopThree"
    },

    retweetSort: function(){
         $(".list").html('');
        this.collection.sortByRetweets();
        this.collection.sort();
        this.collection.trigger("sortRetweets");
    },

    listTopThree: function(){
        var counter = 0,
            name,
            statuses;

        $('.topThree').empty();
        this.collection.sortByTweetCount();
        this.collection.sort();
        
        for(var i = 0; i < 40; i++){
            
            name = this.collection.at(i).get("user").name;
            statuses = this.collection.at(i).get("user").statuses_count;
            if(i == 0){
                $('.topThree').append("<h2>"+ name + ": " + statuses + "</h2>");
            } else if (name != this.collection.at(i-1).get("user").name && counter < 2){
                $('.topThree').append("<h2>"+ name + ": " + statuses + "</h2>");
                counter += 1;
            } 
        }
        

    }

});


var TweetPostView = Backbone.View.extend({
    el: ".post-form",

    initialize: function() {
        
    },

    events:{
        "click button": "stopReload",
        "click button": "submitPost",
        "mouseover": "hidePopUp"
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
    },

    hidePopUp: function(){
        $('.popUp').hide();
    }

});