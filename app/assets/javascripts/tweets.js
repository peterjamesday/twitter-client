
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status === 200) {
    	var jsonResponse = JSON.parse(xhr.responseText);
    	success(jsonResponse);
    }
}
xhr.open('GET', '/api/retrieveTweets/abcd', true);
xhr.send();



function success(response){
	for(i = 0; i < response.statuses.length; i++){
    	
    	$(".text").append("<div class='bubble'><h3>"+ response.statuses[i].retweet_count +" retweets!</h3><h2>"+response.statuses[i].user.screen_name+ 
    		" ("+ response.statuses[i].user.followers_count +" followers)" + " said:</h2>" 
    		+ response.statuses[i].text + "</div>");   
    }
}


// $.ajax({
//   url: "/api/retrieveTweets/abcd",
//   type: "GET",
//   success: function(response) {
 
//     for(i = 0; i < response.statuses.length; i++){
    	
//     	$(".text").append("<div class='bubble'><h3>"+ response.statuses[i].retweet_count +" retweets!</h3><h2>"+response.statuses[i].user.screen_name+ 
//     		" ("+ response.statuses[i].user.followers_count +" followers)" + " said:</h2>" 
//     		+ response.statuses[i].text + "</div>");   	

//     }

   
//    respondClick();
//   }


  
// });

function respondClick(){

	$('.bubble').click(function(evt){
		evt.stopPropagation();
		
		$(this).hide();

	});
}

$(document).on("click", ".bubble", function(){
	
	$(this).hide();
})

