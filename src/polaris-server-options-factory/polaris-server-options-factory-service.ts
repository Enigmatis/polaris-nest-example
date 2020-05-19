import { polarisGraphQLLogger } from "../utils/logger";
import {
  ExpressContext,
  PolarisServerOptions,
  RealitiesHolder,
} from "@enigmatis/polaris-core";
import * as polarisProperties from "../resources/polaris-properties.json";
export const createOptions: () => PolarisServerOptions = () => {
  return {
    typeDefs: [], // BY ANNOTATION
    resolvers: [], // BY ANNOTATION
    port: polarisProperties.port,
    applicationProperties: {
      id: polarisProperties.id,
      name: polarisProperties.name,
      version: polarisProperties.version,
      environment: polarisProperties.environment,
      component: polarisProperties.component,
    },
    logger: polarisGraphQLLogger,
    supportedRealities: new RealitiesHolder(
      new Map([[3, { id: 3, type: "notreal3", name: "default" }]])
    ),
  };
};
export const createOptionsFactory = () => createOptions();
