export type CategoriesQueryResponse = {
      id: number;
      name: string;
      slug: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
      image_url: string | null;
    }