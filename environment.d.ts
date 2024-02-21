declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_HOST: string;
      DATABASE_PORT: number;
      DATABASE_TYPE: any;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
      JWT_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
