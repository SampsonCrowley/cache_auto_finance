defmodule CacheAutoFinanceWeb.Router do
  use CacheAutoFinanceWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CacheAutoFinanceWeb do
    pipe_through :browser

    get "/", RootController, :index
    get "/guide", GuideController, :index
    resources "/hello", HelloController, only: [ :index, :show ]
  end

  # Other scopes may use custom stacks.
  # scope "/api", CacheAutoFinanceWeb do
  #   pipe_through :api
  # end
end
