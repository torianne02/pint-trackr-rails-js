class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
  end 


  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
