const cartWrapper = document.querySelector('.cart-wrapper');

window.addEventListener('click', function(event) {
    if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.card');

        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText
        }

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);

        } else {
            const cartItemHtml = `
                <div class="cart-item" data-id="${productInfo.id}">
                        <div class="cart-item__top">
                            <div class="cart-item__img">
                                <img src="${productInfo.imgSrc}" alt="">
                            </div>
                            <div class="cart-item__desc">
                                <div class="cart-item__title">${productInfo.title}</div>
                                <div class="cart-item__weight">${productInfo.itemsInBox}. / ${productInfo.weight}.</div>

                                <!-- cart-item__details -->
                                <div class="cart-item__details">

                                    <div class="items items--small counter-wrapper">
                                        <div class="items__control" data-action="minus">-</div>
                                        <div class="items__current" data-counter="">${productInfo.counter}</div>
                                        <div class="items__control" data-action="plus">+</div>
                                    </div>

                                    <div class="price">
                                        <div class="price__currency">${productInfo.price}</div>
                                    </div>

                                </div>
                                <!-- // cart-item__details -->

                            </div>
                        </div>
                    </div>
             `;
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHtml);
        }
        card.querySelector('[data-counter]').innerText = '0';
        toggleCartStatus();
    }

    if (event.target.getAttribute('data-action') == 'minus' && event.target.closest('.cart-wrapper')) {
        const counterNum = event.target.closest('.counter-wrapper').querySelector('[data-counter]').innerText;
    }

});
function toggleCartStatus() {
    const cartEmpty = document.querySelector('[data-cart-empty]');
    const cartTotal = document.querySelector('.cart-total');
    const orderForm = document.querySelector('#order-form');
    const deliveryCost = document.querySelector(".delivery-cost");

    if (cartWrapper.querySelectorAll(".cart-item").length > 0) {
        cartEmpty.classList.add('none');
        cartTotal.classList.remove('none');
        orderForm.classList.remove('none');
    } else {
        cartEmpty.classList.remove('none');
        cartTotal.classList.add('none');
        orderForm.classList.add('none');
    }

    let totalPrice = 0;
    cartWrapper.querySelectorAll('.cart-item').forEach(function(item){
        const counter = item.querySelector('[data-counter]').innerText;
        const priceOneItem = item.querySelector('.price__currency').innerText;
        const price = parseInt(counter) * parseInt(priceOneItem);
        totalPrice = totalPrice + price; 
    })
    cartTotal.querySelector('.total-price').innerText = totalPrice;

    if (cartTotal.querySelector(".total-price").innerText < 1000) {
        deliveryCost.classList.add("rouble"); 
        cartTotal.querySelector(".delivery-cost").innerText = "300 руб.";
      } else {
        deliveryCost.classList.remove("rouble");
        cartTotal.querySelector(".delivery-cost").innerText = "бесплатно";
      }

}