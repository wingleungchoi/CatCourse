class PagesController < ApplicationController
  def front
    @user = User.new
  end

  def aboutus
    @user = User.new
  end
end