class TripsController < ApplicationController
    
    def update
        
    end

    private
    def strong_params
        params.require(:trips).permit(:user_id, :place_id)
    end

end
