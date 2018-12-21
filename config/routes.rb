Rails.application.routes.draw do
  root 'static_pages#home'
  resources :users
  resources :beers
  resources :breweries

  get '/signin', to: 'sessions#new'
  post '/sessions', to: 'sessions#create'
  post '/users/new', to: 'users#create'
  get '/logout', to: 'sessions#destroy'
  get '/auth/facebook/callback' => 'sessions#create_from_oath'
end
