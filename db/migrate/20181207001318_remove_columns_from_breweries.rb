class RemoveColumnsFromBreweries < ActiveRecord::Migration[5.2]
  def change
    remove_column :breweries, :city, :string
    remove_column :breweries, :state, :string
  end
end
