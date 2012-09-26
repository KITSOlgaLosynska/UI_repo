$.rm({
    name: "darwin.common",
    impl: function (config) {
        return {
            init: function () {
                darwin.instances = darwin.instances || {};
                $(".js-visible").show();
                $(".js-hidden").hide();
            }
        };
    }
});
