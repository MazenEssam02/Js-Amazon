import { products } from "../data/products.js";
import { formatCurrency } from "../utils/currency.js";
import {orders} from "../data/order.js"
import{addToCart, updateCart} from '../data/cart.js';
updateCart();


generateHtml();
function generateHtml(){

let orderhtml='';
orders.forEach((order)=>{
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dateTimeString=order.orderTime;
const dateObject=new Date(dateTimeString);
const dayName = weekdays[dateObject.getDay()];

orderhtml+=`
<div class="order-container">
        <div class="order-details-container">
          <div class="order-date-price-container">
            <div class="order-date-container">
              <p class="order-placed">Order Placed:</p>
              <p class="order-date">${dayName}</p>
            </div>
            <div class="price-container">
              <div class="total">Total:</div>
              <div class="price">$${formatCurrency(order.totalCostCents)
              }</div>
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
order.products.forEach((cartItem)=>{
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
                  Arriving on: ${cartItem.estimatedDeliveryTime}
                </div>
                <div class="product-quantity">
                  Quantity:${cartItem.quantity}
                </div>
                <button class="buy-again-button primary-button js-buy-again-button js-button-id-${cartItem.productId+order.id}" data-product-id=${cartItem.productId} data-order-id=${order.id}>
                  <img class="again-icon" src="./images/icons/buy-again.png" alt="buy again">
                  Buy it again
                </button>
              </div>
              <div class="product-actions">
                <a  href="tracking.html">
                  <button class="track-button">
                    
                    Track Package
                  </button>
                </a>
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
      const orderId=button.dataset.orderId;
      addToCart(productId);
      addedToCartButton(productId+orderId)
      updateCart();
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
