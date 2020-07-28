class PlacesController < ApplicationController
    
    
    def new
    end
    
    def update
        
    end

    private
    def strong_params
        params.require(:places).permit(:name, :city, :description)
    end



end
