class PlacesController < ApplicationController
    
    
    def update
        
    end

    private
    def strong_params
        params.require(:places).permit(:name, :city, :description)
    end



end
