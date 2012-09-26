/*global $ */
$.rm({
    name: "darwin.page.registration",
    dependencies: ["darwin.common", "darwin.modules.addressFinder", "darwin.modules.popup"],
    impl: function () {
        return {
            init: function () {

                //for fancy forms uncomment the following line and add back this dependency: "darwin.modules.form"
                //darwin.instances.registrationForm = new darwin.modules.form({id:'.registration-form'});
                
                darwin.instances.addressFinderPopup = new darwin.modules.popup({
                    modal: false,
                    content:{
                     moveContent: true,
                     container : '.address-finder-popup-wrap',
                     wrapper : '<form id="address-finder-popup" class="address-finder-popup g9"></form>',
                     wrapperTag: 'form'
                    },
                    selectors :{
                     triggerer:'#ui_addr-srch-btn',
                     window: '.address-finder .popup'
                    }
                });
                
                $(darwin.instances.addressFinderPopup).bind("popupOpened", function(){
                    darwin.instances.addressFinderHandler = new darwin.modules.addressFinder({id:'.address-finder-popup', popupObj: darwin.instances.addressFinderPopup});
                    $(".addr-list", "#address-finder-popup").hide();
                    
                    //for fancy forms uncomment the following line and add back this dependency: "darwin.modules.form"
                    //darwin.instances.addressFinderForm = new darwin.modules.form({id:'.address-finder-popup'});
                    
                });
                
            }
        };
    }
});