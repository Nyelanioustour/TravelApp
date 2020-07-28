class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def show    
        user = User.find(params[:id])
        render json: user
    end


    def new
    end

    def update
    end

    private
    def strong_params
        params.require(:user).permit(:name, :email)
    end

end
