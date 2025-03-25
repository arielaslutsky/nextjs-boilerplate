export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface SearchParams {
  breeds: string[];
  minAge?: number;
  maxAge?: number;
  size?: number;
  from?: number;
  sortOptions: SortOptions;
}

export interface SearchResults {
  resultIds: string[];
  total?: number;
  next: string;
  prev: string;
}

export interface SortOptions {
  field: string;
  order: "asc" | "desc";
}

export class DefaultSortOptions implements SortOptions {
  field = "breed";
  order: "asc" = "asc";
}
