class ApiController < ApplicationController
before_filter :require_user

  def twitterAuth
    user = User.find(session[:user_id])

    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["CONSUMER_KEY"]
      config.consumer_secret     = ENV["CONSUMER_SECRET"]
      config.access_token        = user.access_token
      config.access_token_secret = user.access_token_secret
    end

    return client
  end
  
  
  def retrieveTweets
    if session[:search_query]
      search_query = session[:search_query]
    else
      search_query = "cats"
    end
    tweets = twitterAuth.search(search_query + " -rt", :max_id => params[:max_id]).take(40)
    render :json => tweets, :status => 200
  end

  def postTweet


    if params.has_key?(:message)
      twitterAuth.update(params[:message])
      message = { :message => "Your response has been successfully posted."}
      render :json => message
    else
      message = 'There was an error with your response.'
      render :json => {:error => message}.to_json, :status => 500
    end
  end

end
