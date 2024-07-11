
import { products } from "./products.js";
import { deliveryOptions } from "./deliveryOptions.js";

export const cart=JSON.parse(localStorage.getItem('cart'))||[{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2,
  deliveryOption:'1'
  },{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1,
  deliveryOption:'2'
}];
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}
export function addToCart(productId){
  let selectedItem;
  cart.forEach((item)=>{
    if(item.productId===productId){
      selectedItem=item;
    }
  });

  const quantity=Number(document.querySelector(`.js-product-quantity-${productId}`).value);

  if(selectedItem){
    selectedItem.quantity+=quantity;
  }
  else{
    cart.push({
      productId,
      quantity,
      deliveryOption:'1'
    });
  }
  saveToStorage();
}
export function removeFromCart(productId){
  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
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
      if(item.productId===productId){
       item.quantity=quantity;
      }
    });
    saveToStorage();
  }
  export function updateDeliveryOption(productId,deliveryOptionId){
    let item;
    cart.forEach((cartItem)=>{

      if(cartItem.productId===productId){
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