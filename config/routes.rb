Rails.application.routes.draw do
  get '/auth/facebook/callback' => 'sessions#create'
end
