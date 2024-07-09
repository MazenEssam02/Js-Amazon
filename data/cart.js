export const cart=[{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2
  },{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1
}];

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
      quantity
    });
  }
}
export function removeFromCart(productId){
  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
    const index=cart.indexOf(cartItem);
      cart.splice(index,1);
      
     
    }
  });
}