class UsersController < ApplicationController
    

    private
    def strong_params
        params.require(:user).permit(:name, :email)
    end

end
