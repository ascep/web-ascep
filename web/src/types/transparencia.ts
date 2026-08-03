export type TransparenciaDoc = {
  id: string;
  category: string;
  title: string;
  path: string;
  preview?: string | null;
  updatedAt?: string;
  priority?: number;
};
