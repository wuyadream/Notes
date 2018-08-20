/**
 * created by wuyadream on 2018/08/20
 */

/* function inArray(arr, target) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === target) {
			return i;
		}
	}
	return -1;
}

function Pub() {
	this._sub = {},
	this.subscribe = function(type, callback) {
		this._sub.type = this._sub.type || [];
		if (inArray(this._sub.type, callback) < 0) {
			this._sub.type.push(callback);
		}
    },
    this.unsubscribe = function(type, callback) {
        if(!this._sub.type) {
            return false;
        }
        var index = inArray(this._sub.type, callback);
        if(index >= -1) {
            this._sub.type.splice(index, 1);
        }
    },
	this.public = function(type, event) {
        event.type = type;
		if (this._sub.type) {
            this._sub.type.forEach(function(item, index) {
                item(event);   
            });
		}
	}
}

var pub1 = new Pub();

var sale = function(event) {
    console.log('小红,'+event.type +'特卖了，价格为' + event.price);
}

var sale2 = function(event) {
    console.log('小明,'+event.type +'特卖了，价格为' + event.price);
}

pub1.subscribe('sale', sale);
pub1.subscribe('sale', sale2);

pub1.public('裙子', {
    price: 199
});

pub1.unsubscribe('sale', sale);


pub1.public('裙子', {
    price: 199
}); */


for (var i = 1; i <= 5; i++) {

    setTimeout( function timer() {
  
        console.log('------');
        console.log(i);
  
    }, 1000 );
  
}








