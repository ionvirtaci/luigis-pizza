export class Product {
    constructor(public label: string,
                public price: number) {
    }
}

export class Pizza {
    constructor(public size: Product,
                public toppings: Product[]) {
    }
}

export const PizzaSizes: Product[] = [
    {label: 'small', price: 15},
    {label: 'medium', price: 20},
    {label: 'large', price: 25}
];

export const Toppings: Product[] = [
    {label: 'olives', price: 3},
    {label: 'pepperoni', price: 4},
    {label: 'mushrooms', price: 2},
    {label: 'pepper', price: 2}
];

/**
 * Gets the price of a product found by its label. Will return 0 if product not found.
 *
 * @param label
 * @param productList
 */
export const getProductPrice = (label: string, productList: Product[]) => {
    const prodIdx = productList.findIndex(product => product.label === label);

    return prodIdx > -1 ? productList[prodIdx].price : 0;
};
