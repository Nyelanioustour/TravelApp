class PhotosController < ApplicationController
    def index
        photos = Photo.all
        render json: photos
    end
    def show
        photo = Photo.find(param[:id])
        render json:photo
    end
    def create
        photo = Photo.create(strong_params())
        render json: photo
    end

    private
    def strong_params
        params.require(:photos).permit(:img_url)
    end
end
