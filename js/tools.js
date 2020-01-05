//定义一个函数，用来向一个元素中添加指定的class属性值
/**
 * 参数：
 * 	id 要添加class属性的元素
 *	cn 要添加的class的值
 */
function addClassName(id, cn) {
	//检查id中是否含有cn
	if (!hasClass(id, cn)) {
		id.className += " " + cn;
	}
};



//判断一个元素中是否含有属性值
/**
 * 参数：
 * 	id 要添加class属性的元素
 *	cn 要添加的class的值
 */
function hasClass(id, cn) {
	//判断id中有没有cn的这个className
	//创建一个正则表达式
	//var reg = /\b[cn]\b/;
	var reg = new RegExp("\\b" + cn + "\\b");
	return reg.test(id.className);
};



//删除一个元素中指定的clas
function removeClass(id, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");
	id.className = id.className.replace(reg, "");
};



/**
 * @param {Object} id
 * @param {Object} cn
 * 可以用来切换一个类，
 * 如果元素中具有该类，则删除
 * 如果元素中没有该类，则添加
 */
function toggleClass(id, cn) {
	//判断id中是都含有cn
	if (hasClass(id, cn)) {
		removeClass(id, cn);
	} else {
		addClassName(id, cn);
	}
};

//点击事件封装
function myClick(id, fun) {
	id.onclick = fun;
};


//写一个所有浏览器支持的方法
/**
 * 参数：
 * 		obj要获取样式的元素
 * 		name 要获取的样式名
 * 
 */
function getStyle(obj, name) {
	//正常浏览器的方式
	//推荐使用这种情况
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currenStyle[name];
	}
};

//创建一个可以执行简单动画的函数
/**
 * @param {Object} 
 * 参数：
 * id  执行动画的对象
 * attr：要执行的动画样式
 * speed 执行速度
 * target  执行动画的目标大小
 * callback:回调函数，这个函数将会在我们动画执行完毕以后执行
 * 		
 */
//移动动画的封装函数
function move(id, target, speed, attr, callback) {
	clearInterval(id.timer);
	//获取box1原来值
	var current = parseInt(getStyle(id, attr));
	/**
	 * 判断正负值
	 * 如果从0向800移动，则speed为正
	 * 如果从800向0移动，则speed为负
	 */
	if (current > target) {
		//此时速度应为负值
		speed = -speed;
	}
	//开启一个定时器,执行动画效果
	//保存自己的timer
	id.timer = setInterval(function() {
		//获取box1原来值
		var oldValue = parseInt(getStyle(id, attr));
		//设置一个新值
		var newValue = oldValue + speed;
		//判断是否大于八百
		if (speed < 0 && newValue < target || speed > 0 && newValue > target) {
			newValue = target;
		}
		//将新值设置给box1
		id.style[attr] = newValue + "px";

		//当元素移动到了target px时，使其停止
		//当我们向左移动时，需要newValue是否小于target
		if (newValue == target) {
			clearInterval(id.timer);
			//动画执行完毕调用回调函数
			callback && callback();
		}
	}, 30);
};

//兼容性函数
/**
 * @param {Object} obj 执行函数的id名
 * @param {Object} eventStr 执行函数的事件效果,例如click,mousemove,去掉on
 * @param {Object} callback 回调函数
 */
function bind(obj, eventStr, callback) {
	if (obj.addEventListener) {
		//大部分浏览器兼容方式
		obj.addEventListener(eventStr, callback, false);
	} else {
		//考虑this
		/**
		 * callback.call(obj)
		 */
		//IE8以下
		obj.attachEvent("on" + eventStr, function() {
			//在匿名函数中调用回调函数
			callback.call(obj);
		});
	}
};
