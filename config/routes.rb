Rails.application.routes.draw do
  get '/' => 'meetings#index'

  get '/meetings' => 'meetings#index'
  get '/meetings/:id' => 'meetings#show'

  namespace :api do
    namespace :v1 do
      get '/meetings' => 'meetings#index'
    end
  end

end
