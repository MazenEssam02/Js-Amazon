import { emptyCart } from "./cart.js";


export let orders=JSON.parse(localStorage.getItem('order'))||[];
export function addOrder(cart){
  orders.unshift(cart);
  localStorage.setItem('order',JSON.stringify(orders));
  emptyCart();
}

