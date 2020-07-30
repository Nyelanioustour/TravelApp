class TripsController < ApplicationController
    def index
        trips = Trip.all 
        render json: trips, :include => [:user,:place]
    end

    def show
        trip = Trip.find(params[:id])
    end

    def create
        trip = Trip.create(strong_params())
        render json: trip
    end
    
    def update
    end

    private
    def strong_params
        params.require(:trip).permit(:user_id, :place_id)
    end

end
