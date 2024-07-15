import{addToCart,updateCart} from '../data/cart.js';
import{products} from '../data/products.js';

updateCart();
let productsHtml='';

products.forEach((product)=>{
  productsHtml+=`<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src=${product.image} alt="socks">

        </div>
        <div class="product-description">
          <p class="product-main-desc">${product.name}</p>
        </div>
        <div class="rating-container">
          <img class="rating-img" src="${product.getStarsUrl()}" alt="">
          <span class="rating-quantity">${product.rating.count}</span>
        </div>
        
        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="dropdown-container">
          <select class="product-quantity js-product-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        ${product.sizeSelectHtml()}
        </div>
        <div class="spacer">
        ${product.sizeChartHtml()}
        </div>
        <div class="check-container js-check-container-${product.id}">
          <img class="check-image" src="./images/icons/checkmark.png" alt="check">
          <span class="added-check">Added</span>
        </div>
        <button class="add-to-cart-button primary-button js-add-to-cart" data-product-id=${product.id}>
          Add to Cart
        </button>
     
        
      </div>
  `;
});
document.querySelector('.products-grid').innerHTML=productsHtml;


function addedToCartIcon(productId){
  const addedMessage=document.querySelector(`.js-check-container-${productId}`);
        //show added icon
       
     
      addedMessage.classList.add('check-container-visible');
      const prevTimeoutId=timeoutList[productId];
     
      if(prevTimeoutId){
        clearTimeout(prevTimeoutId);
      
      }
      const timeoutId=setTimeout(()=>{
        addedMessage.classList.remove('check-container-visible');
        
      },2000);
      timeoutList[productId]=timeoutId;
}


const timeoutList={};

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click',()=>{
      const productId=button.dataset.productId;
      addedToCartIcon(productId);
      addToCart(productId);
      updateCart();  
    });
  });

  let baseUrl = 'amazon.html';
  let params = new URLSearchParams();

  // Add parameters
  params.append('orderId', orderId);
  params.append('productId', productId);

  // Construct the final URL
  let finalUrl = `${baseUrl}?${params.toString()}`;
  window.location.href = finalUrl;
