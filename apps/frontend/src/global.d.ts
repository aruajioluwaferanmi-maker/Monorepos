/// <reference types="vite/client" />

declare module "*.css";
declare module "*.scss";
declare module "*.module.css";

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ANALYTICS_ENABLED: string;
}
