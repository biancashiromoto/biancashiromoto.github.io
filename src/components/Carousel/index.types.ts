export interface DataType {
  id: string;
  description: string;
  homepage: string;
  name: string;
  topics: string[],
  [key: string]: any;
}
