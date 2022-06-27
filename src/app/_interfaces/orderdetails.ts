export interface Orderdetails {
    in: {
        id: number,
        product_Id: number,
        quantity: number,
        order_Id: number,
        status: string,
        discount_Id: number
    }
}