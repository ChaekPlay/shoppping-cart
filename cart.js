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
        let element = $('<p class="item"></p>').html('<button class="btn btn-success">+</button><button class="btn btn-danger">-</button>'+item.name+' '+item.quantity+' '+itemTotalPrice.toFixed(2));
        element.appendTo(shoppingCartContainer);
        overallNum += itemTotalPrice;
    }
    let overall = $('<p>Total: '+overallNum.toFixed(2)+'</p>');
    overall.appendTo(shoppingCartContainer);
}