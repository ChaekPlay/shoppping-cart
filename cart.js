$("button").click(addToCart);
let shoppingCart = [];
let shoppingCartContainer = $(".cart");

//Adding item to cart
function addToCart(){
    let curProduct = {};
    curProduct.name = $(this).siblings("h2").eq(0).html();
    curProduct.price = parseFloat($(this).siblings("p").find("span").eq(0).html());
    curProduct.quantity = 1;
    let inCart = false;
 //   console.log(curProduct.name,' ',curProduct.price);
    for(item of shoppingCart){
        if(item.name == curProduct.name){
            item.quantity++;
            inCart = true;
            break;
        } 
    }
    if(!inCart){shoppingCart.push(curProduct);}
    console.log(shoppingCart);
    updateCart();
}

const taxRate = 1.1;
//Updating cart when user adding/removing smth
function updateCart(){
    shoppingCartContainer.empty();
    let overallNum = 0;
    for(let item of shoppingCart){
        let itemTotalPrice = item.price*item.quantity;
        let element = $('<p class="item"></p>').html('<button class="btn btn-success">+</button><button class="btn btn-danger">-</button>'+'<span>'+item.name+'</span> x '+item.quantity+', total: $'+itemTotalPrice.toFixed(2));
        element.appendTo(shoppingCartContainer);
        overallNum += itemTotalPrice;
    }
    $(".item button").click(changeQuantity);
    let overall = $('<p>Total: $'+overallNum.toFixed(2)+'</p>');
    overall.appendTo(shoppingCartContainer);
    let tax = $('<p>Tax: $'+(overallNum*(taxRate - 1)).toFixed(2)+'</p>');
    tax.appendTo(shoppingCartContainer);
    overallNum *= taxRate;
    let overallWithTax = $('<p>Total with tax: $'+overallNum.toFixed(2)+'</p>');
    overallWithTax.appendTo(shoppingCartContainer);
    let buyButton = $('<button class="btn btn-primary">Buy</button>');
    buyButton.prop('disabled',false);
    if(shoppingCart.length == 0){buyButton.prop('disabled',true);}
    buyButton.appendTo(shoppingCartContainer);
}
//removing item from cart
function removeFromCart(CartItemName){
    for(let item of shoppingCart){
        if(item.name == CartItemName){
            let itemIndex = shoppingCart.indexOf(item);
            shoppingCart.splice(itemIndex,1);
            break;
        }
    }
}
//changing quantity of selected item
function changeQuantity(){
    for(let item of shoppingCart){
        let CartItemName = $(this).siblings("span").eq(0).html();
        if(item.name == CartItemName){
            if($(this).hasClass("btn-success")){
                item.quantity++;
            }
            if($(this).hasClass("btn-danger")){
                if(item.quantity > 1){
                    item.quantity--;
                }
                else{
                    removeFromCart(CartItemName);
                }
            }
            updateCart();
        }
    }
}