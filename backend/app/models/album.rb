class Album < ApplicationRecord
    belongs_to :photo
    belongs_to :place
end
