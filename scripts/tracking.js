import{ updateCart} from '../data/cart.js';
import {orders} from "../data/order.js"
import { getDay } from "./checkout/orderSummary.js";
import { products } from "../data/products.js";
import dayjs from"https://unpkg.com/dayjs@1.11.10/esm/index.js"
updateCart();


generateTrackingHtml();
function generateTrackingHtml(){
  const url=new URL(window.location.href);
  const orderId=url.searchParams.get('orderId');
  const productId=url.searchParams.get('productId');
  let selectedOrder;
  orders.forEach((order)=>{
    if(order.id===orderId){
      selectedOrder=order;
    }
  });

  let selectedCartItem;
  selectedOrder.cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      selectedCartItem=cartItem;
    }
  });
  
    let selectedItem;
    products.forEach((product)=>{
      if(product.id===productId){
        selectedItem=product;
      }
    });
  const html=`
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>
       <div class="delivery-date">
          Arriving on  ${getDay(selectedCartItem.deliveryOption).format("dddd, MMMM D")}
        </div>

        <div class="product-info">
        ${selectedItem.name}
        </div>

        <div class="product-info">
          Quantity: ${selectedCartItem.quantity}
        </div>

        <img class="product-image" src=${selectedItem.image}>

        <div class="progress-labels-container">
          <div class="progress-label js-preparing">
            Preparing
          </div>
          <div class="progress-label js-shipped">
            Shipped
          </div>
          <div class="progress-label js-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
  `;
  document.querySelector('.js-order-tracking').innerHTML=html;
  const progress=calculateProgress(selectedOrder,selectedCartItem);
  const progressBox=document.querySelector('.progress-bar')
  progressBox.style.width=`${progress}%`;
  let progressLabel;
  if(progress<50){
     progressLabel=document.querySelector('.js-preparing');
  }
  else if(progress<100){
    progressLabel=document.querySelector('.js-shipped');
  }
  else{
    progressLabel=document.querySelector('.js-delivered');
  }
  progressLabel.classList.add('current-status')
}
function calculateProgress(selectedOrder,selectedCartItem){
  const today=dayjs();
  const deliveryTime=(getDay(selectedCartItem.deliveryOption));
  const orderTime=dayjs(selectedOrder.orderTime)
  const progress=((today-orderTime)/(deliveryTime-orderTime))*100;
  return progress;

}
