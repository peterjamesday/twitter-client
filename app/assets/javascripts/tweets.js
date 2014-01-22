
$.ajax({
  url: "/api/retrieveTweets/abcd",
  type: "GET",
  success: function(response) {
 
    var template = window.JST["test"];
    $(".text").append(template(response));

    }
  
});


$(document).on("click", ".bubble", function(){
	$(this).hide();
})





var options = {
    item: '<li><h3 class="name"></h3><p class="city"></p></li>'
};

var values = [
    { name: 'Jonny', city:'Stockholm' }
    , { name: 'Jonas', city:'Berlin' }
];

var hackerList = new List('hacker-list', options, values);

