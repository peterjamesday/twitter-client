
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

    checkScroll: _.throttle(function(){
        var docPosition = $(document).scrollTop();
        var self = this;

        if(docPosition + 1000 > $(document).height()){
              twitterClient.currentPage += 1;
              self.collection.fetch({data: {page: twitterClient.currentPage }}); 
        }
    }, 1000)

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