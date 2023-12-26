import { RequestHandler, createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: { use: (arg0: RequestHandler) => void }) {
  app.use(
    createProxyMiddleware("/OpenAPI3/auth/authentication.json", {
      target: "https://localhost:8080",
    }),
  );
};

module.exports = function (app: { use: (arg0: RequestHandler) => void }) {
  app.use(
    createProxyMiddleware("/OpenAPI3/addr/stage.json", {
      target: "https://localhost:8080",
    }),
  );
};
