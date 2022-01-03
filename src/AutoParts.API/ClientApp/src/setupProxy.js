const createProxyMiddleware = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:7372';

// const context =  [
//   "/api/account/secret"
// ];

// module.exports = function(app) {
//   const appProxy = createProxyMiddleware(context, {
//     target: target,
//     secure: false
//   });

//   app.use(appProxy);
// };

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  )
};
