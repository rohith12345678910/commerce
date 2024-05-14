var sidenav = document.querySelector(".side-navbar")

function showNavbar()
{
    sidenav.style.left="0"
}

function closeNavbar(){
    sidenav.style.left="-60%"
}

//open & close cart

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click" , () =>{
    cart.classList.add("active")
})

closeCart.addEventListener("click" , () =>{
    cart.classList.remove("active")
})

//start when the document is ready

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", start);
}else{
    start();
}

function start(){
    addEvents();
}

function update(){
    addEvents();
    updateTotal();
}

function addEvents(){
    //Remove items from cart
    let cartRemove_btns = document.querySelectorAll("#cart-remove");

    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) =>{
        btn.addEventListener("click" , handle_removeCartItem);
    });

    // change item quantity

    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change" , handle_changeItemQuantity);
    } );

    // Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });
    //      Buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click",hadle_buyOrder);

}

//handle events function
let itemsAdded = []

function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgsrc = product.querySelector(".header-img").src;
    console.log(title , price , imgsrc);

    let newToAdd = {
        title,
        price,
        imgsrc,
    };
    // handle item is already exist
    if (itemsAdded.find(el => el.title == newToAdd.title)){
        alert("This item is Already Exist!");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }
    
    // Add product to cart

    let cartBoxElement = cartBoxComponent(title , price , imgsrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();
}

function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el=>
        el.title !=
        this.parentElement.querySelector(".cart-product-title").innerHTML
    ); 

    update();
}
function handle_changeItemQuantity(){
    if (isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
     this.value = Math.floor(this.value); // to keep it integer
     update();
}
function hadle_buyOrder(){
    if (itemsAdded.length <=0){
        alert("Your Cart Is Empty! Please add some products.");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your Order is placed Successfully:)")
}

//update & render functions
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total +=price * quantity;
    } );
    // keep 2 digits after the decimal point
    total = total.toFixed(2);
    // or you can use also
    //total = Math.round(total * 100) / 100;
    totalElement.innerHTML = "$" + total;
}


// Html Components

function cartBoxComponent(title , price , imgsrc){
return `<div class="cart-box">
<img class="cart-img"  src=${imgsrc} alt="">
<div class="detail-box">
    <div class="card-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!--Remove Icon-->
<i id="cart-remove" class="fa-solid fa-trash"></i>

</div>`
}

