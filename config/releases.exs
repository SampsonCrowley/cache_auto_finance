import Config

config :down_under_sports, CacheAutoFinanceWeb.Endpoint,
  server: true,
  url: [host: System.get_env("APP_NAME") <> ".gigalixirapp.com", port: 443],
  cache_static_manifest: "priv/static/cache_manifest.json"
