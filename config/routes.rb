Rails.application.routes.draw do
  mount Sidekiq::Web => '/admin/sidekiq'
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

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
    resource :password_reset, only: [:new, :create, :edit, :update]
    resource :password, only: [:edit, :update]
  end
end