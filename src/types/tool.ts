export type Tool = {
  schema: any;
  description: string;
  handler: (args: any) => Promise<any>;
};

export type Tools = Record<string, Tool>;
