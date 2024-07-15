import { cart,removeFromCart,updateCartItemQuantity,updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import dayjs from"https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions } from "../../data/deliveryOptions.js";
import {renderPayment} from"./paymentSummary.js"
import{renderCheckoutHeader} from "./chechout-header.js"
import { formatCurrency } from "../../utils/currency.js";

export function getDay(deliveryOptionId){
  let days;
deliveryOptions.forEach((Option)=>{
  if(Option.id===deliveryOptionId){
    days=Option.deliveryDays;
  }
});
  let today=dayjs();
  
  for (let index = 0; index < days; index++) {
    // console.log();
    today=today.add(1,'days');
    if(today.format("dddd")==='Saturday'){
    
      today=today.add(2,'days');
    }
    else if(today.format("dddd")==='Sunday'){
      today=today.add(1,'days');
    }
    
  }
  // const date=today;
  return today;
}
export function renderOrder(){
  let itemsHtml='';
  cart.forEach((cartItem)=>{
    const id=cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>{
      if(product.id===id){
        matchingProduct=product;
      }
    });
    itemsHtml+=` 
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id+cartItem.size}">
        <div class="delivery-date">
          Delivery date: ${getDay(cartItem.deliveryOption).format("dddd, MMMM D")}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src=${matchingProduct.image}>

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id+cartItem.size}>
                Update
              </span>
              <input class="quantity-input js-quantity-input">
              <span class="save-quantity-link link-primary js-save-link"data-product-id=${matchingProduct.id+cartItem.size}>Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id+cartItem.size}>
                Delete
              </span>
            </div>
            <div class="size-container">
            ${cartItem.size?`Size: <span class="size">${cartItem.size}</span>`:''}
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionInHtml(matchingProduct,cartItem)}
          </div>
        </div>
      </div>`;
    document.querySelector('.order-summary').innerHTML=itemsHtml;
  });


  function deliveryOptionInHtml(matchingProduct,cartItem) {
    let priceHtml='';
    deliveryOptions.forEach((deliveryOption)=>{
      const dateString=getDay(deliveryOption.id).format("dddd, MMMM D");
      let price=!deliveryOption.priceCents?'FREE':`$${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked=deliveryOption.id===cartItem.deliveryOption;
      // console.log(matchingProduct.id+matchingProduct.size);
      priceHtml+=
      `
      
          <div class="delivery-option " >
            <input type="radio" ${isChecked?'checked':''}
              class="delivery-option-input js-delivery-option"
              name="delivery-option-${matchingProduct.id+cartItem.size}"data-delivery-option-id="${deliveryOption.id}" data-item-delivery-option="${matchingProduct.id+cartItem.size}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${price} Shipping
              </div>
            </div>
        </div>
      `;
    });
    return priceHtml;
  }
  document.querySelectorAll('.js-delivery-option')
    .forEach((option)=>{
      option.addEventListener('click',()=>{
        const deliveryOptionId=option.dataset.deliveryOptionId;
        const productId=option.dataset.itemDeliveryOption;
        updateDeliveryOption(productId,deliveryOptionId);
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.querySelector('.delivery-date').innerHTML=`Delivery date: ${getDay(deliveryOptionId).format("dddd, MMMM D")}`;
        renderPayment();
      });
    });

  document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        
        const productId=link.dataset.productId;
        removeFromCart(productId);
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        renderCheckoutHeader();
        renderPayment();
      });
    });

    document.querySelectorAll('.js-update-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
      
        const productId=link.dataset.productId;
        document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
        
      
        
      });
    });
    document.querySelectorAll('.js-save-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
      
        updateQuantity(link);
        renderPayment();
      });
      document.body.addEventListener('keydown',(event)=>{
      if(event.key==='Enter'){
        updateQuantity(link);
        renderPayment();
      }
      });
    });


  function updateQuantity(link){
    const productId=link.dataset.productId;
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        const inputValue=Number(container.querySelector('.js-quantity-input').value||container.querySelector('.js-quantity-label').innerHTML);
        if(inputValue<=0 || inputValue>1000){
          alert('Quantity must be at least 1 and less than 1000');
          return;
        }
        
          container.querySelector('.js-quantity-label').innerHTML=inputValue;
          
          updateCartItemQuantity(productId,inputValue);
          renderCheckoutHeader();
          container.classList.remove('is-editing-quantity');
        
  }
}