//alert add to cart

const alertAddCartSuccess = () => {
  const elementAlert = document.querySelector('[alert-add-cart-susscess]')
  if (elementAlert) {
    elementAlert.classList.remove('alert-hidden')

    setTimeout(() => {
      elementAlert.classList.add('alert-hidden')
    }, 2000)
  }
}
// end alert add to cart

//show total tours in cart
const showTotalTour = () => {
  const miniCart = document.querySelector('[mini-cart]')
  if (miniCart) {
    const totalTour = JSON.parse(localStorage.getItem('cart')).length
    miniCart.innerHTML = totalTour
  }
}
// goi lan dau khi load
showTotalTour();
//end show total tours in cart

// tour-images
const tourImages = document.querySelector(".tour-images");
if (tourImages) {
  const swiper = new Swiper(".tour-images", {});
}
// End tour-images

//Cart

// cart variable nay chỉ được khởi tạo 1 lần duy nhất
// khi submit thì sẽ k còn nữa
const cart = localStorage.getItem('cart');
if (!cart) {
  localStorage.setItem('cart', JSON.stringify([]));
}
const formAddToCart = document.querySelector('[form-add-to-cart]')
if (formAddToCart) {
  formAddToCart.addEventListener('submit', e => {
    e.preventDefault();
    const idTour = parseInt(formAddToCart.getAttribute('tour-id'))
    const quantity = parseInt(formAddToCart.quantity.value)
    if (idTour && quantity > 0) {
      // dua ve js
      const cart = JSON.parse(localStorage.getItem('cart'));

      // ktra da ton tai tour chua
      const existTour = cart.find(tour => tour.id == idTour)
      if (existTour) {
        existTour.quantity += quantity
      } else
        cart.push({
          id: idTour,
          quantity: quantity
        })
      localStorage.setItem('cart', JSON.stringify(cart))
      alertAddCartSuccess();
      showTotalTour();
    }
  })
}
//End cart