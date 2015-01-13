class PagesController < ApplicationController
  def front
    @user = User.new
  end

  def aboutus
    @user = User.new
  end

  def languages
    session[:lang] = params[:lang]
    redirect_to root_path
  end
end