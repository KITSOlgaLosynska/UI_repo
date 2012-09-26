/*global $ */
$.rm({
    name: "darwin.page.category",
    dependencies: ["darwin.common","darwin.modules.slider"],
    impl: function () {
        return {
            init: function () {
                darwin.instances.carousel = new darwin.modules.slider({id:'.category-carousel'});
                
                //Remove alt attributes
                $("img", ".category-list").each(function(){
                    $(this).attr("alt", "");
                });
                
                $("img", ".category-list").each(function(){
                    $(this).bind('click', function(e) {
                        window.location = ($("a", $(this).prev())).attr("href");
                    });
                });
            }
        };
    }
});