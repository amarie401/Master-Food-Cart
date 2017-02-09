class CreateRatingsTable < ActiveRecord::Migration[5.0]

  def up
    create_table :ratings do |t|
      t.integer :score
      t.string :review
      t.references :foodcart, foreign_key: 'foodcarts.id'
    end
  end

  def down
    drop_table :ratings
  end

end
