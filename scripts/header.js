

generateHeaderHtml();
export function generateHeaderHtml(){
  let headerHtml=`
  <a href="amazon.html" class="header-left">
        <img src="./images/amazon-logo-white.png" alt="Amazon-logo" class="amazon-logo">
        <img src="./images/amazon-mobile-logo-white.png" alt="Amazon-logo" class="amazon-mobile-logo">
      </a>
     

      <div class="search-container">
        <input class="search-input js-search-input" type="text" placeholder="Search">
        <button class="search-icon-button js-search">
          <img class="search-icon" src="./images/icons/search-icon.png" alt="Search icon">
        </button>
      </div>
      
      <div class="header-right">
        <a class="header-returns-orders" href="orders.html">
          <p class="header-returns">Returns</p>
          <p class="header-orders">& Orders</p>
        </a>
        <a class="header-cart" href="checkout.html">
          <div class="cart-icon-container">
            <p class="cart-quantity js-cart-quantity"></p>
            <img class="cart-icon" src="./images/icons/cart-icon.png" alt="Cart">
          </div>
          
          <p class="header-cart-title">Cart</p>
        </a>
      </div>`;
      document.querySelector('.header').innerHTML=headerHtml;
      document.querySelector('.js-search').addEventListener('click',()=>{
        let baseUrl = 'amazon.html';
      let params = new URLSearchParams();
      const name=document.querySelector('.js-search-input').value;
      // Add parameters
      params.append('search', name);
      // Construct the final URL
      let finalUrl = `${baseUrl}?${params.toString()}`;
      window.location.href = finalUrl;
      });
      document.body.addEventListener('keydown',(event)=>{
        if(event.key==='Enter'){
          let baseUrl = 'amazon.html';
          let params = new URLSearchParams();
          const name=document.querySelector('.js-search-input').value;
          // Add parameters
          params.append('search', name);
          // Construct the final URL
          let finalUrl = `${baseUrl}?${params.toString()}`;
          window.location.href = finalUrl;
        }
      });
}