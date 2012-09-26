/**
 * Form validator module
 * 
 */
$.rm({
    name : "darwin.modules.formValidator",
    impl : function() {
        /* Constructor */
        var Validator = function(settings) {
            this.config = {
                "v-notblank": /^\s*\S.*$/,
                "v-email": /(^[a-z]([a-z_\.]*)@([a-z_\.]*)([.][a-z]{3})$)|(^[a-z]([a-z_\.]*)@([a-z_\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i,
                "v-numeric": /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/,
                "v-integer": /(^-?\d\d*$)/,
                "v-ukpostcode": /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKPS-UW]) [0-9][ABD-HJLNP-UW-Z]{2})/,
                "v-alphabetic": /^([a-zA-Z ]+)$/,
                "v-issue-number": /^[0-9]{1,2}$/,
                "v-cvv-amex": /^[0-9]{4}$/,
                "v-cvv-visa-mastercard": /^[0-9]{3}$/
            };
            $.extend(true, this.config, settings || {});
            this.$ = {};
            this._loadObjects(true);
            this._init();
            this._bindEvents();
        };
        
        Validator.prototype.isValid = function(formObject) {
            var self = this,
                failedTests = new Array(),
                formObjectClass = $(formObject).attr("class");
            
            if (formObjectClass) {
                $.each(formObjectClass.split(" "), function(i,v) {
                    v = v.toLowerCase();
                    if (self.config[v]) {
                        if (!self.config[v].test($(formObject).val())) {
                            failedTests.push(v);
                        }
                    }
                });
            }
            
            
            return failedTests;
        };

        /* Methods */
        Validator.prototype._init = function() {
            
        };

        Validator.prototype._bindEvents = function() {};

        Validator.prototype._loadObjects = function(unique) {
            var key = null;
            for (key in this.config.selectors)
                if (this.config.selectors.hasOwnProperty(key)) {
                    if (unique) {
                        this.config.selectors[key] = this.config.id + " "
                                + this.config.selectors[key];
                    }
                    var obj = this.config.selectors[key];
                    this.$[key] = $(obj);
                }
        };

        return Validator;
    }
});