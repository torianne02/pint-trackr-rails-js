class BeersController < ApplicationController
  before_action :set_user
  before_action :set_beer, only: %i[show edit update destroy]

  def index
    @beers = @user.beers
  end

  def new
    @beer = Beer.new(user_id: params[:user_id])
    @brewery = Brewery.new
  end

  def create
    @brewery = Brewery.find_or_create_by(params[:brewery_attributes])
    @beer = Beer.create(beer_params)
    if @beer.save
      redirect_to user_beers_url(@user)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @beer.update(beer_params)
      redirect_to user_beers_url(@user)
    else
      render :edit
    end
  end

  def show
  end

  def destroy
    @beer.destroy
    redirect_to user_beers_url(@user)
  end

  private

  def set_user
    @user = User.find(session[:user_id])
  end

  def set_beer
    @beer = Beer.find(params[:id])
  end

  def beer_params
    params.require(:beer).permit(
      :name,
      :beer_type,
      :ibu,
      :abv,
      :user_id,
      brewery_attributes: %i[name location id]
    )
  end
end
