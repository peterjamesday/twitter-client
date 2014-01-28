class ApiController < ApplicationController
	respond_to :json 
	require 'twitter'
  def retrieveTweets
    file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'tweets.json')
    tweets = File.read(file)
 #    client = Twitter::REST::Client.new do |config|
 #      config.consumer_key        = "fkUMmxaXEORjQWUrOMWwQ"
 #      config.consumer_secret     = "40RM4SbR6VhMLGCyxfa9sCC2XFIPAy9773Jw5S5UZs"
 #      config.access_token        = "376022262-3xdsBHKfWIuH5q7h259iddw8d75n6jjr2wzAEeCp"
 #      config.access_token_secret = "Q6EQ4h15RCgDVApb16BMIxFLmfMTg3jIMrap3qtBfPhf3"
 #    end
 #    page = params[:page].to_i
	# tweets = client.search('stanford', options = { :count => 5 , :since_id => page})
    respond_to do |format| 
    	
      format.json { render json: tweets }
    end
  end
end
