class PagesController < ApplicationController
  def front
    @user = User.new
    flash.now[:success] = "HOHOHOHO"
  end

  def aboutus
    @user = User.new
  end
end