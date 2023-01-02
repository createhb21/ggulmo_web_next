const PRODUCTION_URL = "";

export const isProduction =
  process.env.NODE_ENV === "production" &&
  process.env.BASE_URL === PRODUCTION_URL;
