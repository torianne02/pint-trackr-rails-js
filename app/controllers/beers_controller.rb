class BeersController < ApplicationController
  before_action :set_user
  before_action :set_beer, only: %i[show edit update destroy]

  def index
    @beers = @user.beers.highest_ibu
    respond_to do |format|
      format.html
      format.json { render json: @beers }
    end
  end

  def new
    @beer = Beer.new(user_id: params[:user_id])
    @brewery = Brewery.new
  end

  def create
    @brewery = Brewery.find_or_create_by(beer_params[:brewery_attributes])
    @beer = Beer.create(beer_params)
    @beer.brewery_id = @brewery.id
    @beer.user = @user
    binding.pry
    if @beer.save
      render 'beers/beer', layout: false
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @beer.update(beer_params)
      redirect_to beers_url, notice: "Beer successfully updated."
    else
      render :edit
    end
  end

  def show
    @beer = Beer.find_by(id: params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @beer }
    end
  end

  def destroy
    @beer.destroy
    redirect_to 'beers/index', notice: "Beer successfully deleted."
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
      brewery_attributes: %i[name]
    )
  end
end
