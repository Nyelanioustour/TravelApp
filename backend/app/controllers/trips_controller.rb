class TripsController < ApplicationController
    def index
        trips = Trip.all 
        render json: trips, :include => [:user,:place]
    end

    def create
        Trip.create(strong_params())
    end
    
    def update
    end

    private
    def strong_params
        params.require(:trips).permit(:user_id, :place_id)
    end

end
