/*global $ */
$.rm({
    name: "darwin.page.productDetails",
    dependencies: ["darwin.common","darwin.modules.tabs","darwin.modules.slider"],
    impl: function () {
        return {
            init: function () {
                
                darwin.instances.sliderBundle = new darwin.modules.slider({id:'.slider-bundle'});
                darwin.instances.sliderSecond = new darwin.modules.slider({id:'.slider-second'});
                
                //For fancy forms, uncomment the below line and add "darwin.modules.form" as a dependency
                //darwin.instances.variationsForm = new darwin.modules.form({id:'.variations-form'});
            }
        };
    }
});