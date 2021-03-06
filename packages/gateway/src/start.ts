import { ServiceBroker } from "moleculer";
import {
  Translator,
  Voice,
  Character,
  Context,
  Media
} from "@learn-chinese-platform/services";
import * as WSGateway from "moleculer-io";
import * as HTTPGateway from "moleculer-web";

/**
 * Start the gateway
 * @param httpGatewayPort Port that the HTTP Gateway should listen on
 * @param wsGatewayPort Port that the WebSocket Gateway should listen on
 */
const start = async (
  httpGatewayPort: number | string,
  wsGatewayPort: number | string
) => {
  const broker = new ServiceBroker({
    transporter: "TCP",
    cacher: process.env.NODE_ENV === "production" ? "Memory" : undefined
  });

  broker.createService(Translator);
  broker.createService(Voice);
  broker.createService(Character);
  broker.createService(Context);
  broker.createService(Media);

  broker.createService({
    name: "httpgateway",
    mixins: [HTTPGateway],
    settings: {
      port: httpGatewayPort,
      cors: {
        origin: "*",
        methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
        allowedHeaders: [],
        exposedHeaders: [],
        credentials: false,
        maxAge: 3600
      }
    }
  });
  broker.createService({
    name: "wsgateway",
    mixins: [WSGateway],
    settings: {
      port: wsGatewayPort
    }
  });

  await broker.start();
  return broker;
};

const {
  name,
  description: pkgDescription,
  version,
  author,
  license,
  homepage
} = require("../package.json");

const description = `Learn Chinese Platform Gateway
${pkgDescription}

    HTTP Gateway started successfully on port ${process.env.HTTP_GATEWAY_PORT ||
      8080}!
    WebSocket Gateway started successfully on port ${process.env
      .WS_GATEWAY_PORT || 8081}!

Version: ${name}#${version} by ${author}
License: ${license}
More info: ${homepage}`;

start(
  process.env.HTTP_GATEWAY_PORT || 8080,
  process.env.WS_GATEWAY_PORT || 8081
).then(() => console.log(description));

export { start };
