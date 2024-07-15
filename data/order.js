import { emptyCart } from "./cart.js";
import dayjs from"https://unpkg.com/dayjs@1.11.10/esm/index.js"
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
  const now = dayjs();
  
  orders.unshift({
    id:generateRandomId(),
    totalPrice:totalPrice,
    orderTime:now,
    cart:cart
  });
 
  localStorage.setItem('order',JSON.stringify(orders));
  emptyCart();
}
