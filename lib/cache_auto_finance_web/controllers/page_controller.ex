defmodule CacheAutoFinanceWeb.PageController do
  use CacheAutoFinanceWeb, :controller

  def index(conn, _params) do
    push(conn, Routes.static_path(conn, "/js/shared-runtime.js"))
    push(conn, Routes.static_path(conn, "/js/vendors~app.js"))
    push(conn, Routes.static_path(conn, "/js/app.js"))
    push(conn, Routes.static_path(conn, "/css/app.css"))
    render(conn, "index.html")
  end
end
