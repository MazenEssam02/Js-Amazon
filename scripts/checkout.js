import { cart,removeFromCart,calculateCart,updateCartItemQuantity,updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from"https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions } from "../data/deliveryOptions.js";
updateCart();


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
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${getDay(cartItem.deliveryOption)}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${matchingProduct.image}>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${(matchingProduct.priceCents/100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
              Update
            </span>
            <input class="quantity-input js-quantity-input">
            <span class="save-quantity-link link-primary js-save-link"data-product-id=${matchingProduct.id}>Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
              Delete
            </span>
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


function getDay(id){
  let days;
 deliveryOptions.forEach((Option)=>{
  if(Option.id===id){
    days=Option.deliveryDays;
  }
 });
  const today=dayjs();
  const date=today.add(days,'days');
  return date.format("dddd, MMMM D");
}
function deliveryOptionInHtml(matchingProduct,cartItem) {
  let priceHtml='';
  deliveryOptions.forEach((deliveryOption)=>{
    const today=dayjs();
    const date=today.add(deliveryOption.deliveryDays,'days');
    const dateString=date.format("dddd, MMMM D");
    let price=!deliveryOption.priceCents?'FREE':`$${(deliveryOption.priceCents/100).toFixed(2)} -`;
   const isChecked=deliveryOption.id===cartItem.deliveryOption;
    
    priceHtml+=
    `
    
        <div class="delivery-option js-delivery-option" data-delivery-option-id="${deliveryOption.id}" data-item-delivery-option="${matchingProduct.id}">
          <input type="radio" ${isChecked?'checked':''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
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
    });
  });

document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      
      const productId=link.dataset.productId;
      removeFromCart(productId);
      const container=document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCart();
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
     
      updatemQuantity(link);
    });
    document.body.addEventListener('keydown',(event)=>{
     if(event.key==='Enter'){
      updatemQuantity(link);
     }
    });
  });

function updateCart(){

      document.querySelector('.js-return-home-link')
      .innerHTML=`${calculateCart()} items`;
}
function updatemQuantity(link){
  const productId=link.dataset.productId;
      const container=document.querySelector(`.js-cart-item-container-${productId}`);
      const inputValue=Number(container.querySelector('.js-quantity-input').value||container.querySelector('.js-quantity-label').innerHTML);
      if(inputValue<=0 || inputValue>1000){
        alert('Quantity must be at least 1 and less than 1000');
        return;
      }
      
        container.querySelector('.js-quantity-label').innerHTML=inputValue;
        
        updateCartItemQuantity(productId,inputValue);
        updateCart();
        container.classList.remove('is-editing-quantity');
      
}
