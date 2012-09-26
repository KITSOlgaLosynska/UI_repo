(function ($) {
    var modules = {},
        defaultModule = {
            impl: function () {return {};},
            dependencies: []
        },
        DEF_CONSTR = Object.prototype.constructor;
    
    Object.getReferenceToNestedName = function (name) {
        var names = name.split(".");
        for (var i = 0, nl = names.length, cObj = window; i < nl && (cObj = cObj[names[i++]]);) {}
        return cObj || null;
    };
    
    Object.getKeys = function (obj) {
        var keys = [];
        
        for (var cKey in obj) if (obj.hasOwnProperty(cKey)) {
            keys.push(cKey);
        }
        
        return keys;
    };


    function isModuleLoaded(name) {
        return Object.getReferenceToNestedName(name) !== null;
    }

    function setObjectPath(name, value) {
        var names = name.split(".");
        for (var i = 0, nl = names.length - 1, cObj = window, nextObj; i < nl; i++) {
            nextObj = cObj[names[i]];
            if (nextObj === undefined) {
                nextObj = {};
                cObj[names[i]] = nextObj;
            }
            cObj = nextObj;
        }
        cObj[names[i]] = value;
        return value;
    }
    
    $.extend({
        rm: function(module) {
            if (!module.name) {
                throw("rm: setting a module name is mandatory!");
            }
            if (modules.hasOwnProperty(module.name)) {
                throw("rm: namespace collision: module "  + module.name + " already registered!");
            }
            modules[module.name] = $.extend({}, defaultModule, module);
        },

        lm: function(moduleName) {
            if (!isModuleLoaded(moduleName)) {
                if (!modules[moduleName]) {
                    throw ("lm: unregistered module name: " + moduleName);
                }
                var module = setObjectPath(moduleName, modules[moduleName].impl(moduleName));
                if (!module) {
                    log("lm: module construction failure " + moduleName + " implCallback did not return the module object!");
                }
                if ($.isFunction(module.preInit)) {
                    module.preInit();
                    delete module.preInit;
                }
                $.map(modules[moduleName].dependencies, function (e) {
                    $.lm(e);
                });
                if ($.isFunction(module.init)) {
                    module.init();
                    delete module.init;
                }
            }
        },
        ec: function (supC, ovr, ocon) {
            var constructor = ocon || ovr.constructor,
            subC = constructor !== DEF_CONSTR ?
                constructor :
                function () {
                    supC.apply(this, arguments);
                },
            supCl = function () {},
            subCP,
            supCP = supC.prototype;
            
        supCl.prototype = supCP;
        subCP = subC.prototype = new supCl();
        subCP.constructor = subC;
        subC.superclass = supCP;

        if (supCP.constructor === DEF_CONSTR) {
            supCP.constructor = supC;
        }
        $.map(Object.getKeys(ovr), function (method) {
            subCP[method] = ovr[method];
        });
        return subC;     
    }
    });
})(jQuery);
