export interface Item {
  ID: number;
  SKU: string;
  Description: string;
  Category: string;
  Unit: string;
  Size: string;
  Par_level: number;
  Stock_on_hand: number;
  Threshold: number;
  Re_order: boolean;
}

export const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch('/items.json');
  if (!response.ok) {
    throw new Error('There was an error loading the data.');
  }
  return response.json();
};
