class TripsController < ApplicationController
    
    def new
    end
    
    def update
    end

    private
    def strong_params
        params.require(:trips).permit(:user_id, :place_id)
    end

end
