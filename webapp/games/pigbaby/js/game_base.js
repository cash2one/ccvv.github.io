var BASE_RES_DIR = "../";
var RES_DIR = "";
var APP_DEPLOYMENT = "WEB";
var USE_NATIVE_SOUND = !1;
var USE_NATIVE_SHARE = !1;
var IS_IOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
var IS_ANDROID = -1 < navigator.userAgent.indexOf("Android");
var IS_NATIVE_ANDROID = IS_ANDROID && -1 < navigator.userAgent.indexOf("Version");
var IS_REFFER =true;
var SHOW_LLAMA = !0; 
var SHOW_COPYRIGHT = !1;
var IN_WEIXIN = !1;
var  IS_SUB = !1;
var  best = -10000;
score = 0; 
record_flag = !1; 
logFlag = !1;
keyStorage = "bestball";
function initBest() {
	best = gjStorage.get(keyStorage) || -10000;
}
function cacheBest(a) {
	a > best && (best = a, gjStorage.set(keyStorage, best));
}
function onNewScore(score) {
   
    $("#scorehide").val(score);
	cacheBest(score);
	//dp_submitScore(score,score);	
}
(function (a, b) {
	a.get = function (a) {
		if(localStorage){
			return localStorage.getItem(a);
		}
		return 0;
		
	};
	a.set = function (a, b) {
		if(localStorage){
			localStorage.setItem(a,b);
		}		
		return !0;
	};
})(window.gjStorage = window.gjStorage || {});

$(function(){
	initBest();
})

