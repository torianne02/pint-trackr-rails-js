class BreweriesController < ApplicationController
  def index
    @breweries = Brewery.all
  end

  def show
    @beers = Brewery.beers
  end
end
