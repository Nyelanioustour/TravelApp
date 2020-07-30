class AlbumsController < ApplicationController
    def index
        albums = Album.all 
        render json: albums
    end

    def show
        album = Album.find(params[:id])
        render json: albums
    end

    def create
        byebug
        album = Album.create(strong_params())
        render json: album
    end

    private
    def strong_params
        params.require(:albums).permit(:photo_id, :place_id)
    end
end
