class AddColumnToBreweries < ActiveRecord::Migration[5.2]
  def change
    add_column :breweries, :city, :string
    add_column :breweries, :state, :string
  end
end
