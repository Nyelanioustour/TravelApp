class Trip < ApplicationRecord
    belongs_to :user
    belongs_to :place

    # def user_trip_names(user)

    # end
end
