/**
 * 缓存数据优化
 * @type {String}
 */
var postfix = '_xjsU'; // 缓存前缀

/**
 * 设置缓存 
 * @param  {[type]} k [键名]
 * @param  {[type]} v [键值]
 * @param  {[type]} t [时间、单位秒]
 */
function set(k, v, t) {
    localStorage.setItem(k,JSON.stringify(v));
	var seconds = parseInt(t);
	if (seconds > 0) {
		var timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000 + seconds;
        localStorage.setItem(k + postfix, timestamp + "")
	} else {
        localStorage.removeItem(k + postfix)
	}
}

/**
 * 获取缓存 
 * @param  {[type]} k   [键名]
 * @param  {[type]} def [获取为空时默认]
 */
function get(k, def) {
    var deadtime = parseInt(localStorage.getItem(k + postfix)) 
    if (deadtime) {
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
            if (def) {
                return def;
            } else {
                return false;
            }
        }
    }
    var res = localStorage.getItem(k);
    if (res) {
        return JSON.parse(res);
    } else {
        if (def == undefined  || def == "") {
            def = false; 
        }
        return def;
    }
}

function remove(k) {
    localStorage.removeItem(k);
    localStorage.removeItem(k + postfix);
}

/**
 * 清理所有缓存
 * @return {[type]} [description]
 */
function clear() {
    localStorag.clear();
}

module.exports = {
    set: set,
    get: get,
    remove: remove,
    clear: clear
}