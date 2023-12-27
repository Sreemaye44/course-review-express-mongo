export type TQueryObject = {
  [key: string]: unknown;
  page?: string;
  limit?: string;
  searchTerm?: string;
  sortOrder?: string;
  sortBy?: string;
  fields?: string;
  minPrice?: string;
  maxPrice?: string;
};
