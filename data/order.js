import { emptyCart } from "./cart.js";

function generateRandomId(length = 32) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
  let randomId = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters[randomIndex];
  }
  return randomId;
}



export let orders=JSON.parse(localStorage.getItem('order'))||[];
export function addOrder(cart,totalPrice){
 
  orders.unshift({
    id:generateRandomId(),
    totalPrice:totalPrice,
    cart:cart
  });
 
  localStorage.setItem('order',JSON.stringify(orders));
  emptyCart();
}

