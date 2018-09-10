class BreweriesController < ApplicationController
  def show
    @brewery = Brewery.find_by(id: params[:id])
    @beers = @brewery.beers
  end
end
