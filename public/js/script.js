// cart variable nay chỉ được khởi tạo 1 lần duy nhất
// khi submit thì sẽ k còn nữa
const cart = localStorage.getItem('cart');
if (!cart) {
  localStorage.setItem('cart', JSON.stringify([]));
}

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


// update quantity tour
const updateQuantityTour = () => {
  const listInputQuantity = document.querySelectorAll("input[name='quantity']")
  if (listInputQuantity.length > 0) {
    listInputQuantity.forEach(input => {
      input.addEventListener('change', () => {
        const tourId = input.getAttribute('item-id')
        const quantity = input.value;

        const cart = JSON.parse(localStorage.getItem('cart'))
        const changedTour = cart.find(tour => tour.id == tourId)
        if (changedTour) {
          changedTour.quantity = quantity
          localStorage.setItem('cart', JSON.stringify(cart))
          window.location.reload()
        }
      })
    })
  }
}
// end update quantity tour


// delete tour in cart
const deleteTours = () => {
  const deleteBtnList = document.querySelectorAll('[btn-delete]')
  if (deleteBtnList.length > 0) {
    deleteBtnList.forEach(btn => {
      btn.addEventListener('click', () => {
        const idTour = btn.getAttribute('btn-delete')
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.filter(tour => tour.id != idTour)
        localStorage.setItem('cart', JSON.stringify(newCart))
        window.location.reload()
      })
    })
  }
}
//end delete tour in cart

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

// show tour in cart
const tableCart = document.querySelector('[table-cart]')
if (tableCart) {
  const tours = localStorage.getItem('cart')
  fetch('/cart/list-json', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: tours
    })
    .then(res => res.json())
    .then(data => {
      const htmlArray = data.tours.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <img src="${item.image}" alt="${item.title}" width="80px" />
      </td>
      <td>
        <a href="/tours/detail/${item.slug}">${item.title}</a>
      </td>
      <td>
        ${item.price.toLocaleString()}đ
      </td>
      <td>
        <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.id}" style="width: 60px;" />
      </td>
      <td>
        ${item.total.toLocaleString()}đ
      </td>
      <td>
        <button class="btn btn-sm btn-danger" btn-delete="${item.id}">Xóa</button>
      </td>
    </tr>
  `);
      const tbody = tableCart.querySelector('tbody')
      tbody.innerHTML = htmlArray.join(" ");

      const totalElement = document.querySelector('[total-price]')
      totalElement.innerHTML = data.total.toLocaleString()

      deleteTours()
      updateQuantityTour()
    })

}

//end show tour in cart