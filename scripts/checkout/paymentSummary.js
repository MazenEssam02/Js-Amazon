import {calculateCart,calculatePrice,calculateShipping} from "../../data/cart.js";
import { formatCurrency } from "../../utils/currency.js";

export function renderPayment() {
  const price=calculatePrice();
  const shipping=calculateShipping()
  const totalNoTax=price+shipping;
  const tax=0.1*(shipping+price);
  const total=totalNoTax+tax;
  console.log(total);
  const html=`       
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCart()}):</div>
            <div class="payment-summary-money">$${formatCurrency(price)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping & handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalNoTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
          </div>

          <button class="place-order-button primary-button">
            Place your order
          </button>`;
  document.querySelector('.js-payment-summary').innerHTML=html;
}