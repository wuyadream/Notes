/**
 * created by wuyadream on 2018/08/07
 */

 // 定义router对象
function Router() {
    this.currentUrl = '';
    this.routes = {};
}

Router.prototype.route = function (path, callback) {
    this.routes[path] = callback || function () {};
}

Router.prototype.refresh = function () {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
}

Router.prototype.init = function () {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}

// 创建实例
var route = new Router();
route.init();
route.route('/', changeContent.bind(null, '/'));
route.route('/route1', changeContent.bind(null, '/route1'));
route.route('/route2', changeContent.bind(null, '/route2'));

function changeContent(text) {
    var el = document.getElementById('hash');
    el.innerHTML = text;
}