class Photo < ApplicationRecord
    has_many :albums
    has_many :places, through: :albums
end
