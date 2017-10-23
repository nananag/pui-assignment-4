/*** Object Constructors ***/
function indi(flavor1, quantity, img) {
  this.flavor1 = flavor1;
  this.quantity = quantity;
  this.price = 10;
  this.type = "Individual";
  this.img = img;
}

function sixP(flavor1, flavor2, flavor3, quantity, img) {
  this.flavor1 = flavor1;
  this.flavor2 = flavor2;
  this.flavor3 = flavor3;
  this.quantity = quantity;
  this.price = 60;
  this.type = "6 Pack";
  this.img = img;
}

function twelveP(flavor1, flavor2, flavor3, quantity, img) {
  this.flavor1 = flavor1;
  this.flavor2 = flavor2;
  this.flavor3 = flavor3;
  this.quantity = quantity;
  this.price = 120;
  this.type = "12 Pack";
  this.img = img;
}

/*** Global Variables ***/
var cart = []; //store items put in cart
var wishlist = []; //store items put in wishlist
var item = ""; //store flavor of current page
var img = ""; //store img of current page
var selection = null;

var flavor = ["Maple Apple Pecan","Bacon","Walnut","Original (Gluten-free)",
"Original (Vegan)","Original","Pumpkin Spice","Caramel Pecan",
"Carrot Cake","Old Fashioned Buttermilk", "Strawberry Rhubarb",
"Birthday Cake","Lemon Lavender", "Cranberry", "Blackberry"];

/*** Functions ***/
function getSelection() {
    var flavor1 = localStorage.getItem("item");
    var flavor2 = $("#flavor1").find(":selected").text();
    var flavor3 = $("#flavor2").find(":selected").text();
    var quantity = $("#quantity").val();
    var packs = $("input[name='packs']:checked").val();
    var img = localStorage.getItem("img");

    //instantiate selected item
    if(packs == 1){
        selection = new indi(flavor1,quantity,img);
    }
    else if(packs == 6){
        selection = new sixP(flavor1, flavor2, flavor3, quantity,img);
    }
    else if(packs == 12){
        selection = new twelveP(flavor1, flavor2, flavor3, quantity,img);
    }
}

//instantiate a cart item based on selection
function makeCartItem(img, packs, flavor1, flavor2, flavor3, quantity, price) {
    var div = $("<div>", {"class": "cart-content"});

    var newImg = $("<img>");
    newImg.attr("src", img);

    var p = $("<p>");
    var newPacks = $("<span>");
    newPacks.html(packs);
    p.append(newPacks);

    if(packs == "Individual"){
        var newF1 = $("<span>");
        newF1.html("Flavor: " + flavor1);
        p.append(newF1);
    }
    else{
        var newF1 = $("<span>");
        newF1.html("Flavor 1: " + flavor1);
        var newF2 = $("<span>");
        newF2.html("Flavor 2: " + flavor2);
        var newF3 = $("<span>");
        newF3.html("Flavor 3: " + flavor3);
        p.append(newF1);
        p.append(newF2);
        p.append(newF3);
    }

    var newPrice = $("<span>");
    newPrice.html("$" + price);
    p.append(newPrice);

    var newQuant = $("<span>", {"class": "cart-quantity"});
    newQuant.html(quantity);

    var newItemTotal = $("<span>", {"class": "cart-itemTotal"});
    newItemTotal.html("$" + quantity*price);

    var button = $('<button/>',
    {
        text: 'Remove',
        "class": "cart-remove"
    });
    button.click(function(){
        cart = JSON.parse(localStorage.getItem("cart"));
        cart.splice($(this).parent().index(),1);
        localStorage.setItem("cart", JSON.stringify(cart));
        $(this).parent().remove();
        updateCartQuant();
        console.log("removed cart");
    });

    div.append(newImg);
    div.append(p);
    div.append(newQuant);
    div.append(newItemTotal);
    div.append(button);
    return div;
    //$(".cart-container").append(div);
}

//instantiate a cart item based on selection
function makeWishedItem(img, packs, flavor1, flavor2, flavor3, quantity, price) {
    var div = $("<div>", {"class": "cart-content"});

    var newImg = $("<img>");
    newImg.attr("src", img);

    var p = $("<p>");
    var newPacks = $("<span>");
    newPacks.html(packs);
    p.append(newPacks);

    if(packs == "Individual"){
        var newF1 = $("<span>");
        newF1.html("Flavor: " + flavor1);
        p.append(newF1);
    }
    else{
        var newF1 = $("<span>");
        newF1.html("Flavor 1: " + flavor1);
        var newF2 = $("<span>");
        newF2.html("Flavor 2: " + flavor2);
        var newF3 = $("<span>");
        newF3.html("Flavor 3: " + flavor3);
        p.append(newF1);
        p.append(newF2);
        p.append(newF3);
    }

    var newPrice = $("<span>");
    newPrice.html("$" + price);
    p.append(newPrice);

    var newQuant = $("<span>", {"class": "cart-quantity"});
    newQuant.html(quantity);

    var newItemTotal = $("<span>", {"class": "cart-itemTotal"});
    newItemTotal.html("$" + quantity*price);

    var button = $('<button/>',
    {
        text: 'Remove',
        "class": "cart-remove"
    });
    button.click(function(){
        wishlist = JSON.parse(localStorage.getItem("wishlist"));
        wishlist.splice($(this).parent().index(),1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        $(this).parent().remove();
        //console.log("removed wishlist");
    });

    div.append(newImg);
    div.append(p);
    div.append(newQuant);
    div.append(newItemTotal);
    div.append(button);
    $(".wishlist-container").append(div);
}

//populate shopping cart page
//update total price
//update number of items
function populateCart() {
    cart = JSON.parse(localStorage.getItem("cart"));
    var subtotal = 0;
    var count = 0;
    cart.forEach(function(item){
        var cartItem = makeCartItem(
            item.img,item.type,item.flavor1,
            item.flavor2,item.flavor3,
            item.quantity,item.price);
        subtotal += item.price*item.quantity;
        count += 1;
        $(".cart-container").append(cartItem);
    });
    $("#cart-subTotal").html("$" + subtotal);
    $("#cart-totalPrice").html("$" + subtotal);
    $("#nav-cart-quantity").html(count);
}

function updateCartQuant() {
    cart = JSON.parse(localStorage.getItem("cart"));
    var subtotal = 0;
    var count = 0;
    cart.forEach(function(item){
        subtotal += item.price*item.quantity;
        count += 1;
    });
    $("#cart-subTotal").html("$" + subtotal);
    $("#cart-totalPrice").html("$" + subtotal);
    $("#nav-cart-quantity").html(count);
}

//populate wishlist page
function updateWishlist() {
    wishlist = JSON.parse(localStorage.getItem("wishlist"));
    wishlist.forEach(function(item){
        makeWishedItem(
            item.img,item.type,item.flavor1,
            item.flavor2,item.flavor3,
            item.quantity,item.price);
    });
}

/*** Document Load ****/
$(document).ready(function() {
    //select item from menu page
    $(".col").click(function(){
        localStorage.removeItem("item");
        localStorage.removeItem("img");
        item = $(this).children("#item_name").text();
        img = $(this).children("img").attr('src');
        localStorage.setItem("item", item);
        localStorage.setItem("img", img);
    });

    //update product detail page based on selection
    $("#item_image").attr("src",localStorage.getItem("img"));
    $("#product-name").text(localStorage.getItem("item"));

    //populate flavor dropdown menu
    var fragment = document.createDocumentFragment();

    flavor.forEach(function(flavor, index) {
        if(flavor != localStorage.getItem("item")){
            var opt = document.createElement('option');
            opt.innerHTML = flavor;
            opt.value = flavor;
            fragment.append(opt);
        }
    });
    var fragment2 = fragment.cloneNode(true);

    $("#flavor1").append(fragment);
    $("#flavor2").append(fragment2);

    //toggle update page details
    $("#packsSelect :radio").change(function(){
        var price = $("#item_price");
        var flavorSelect = $("#flavorSelect");
        if(this.value == 1){
            price.text("$10");
            flavorSelect.hide();
        }
        else if(this.value == 6){
            price.text("$60");
            flavorSelect.show();
        }
        else{
            price.text("$120");
            flavorSelect.show();
        }
    });

    //add selection to cart
    $("#button-cart").click(function() {
        getSelection();

        //add selected to cart
        cart = JSON.parse(localStorage.getItem("cart"));
        if(cart === null){
            cart = [selection];
            localStorage.setItem("cart", JSON.stringify(cart));
            //console.log("set cart: " + localStorage.getItem("cart"));
        }
        else{
            cart.push(selection);
            localStorage.setItem("cart", JSON.stringify(cart));
            //console.log(localStorage.getItem("cart"));
        }
        populateCart();
    });

    $("#button-wish").click(function() {
        getSelection();

        //add selected to wishlist
        wishlist = JSON.parse(localStorage.getItem("wishlist"));
        if(wishlist === null){
            wishlist = [selection];
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            console.log("set wishlist: " + localStorage.getItem("wishlist"));
        }
        else{
            wishlist.push(selection);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            console.log(localStorage.getItem("wishlist"));
        }
        updateWishlist();
    });

    //populate shopping cart page
    //update total price
    //update number of items
    if(cart === null){
        console.log("cart empty");
        $("#cart-subTotal").html("$0");
    }
    else{
        populateCart();
    }

    if(wishlist === null){
        console.log("cart empty");
        $("#cart-subTotal").html("$0");
    }
    else{
        updateWishlist();
    }
});