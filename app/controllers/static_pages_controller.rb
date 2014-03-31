class StaticPagesController < ApplicationController
  
  before_filter :require_user

  def home
  	@current_user = current_user
    @search_query = session[:search_query]
  	@logged_in = true

  	
  end

  def help
  end

  
end


