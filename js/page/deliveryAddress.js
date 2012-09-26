/*global $ */
$.rm({
    name: "darwin.page.deliveryAddress",
    dependencies: ["darwin.common", "darwin.modules.popup"],
    impl: function () {
        return {
            init: function () {
                //For fancy forms, uncomment the below line
                //darwin.instances.deliveryAddressForm = new darwin.modules.form({id:'.delivery-address-form'});
                
                darwin.instances.changeAddressPopup = new darwin.modules.popup({
                    modal: false,
                    content:{
                        moveContent : true,
                        container : '.change-address-popup-wrap',
                        wrapper : '<form id="ui_change-address-popup" class="change-address-popup g8"></form>',
                        wrapperTag:'form'
                    },
                    selectors :{
                        triggerer:'.add-new-address',
                        window: '.delivery-address-form .popup'
                    }
                });
                
             
                $(darwin.instances.changeAddressPopup).bind("popupOpened", function(){
                    var self = this;
                    //For fancy forms, uncomment the below line
                    //darwin.instances.changeAddressForm = new darwin.modules.form({id:'.change-address-popup'});
                    
                    //For editing uncomment the below two each iterations
                    /*
                    $("input[type=text]", "#ui_change-address-popup").each(function(index) {
                        $(this).val($("." + $(this).attr("id"), $(self.getTriggererEvent().currentTarget).parent().parent() ).text());
                    });
                    
                    $("select", "#ui_change-address-popup").each(function(index) {
                        $(this).val($("." + $(this).attr("id"), $(self.getTriggererEvent().currentTarget).parent().parent() ).text());
                    });
                    */
                    
                });
                
                $("#ui_close-window").live('click', function(e) {
                      e.preventDefault();
                    if( darwin.instances.changeAddressPopup.isOpened()){
                        darwin.instances.changeAddressPopup.close();
                    }
                });
                
                $("#ui_use-address").live('click', function(e) {
                
                    //For editing uncomment the below two each iterations
                    /*
                    $("input[type=text]", "#ui_change-address-popup").each(function(index) {
                        $($("." + $(this).attr("id"), $(darwin.instances.changeAddressPopup.getTriggererEvent().currentTarget).parent().parent())).text( $(this).val() );
                    });
                    
                    $("select", "#ui_change-address-popup").each(function(index) {
                        $($("." + $(this).attr("id"), $(darwin.instances.changeAddressPopup.getTriggererEvent().currentTarget).parent().parent())).text( $(this).val() );
                    });
                     */
                    
                    $("input[type=text]", "#ui_change-address-popup").each(function(index) {
                        $($("." + $(this).attr("id"))).text( $(this).val() );
                    });
                    
                    $("select", "#ui_change-address-popup").each(function(index) {
                        $($("." + $(this).attr("id"))).text( $(this).val() );
                    });
                    
                    $(".delivery-address-form table").show();
                   
                    $('#ui_flat-number-house-name_h').val($('#ui_flat-number-house-name','#ui_change-address-popup').val());
                    $('#ui_house-number_h').val($('#ui_house-number','#ui_change-address-popup').val());
                    $('#ui_address1_h').val($('#ui_addr-line-1','#ui_change-address-popup').val());
                    $('#ui_address2_h').val($('#ui_addr-line-2','#ui_change-address-popup').val());
                    $('#ui_city_h').val($('#ui_town-city','#ui_change-address-popup').val());
                    $('#ui_county_h').val($('#ui_county','#ui_change-address-popup').val());
                    $('#ui_postCode_h').val($('#ui_postcode','#ui_change-address-popup').val());
                    $('#ui_country_h').val($('#ui_country','#ui_change-address-popup').val());
                    $('#ui_addressRef_h').val($('#ui_addr-ref-nick','#ui_change-address-popup').val());
                    $('#ui_contactName_h').val($('#ui_contact-name','#ui_change-address-popup').val());
                    $('#ui_contactPhone_h').val($('#ui_contact-phone','#ui_change-address-popup').val());
                    
                    
                    if ($("#ui_parking-yes:checked").length) {
                        $('#ui_parking_h').val("true");
                    } else {
                        if ($("#ui_parking-no:checked").length) {
                            $('#ui_parking_h').val("false");
                        }
                    }
                    
                    if ($("#ui_bus-yes:checked").length) {
                        $('#ui_bus_h').val("true");
                    } else {
                        if ($("#ui_bus-no:checked").length) {
                            $('#ui_bus_h').val("false");
                        }
                    }
                    
                    if ($("#ui_stairs-yes:checked").length) {
                        $('#ui_stairs_h').val("true");
                    } else {
                        if ($("#ui_stairs-no:checked").length) {
                            $('#ui_stairs_h').val("false");
                        }
                    }
                                  
                    if( darwin.instances.changeAddressPopup.isOpened()){
                        darwin.instances.changeAddressPopup.close();
                    }
                    if( darwin.instances.editAddressPopup.isOpened()){
                        darwin.instances.editAddressPopup.close();
                    }
                    
                });
            }
        };
    }
});