import { products } from "../data/products.js";
import {orders} from "../data/order.js"
import{addToCart, updateCart} from '../data/cart.js';
import { getDay } from "./checkout/orderSummary.js";
import dayjs from"https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { generateHeaderHtml } from './header.js';
generateHeaderHtml();

updateCart();
generateHtml();
function generateHtml(){

let orderhtml='';
orders.forEach((order)=>{

console.log(order.orderTime);
orderhtml+=`
<div class="order-container">
        <div class="order-details-container">
          <div class="order-date-price-container">
            <div class="order-date-container">
              <p class="order-placed">Order Placed:</p>
              <p class="order-date">${dayjs(order.orderTime).format('MMMM D')}</p>
            </div>
            <div class="price-container">
              <div class="total">Total:</div>
              <div class="price">$${order.totalPrice}</div>
            </div>
          </div>
          <div class="order-id-container">
            <div class="order-id-title">
              Order ID:
            </div>
            <div class="order-id">
              ${order.id}
            </div>
          </div>
        </div>
`;
order.cart.forEach((cartItem)=>{
  let selectedItem;
  products.forEach((product)=>{
    if(product.id===cartItem.productId){
      selectedItem=product;
    }
  });
  orderhtml+=
  `
          <div class="order-items">
            <div class="order-products-grid">
              <div class="product-img-container">
                <img class="product-img" src=${selectedItem.image} alt="socks">
              </div>
              <div class="product-details">
                <div class="product-name">
                  ${selectedItem.name}
                </div>
                <div class="product-arrival">
                  Arriving on: ${getDay(cartItem.deliveryOption).format("dddd, MMMM D")}
                </div>
                <div class="product-quantity">
                  Quantity:${cartItem.quantity}
                </div>
                <div class="size-container">
                  ${cartItem.size?`Size: <span class="size">${cartItem.size}</span>`:''}
                </div>
                <button class="buy-again-button primary-button js-buy-again-button js-button-id-${cartItem.productSizeId+order.id}" data-product-id=${cartItem.productId} data-size=${cartItem.size} data-order-id=${order.id}>
                  <img class="again-icon" src="./images/icons/buy-again.png" alt="buy again">
                  Buy it again
                </button>
              </div>
              <div class="product-actions">
               
                  <button class="track-button js-track-button" data-product-id=${cartItem.productId} data-order-id=${order.id}>
                    
                    Track Package
                  </button>
                
              </div>
            </div>
          </div>
        `;
       
});

orderhtml+='</div>';
    });
  
  document.querySelector('.js-items-grid').innerHTML=orderhtml;
  document.querySelectorAll('.js-buy-again-button').forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId=button.dataset.productId;
      const size=button.dataset.size;
      const orderId=button.dataset.orderId;
      addToCart(productId,size);
      addedToCartButton(productId+size+orderId)
      updateCart();
    });
  });

  document.querySelectorAll('.js-track-button')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId=button.dataset.productId;
      const orderId=button.dataset.orderId;
      let baseUrl = 'tracking.html';
      let params = new URLSearchParams();

      // Add parameters
      params.append('orderId', orderId);
      params.append('productId', productId);

      // Construct the final URL
      let finalUrl = `${baseUrl}?${params.toString()}`;
      window.location.href = finalUrl;
    });
  });
  
  const timeoutList={};
  function addedToCartButton(productId){
    const addedMessage=document.querySelector(`.js-button-id-${productId}`);
          //show added icon
        
      
        addedMessage.innerHTML=`<img class="again-icon" src="./images/icons/checkmark-black.png" alt="buy again">
                 Added`;
        const prevTimeoutId=timeoutList[productId];
      
        if(prevTimeoutId){
          clearTimeout(prevTimeoutId);
        
        }
        const timeoutId=setTimeout(()=>{
          addedMessage.innerHTML=`<img class="again-icon" src="./images/icons/buy-again.png" alt="buy again">
                  Buy it again`;
          
        },2000);
        timeoutList[productId]=timeoutId;
  }

}
