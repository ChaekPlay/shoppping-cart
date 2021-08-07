$("button").click(addToCart);
let shoppingCart = [];
let shoppingCartContainer = $(".cart");
function addToCart(){
    let curProduct = {};
    curProduct.name = $(this).siblings("h2").eq(0).html();
    curProduct.price = parseFloat($(this).siblings("p").find("span").eq(0).html());
    curProduct.quantity = 1;
    let inCart = false;
    console.log(curProduct.name,' ',curProduct.price);
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


function updateCart(){
    shoppingCartContainer.empty();
    let overallNum = 0;
    for(let item of shoppingCart){
        let itemTotalPrice = item.price*item.quantity;
        let element = $('<p class="item"></p>').html('<button class="btn btn-success">+</button><button class="btn btn-danger">-</button>'+'<span>'+item.name+'</span> '+item.quantity+' '+itemTotalPrice.toFixed(2));
        element.appendTo(shoppingCartContainer);
        /*element.addClass("current");
        $(".current").click(changeQuantity);
        element.removeClass("current");*/
        overallNum += itemTotalPrice;
    }
    $(".item button").click(changeQuantity);
    let overall = $('<p>Total: '+overallNum.toFixed(2)+'</p>');
    overall.appendTo(shoppingCartContainer);
}

function removeFromCart(CartItemName){
    for(let item of shoppingCart){
        if(item.name == CartItemName){
            let itemIndex = shoppingCart.indexOf(item);
            console.log(itemIndex);
            shoppingCart.splice(itemIndex,1);
            break;
        }
    }
}

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