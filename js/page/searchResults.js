/*global $ */
$.rm({
    name: "darwin.page.searchResults",
    dependencies: ["darwin.common"],
    impl: function () {
        return {
            init: function () {
                
                //Remove alt attributes
                $("img", ".product-list-wrapper").each(function(){
                    $(this).attr("alt", "");
                });
                
                $("img", ".product-list-wrapper").each(function(){
                    $(this).bind('click', function(e) {
                        window.location = ($("a.title", $(this).parent())).attr("href");
                    });
                });
            }
        };
    }
});