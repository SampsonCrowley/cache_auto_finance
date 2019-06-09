defmodule CacheAutoFinanceWeb.HelloController do
  use CacheAutoFinanceWeb, :controller

  def index(conn, _params) do
    render(conn, :index)
  end

  def show(conn, %{ "id" => message }) do
    render(conn, :show, message: message)
  end
end
