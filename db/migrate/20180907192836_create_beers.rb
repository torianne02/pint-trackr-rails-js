class CreateBeers < ActiveRecord::Migration[5.2]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :beer_type
      t.integer :ibu
      t.string :abv
      t.integer :user_id
      t.integer :brewery_id
    end
  end
end
