export interface SellerSignup{
    name:string,
    email:string,
    password:string,
    id:number,
    Role:string
}

export interface SellerLogin{
    email:string,
    password:string
}

export interface Seller{
    Role:string,
    SellerName:string,
    SellerId:string,
    SellerEmail:string,
    id:number

}

export interface Product{
    id:number
    name:string,
    colour:string,
    description:string,
    imageurl:File | null,
    price:number
}

export interface User{
    name:string,
    email:string,
    password:string,
    role:string,
    id:number
}
export interface UserLogin{
    email:string,
    password:string
}

export interface Cart{
    id:number,
    userid:number,
    user:User|null,
    productid:number,
    product:Product | null
    price:number, 
    quantity:number
}

export interface CartDisplay{
    id:number,
    Userid:number,
    user:User|null,
    Productid:number,
    product:Product | null
    Price:number, 
    Quantity:number
}

export interface orders{
 
    id:number;
    name:string,
    price:string,
    Address:string,
    state:string
    city:string,
    country:string,
    pincode:string,
    phonenumber:string,
    email:string,
    Userid:number,
    user:User
}

export interface ordersDTO{
 
    id:number;
    name:string,
    price:string,
    address:string,
    state:string
    city:string,
    country:string,
    pincode:string,
    phonenumber:string,
    email:string,
    Userid:number,
    user:User
}