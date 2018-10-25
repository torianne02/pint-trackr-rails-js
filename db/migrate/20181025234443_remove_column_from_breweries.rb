class RemoveColumnFromBreweries < ActiveRecord::Migration[5.2]
  def change
    remove_column :breweries, :location
  end
end
