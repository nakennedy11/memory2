defmodule Memory2Web.PageController do
  use Memory2Web, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
