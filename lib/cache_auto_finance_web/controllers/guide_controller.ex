defmodule CacheAutoFinanceWeb.GuideController do
  use CacheAutoFinanceWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
