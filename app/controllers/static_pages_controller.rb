class StaticPagesController < ApplicationController
  
  before_filter :require_user

  def home

  	@logged_in = true
  end

  def help
  end

  
end


