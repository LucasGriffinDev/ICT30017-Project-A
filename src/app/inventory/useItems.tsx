

// define an Item object
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

// data fetching function
export const fetchItems = async (): Promise<Item[]> => {
    const response = await fetch('/items.json'); // fetch data from json file 'items'
    if (!response.ok) {
        throw new Error('There was an error loading the data.'); // handle error when fetching data
    }
    return response.json(); 
};

