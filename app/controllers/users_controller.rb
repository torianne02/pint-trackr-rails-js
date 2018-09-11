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
      redirect_to user_url(@user), notice: "Welcome to PintTrackr!"
    else
      render :new, notice: "Please fill out all criteria."
    end
  end

  def show
    @beers = @user.beers
    @breweries = @user.breweries
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to user_url(@user), notice: "Successfully updated account information."
    else
      render :edit
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
