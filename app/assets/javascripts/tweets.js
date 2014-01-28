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
        }
       
    });
}


loadPosts();





function listHover (el){
    var template = window.JST["tweetCount"];
    $(".bubble").hover(function(){
                $('.popUp').show();
                $('.popUp').append(template(el));
               
            
        }, function(){
            $('.additionalInfo').find(".additionalInfo:last").remove();
            $('.popUp').hide();
            
        }
    );
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



//top 3 tweeters, locations, more analysis

var options = {
    valueNames: ['retweet', 'name', 'text', 'tweetCount']
};


function createList () {
    var tweetList = new List('tweet-list', options);

}