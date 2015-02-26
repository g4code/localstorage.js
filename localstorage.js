;(function() {

    var LocalStorage = function(){};

    LocalStorage.prototype = {

        namespace: "G4",

        clear: function()
        {
            localStorage.clear();
        },

        get: function(key)
        {
            return localStorage.getItem(this.getNamespacedKey(key)) == "undefined" ||
                localStorage.getItem(this.getNamespacedKey(key)) == undefined ?
                null :
                JSON.parse(localStorage.getItem(this.getNamespacedKey(key)));
        },

        getNamespacedKey: function(key)
        {
            return this.namespace + "." + key;
        },

        has: function(key)
        {
            return localStorage.getItem(this.getNamespacedKey(key)) !== null;
        },

        isSupported: function()
        {
            return window.localStorage !== undefined;
        },

        remove: function(key)
        {
            localStorage.removeItem(this.getNamespacedKey(key));
        },

        set: function(key, value)
        {
            this.isSupported() &&
            localStorage.setItem(this.getNamespacedKey(key), JSON.stringify(value));
        }
    };

    if (typeof define != 'undefined' && define.hasOwnProperty('amd') && define.amd) { // RequireJS AMD
        define(function(){
            return LocalStorage;
        });
    } else if (typeof window != 'undefined') { // Fall back to attaching to window
        window.G4 = typeof G4 != "undefined" ? G4 : {};
        window.G4.LocalStorage = LocalStorage;
    };

}).call(this);