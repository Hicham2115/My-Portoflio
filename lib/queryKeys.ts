export const queryKeys = {
  projects: (type?: string) => type ? ["projects", type] : ["projects"],
} as const;
