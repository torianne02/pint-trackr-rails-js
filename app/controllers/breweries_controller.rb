class BreweriesController < ApplicationController
  def index
    @breweries = Brewery.all
  end

  def show
    @brewery = Brewery.find_by(id: params[:id])
    @beers = @brewery.beers
  end
end
