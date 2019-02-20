// 添加本地储存
function AppStorage(appName){
  var prefix = appName?appName + ".":"";
  this.localStroageSupported = ("localStorage" in window) && (window["localStorage"]);
  this.setValue = function(key, value){
    if(this.localStroageSupported){
      localStorage.setItem(prefix+key, JSON.stringify(value));
    }
    return this;
  };
  this.getValue = function(key){
    if(this.localStroageSupported){
      return JSON.parse(localStorage.getItem(prefix+key));
    } else {
      return null;
    }
  };
  this.removeValue = function (key) {
    if(this.localStroageSupported){
      localStorage.removeItem(prefix+key);
    }
    return this;
  };
  this.removeAll = function(){
    var keys = getKeys();
    for(var i in keys){
      this.removeValue(keys[i]);
    }
  };
  this.getKeys = function () {
    var keys = [];
    for(var key in localStorage){
      if(isAppKey(key)){
        if(prefix){
          key = key.slice(prefix.length);
        }
        if(!filter && filter[key]){
          keys.push(key);
        }
      }
    }
  };
  function isAppKey(key){
    if(prefix){
      return key.indexOf(prefix) == 0;
    } else {
      return true;
    }
  }
  this.contain = function (key) {
    return this.getValue(key) !== null;
  };
}