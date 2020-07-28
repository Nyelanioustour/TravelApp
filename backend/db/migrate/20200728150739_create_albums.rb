class CreateAlbums < ActiveRecord::Migration[6.0]
  def change
    create_table :albums do |t|
      t.integer :photo_id
      t.integer :place_id

      t.timestamps
    end
  end
end
