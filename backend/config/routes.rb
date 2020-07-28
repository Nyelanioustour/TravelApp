Rails.application.routes.draw do
  resources :albums, only:[:update, :new, :delete]
  resources :photos, only:[:update, :new, :delete]
  resources :trips, only:[:update, :new, :delete]
  resources :user_places, only:[:update, :new, :delete]
  resources :places, only:[:update, :new, :delete]
  resources :users, only:[:update, :new, :delete]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
