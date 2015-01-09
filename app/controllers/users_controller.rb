class UsersController < ApplicationController

  def create
    User.create(require_params_user)    
    redirect_to root_path
  end

  private
  def require_params_user
    params.require(:user).permit(:name,:email)
  end
end