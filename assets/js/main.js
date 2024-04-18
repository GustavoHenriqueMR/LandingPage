/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== CART ===============*/
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

/* Cart Working JS*/
if (document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

/* Making Fuction */

function ready(){
    //Remove items
    var removeCartButtons = document.getElementsByClassName("cart__remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    /*Quantity Changes */
    var quantityInputs = document.getElementsByClassName("cart__quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    /* Add to Cart*/
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    } 
    /* Buy Button Work */
    document.getElementsByClassName("button_buy")[0].addEventListener("click", buyButtonClicked);
}

/* Buy Button */
function buyButtonClicked(){
    alert("Your Order is placed")
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


//Remove items
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
/* Quantity Changes */
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <=0){
        input.value = 1;
    }
    updatetotal();
}
/* Add To Cart */
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("models_model")[0].innerText;
    var price = 699.90;
    var productImg = shopProducts.getElementsByClassName("models-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart__img">
        <div class="detail__box">
            <div class="cart-product-title">${title}</div>
            <div class="cart__price">R$${price.toFixed(2)}</div>
            <input type="number" value="1" class="cart__quantity">
        </div>
        <i class="ri-delete-bin-fill cart__remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName("cart__remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart__quantity")[0].addEventListener("change", quantityChanged);

    updatetotal();
}


/* Update Total */

function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart__price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart__quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("R$",""))
        var quantity = quantityElement.value;
        total= total + (price * quantity);
    }
    /*If price Contain some Cents Value*/
    total = Math.round(total *100) / 100;

    document.getElementsByClassName("total__price")[0].innerText = 'R$' + total;
}


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== SWIPER ===============*/
let swiperModels = new Swiper('.models__swiper', {
    loop: true,
    slidesPerView: '3',
    centeredSlides: 'auto',
    grabCursor: true,


    breakpoints:{
        768:{
            slidesPerView: 3,
        }
    }
})
  
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin:'bottom',
    distance:'60px',
    duration: 2500,
})

sr.reveal('.models__container',{distance:'100px', delay:400})
sr.reveal('.home__img, .about__card',{distance:'100px', delay:400})
sr.reveal('.home__title, .about__data',{delay:1000})
sr.reveal('.home__subtitle',{delay:1200})
sr.reveal('.home__title-description,.home__description',{delay:1500})
sr.reveal('.home__buttom',{origin:'left',distance:'60%', delay:1600})
sr.reveal('.specs__data', {origin:'left', interval:100, delay:400})
sr.reveal('.specs__img',{origin:'right', delay:700})
sr.reveal('.footer__logo, .footer__content, .footer__copy, .specs__t, .models__title',{origin:'top',delay:200,interval:100})