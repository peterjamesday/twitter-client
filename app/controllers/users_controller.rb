class UsersController < ApplicationController

  

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
       respond_to do |format|
              format.json { render :json => @user }
      end
      flash[:notice] = 'Account created.'

    else
     
       respond_to do |format|
              format.json { render :json => @user.errors, :status => 500 }
       end

    end
    
   

  end


end