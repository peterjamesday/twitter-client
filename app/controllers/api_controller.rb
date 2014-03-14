class ApiController < ApplicationController


  
  def retrieveTweets

    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "cLjRhLvbbTPXhDRACCCA"
      config.consumer_secret     = "Gzi9axezpgndUpFuZKY1BfsEzfqHeUYTqAi1yrVSW0"
      config.access_token        = "376022262-drKqBAiZkGZBHZNOS9YBctaAcVTkZFg4QkGLUC6W"
      config.access_token_secret = "TUkqz9UzkkXg3Lm0mGwAfDYSYvJhsY8Z24H0tzP2U4ShZ"
    end


    tweets = client.search('#Stanford', :max_id => params[:max_id]).take(40)

   


    # file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford1.json')
    # if Integer(params[:page]) <= 6
    #   file = File.join(Rails.root, 'app', 'assets', 'javascripts', 'stanford' + params[:page] + '.json')

    # end

    # tweets = JSON.parse(File.read(file))
    render :json => tweets, :status => 200

    
  end

  def postTweet
    if params.has_key?(:message) && params.has_key?(:username)
      message = { :message => "Your response has been successfully posted."}
      render :json => message
    else
      message = 'There was an error with your response.'
      render :json => {:error => message}.to_json, :status => 500
    end
  end

end
