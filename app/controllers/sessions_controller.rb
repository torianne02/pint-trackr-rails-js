class SessionsController < ApplicationController
  before_action :current_user, except: %i[new create create_from_oath]
  def new
    @user = User.new
  end

  def create
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      redirect_to signin_path, notice: 'Username and/or password are incorrect.'
    end
  end

  def create_from_oath
    puts auth
    @user = User.find_or_create_by(uid: auth['uid']) do |u|
      u.username = auth['info']['name']
      u.email = auth['info']['email']
    end
    @user.save!(:validate => false)
    session[:user_id] = @user.id
    redirect_to user_path(@user)
  end

  def destroy
    session.delete :user_id
    redirect_to root_url, notice: "You have successfully logged out."
  end

  private

  def auth
    request.env['omniauth.auth']
  end
end
