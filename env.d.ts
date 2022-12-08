declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PG_BASE: string;
      PG_USER: string;
      PG_HOST: string;
      PG_PASS: string;
      PG_PORT: string;
    }
  }
}

export { };
