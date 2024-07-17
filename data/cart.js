
import { products } from "./products.js";
import { deliveryOptions } from "./deliveryOptions.js";

export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||[];
}
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}

export function addToCart(productId,size=false){
  let selectedItem;
  const input=document.querySelector(`.js-product-size-${productId}`);
  size=size==='false'?false:size;
  size= (size?size: (input?input.value:false));
  
  cart.forEach((item)=>{
    if(item.productSizeId===productId+size){
      selectedItem=item;
    }
  });
  const quantityInput=document.querySelector(`.js-product-quantity-${productId}`);
  const quantity=quantityInput?Number(quantityInput.value):1;
  
  if(selectedItem && size===selectedItem.size){
    selectedItem.quantity+=quantity;
  }
  else{
    cart.push({
      productId:productId,
      productSizeId:productId+size,
      quantity,
      size,
      deliveryOption:'1'
    });
  }
  
  saveToStorage();
}
export function removeFromCart(productId){
  cart.forEach((cartItem)=>{
    if(cartItem.productSizeId===productId){
    const index=cart.indexOf(cartItem);
      cart.splice(index,1);
      
     
    }
  });
  saveToStorage();
}
export function calculateCart(){
  let cartQuantity=0;
  cart.forEach((item)=>{
    cartQuantity+=item.quantity;
    });
    return cartQuantity;
  }
  export function updateCartItemQuantity(productId,quantity){
   
    cart.forEach((item)=>{
      if(item.productSizeId===productId){
       item.quantity=quantity;
      }
    });
    saveToStorage();
  }

  export function updateDeliveryOption(productId,deliveryOptionId){
    let item;
    cart.forEach((cartItem)=>{

      if(cartItem.productSizeId===productId){
        item=cartItem;
      }
    });
    item.deliveryOption=deliveryOptionId;
    saveToStorage();
  }
  export function calculatePrice(){
    let totalPrice=0;
    cart.forEach((cartItem)=>{
      let matchingProduct;
      products.forEach((product)=>{
        if(product.id===cartItem.productId){
          matchingProduct=product;
        }
      });
      totalPrice+=cartItem.quantity*matchingProduct.priceCents;
    });
    return totalPrice;
  }
  export function calculateShipping(){
    let totalShipping=0;
    cart.forEach((cartItem)=>{
      let matchingOption;
      deliveryOptions.forEach((option)=>{
        if(option.id===cartItem.deliveryOption){
          matchingOption=option;
        }
      });
      totalShipping+=matchingOption.priceCents;
    });
    return totalShipping;
  }
  export function emptyCart(){
    cart.splice(0,cart.length);
    saveToStorage();
  }
  export function updateCart(){
    const cartQuantity=calculateCart()
      document.querySelector('.js-cart-quantity')
      .innerHTML=cartQuantity;
  }