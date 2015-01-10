class UsersController < ApplicationController

  def create
    @user = User.new(require_params_user)
    if @user.save
      Greeter.welcome_email(@user).deliver
      redirect_to root_path
      else
      redirect_to root_path         
    end    
  end

  private
  def require_params_user
    params.require(:user).permit(:name,:email)
  end
end