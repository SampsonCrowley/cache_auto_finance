defmodule CacheAutoFinance.Repo do
  use Ecto.Repo,
    otp_app: :cache_auto_finance,
    adapter: Ecto.Adapters.Postgres
end
