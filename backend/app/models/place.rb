class Place < ApplicationRecord
    has_many :trips
    has_many :albums
    has_many :users, through: :trips
    has_many :photos, through: :albums
end
