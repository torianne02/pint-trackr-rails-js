class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update]
  before_action :current_user, except: %i[new create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user), notice: "Welcome to PintTrackr, #{@user.username}!"
    else
      redirect_to root_path
    end
  end


  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
