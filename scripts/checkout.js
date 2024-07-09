import { cart,removeFromCart,calculateCart,updateCartItemQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

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
        Delivery date: Tuesday, June 21
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  document.querySelector('.order-summary').innerHTML=itemsHtml;
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
