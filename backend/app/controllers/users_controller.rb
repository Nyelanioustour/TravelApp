class UsersController < ApplicationController
    
    def new
    end

    def update
    end

    private
    def strong_params
        params.require(:user).permit(:name, :email)
    end

end
