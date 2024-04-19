/*=============== MOSTRAR MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MOSTRAR MENU =====*/
/* Validar se a constante existe */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU OCULTO =====*/
/* Validar se a constante existe */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVER MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // Quando clicamos em cada nav__link, removemos a classe show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ALTERAR CABEÇALHO DE FUNDO ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // Quando a rolagem for maior que 50 de altura da janela de visualização, adicione a classe scroll-header à tag de cabeçalho
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== CARRINHO ===============*/
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

/* Carrinho Working JS*/
if (document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

/* Fazendo Função */

function ready(){
    //Remover itens
    var removeCartButtons = document.getElementsByClassName("cart__remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    /*Alterações de quantidade */
    var quantityInputs = document.getElementsByClassName("cart__quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    /* Adicionar ao carrinho */
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    } 
    /* Funcionamento do botão comprar */
    document.getElementsByClassName("button_buy")[0].addEventListener("click", buyButtonClicked);
}

/* Botão Comprar */
function buyButtonClicked(){
    alert("Seu Pedido foi realizado com sucesso")
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


//Remover itens
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
/* Alterações de quantidade */
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <=0){
        input.value = 1;
    }
    updatetotal();
}
/* Adicionar ao carrinho */
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


/* Atualizar total */

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
    /*Se o preço contiver alguns centavos no valor*/
    total = Math.round(total *100) / 100;

    document.getElementsByClassName("total__price")[0].innerText = 'R$' + total;
}


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // Quando a rolagem for superior a 200 altura da janela de visualização, adicione a classe show-scroll à tag a com a classe scroll-top
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== VER SEÇÃO ATIVA ===============*/
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