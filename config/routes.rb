Rails.application.routes.draw do
  root :to => "web/boards#show"

  namespace :admin do
    resources :users
  end

  namespace :api do
    namespace :v1, defaults: {format: :json} do
      resources :tasks, only: [:index, :show, :create, :update, :destroy]
      resources :users, only: [:index, :show]
    end
  end

  scope module: :web do
    resource :board, only: :show
    resource :session, only: [:new, :create, :destroy]
    resources :developers, only: [:new, :create]
  end
end