import { cart,removeFromCart,loadFromStorage,addToCart } from "../../data/cart.js";

describe('test suite: deleteFromCart',()=>{
 


  it('remove product in the cart',()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    
    // expect(cart.length).toEqual(1);
    removeFromCart('e43638ce-6aa0-4b85-b2f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
  });

});

