module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  filenameHashing: true,
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: 'https://insjob.dvconsulting.org'
  },
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
      proxy: 'https://insjob.dvconsulting.org'
    }
  }
};
