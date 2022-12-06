module.exports = function Cart(oldCart){
    this.items =oldCart.items;
    this.totalQty =oldCart.totalQty;
    this.totalPrice =oldCart.totalPrice;


    //add new item to the cart
    this.add =function(item,id){
        var storedItem = this.item[id];
        if(!storedItem){
            storedItem = this.items[id] ={item:item, qty:0, price:0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price*storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;
    }
    //gives cart items as array
    this.generateArray = function(){
        var arr =[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
    }
};