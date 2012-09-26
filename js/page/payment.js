/*global $ */
$.rm({
    name: "darwin.page.payment",
    dependencies: ["darwin.common", "darwin.modules.popup", "darwin.modules.expandableBlock", "darwin.modules.form"],
    impl: function () {
        return {
            init: function () {
				/*ie fixes*/
    			$('.lt-ie8 .progress-bar li.next.arrow,.lt-ie8 li.completed,.lt-ie8 li.current, .lt-ie8 .order-summary .title a, .lt-ie8 div.input-text .input.text, .lt-ie8 .invalid .message, .lt-ie8 .incorrect .message, .lt-ie9 .notification .message').append($(document.createElement('div')).addClass('after'));
    			$('.lt-ie8 li.completed, .lt-ie8 .payment-action-buttons a, .lt-ie8 .payment-action-buttons .input.submit, .lt-ie8 .payment-form .select, .lt-ie8 div.input-text .input.text, .lt-ie8 .address-finder-popup-wrap .input.button, .lt-ie8 .invalid .message, .lt-ie8 .incorrect .message, .lt-ie9 .notification .message').prepend($(document.createElement('div')).addClass('before'));
				
				//open-close block
				darwin.instances.cartDetails = new darwin.modules.expandableBlock({
					id : '#ui_expandable_box',
					selectors : {
						opener: 'a.open-close',
						expArea :'div.expandable-box'
					},
					showText: 'Show itemised billing',
					hideText: 'Hide itemised billing',
					forIE:true,
					speed: 500
				});
				
                //For fancy forms, uncomment the below line
                darwin.instances.paymentForm = new darwin.modules.form({id:'.payment-form'});
                
				darwin.instances.securityCodePopup = new darwin.modules.popup({
                    modal: false,
                    content:{
                        moveContent : true,
                        container : '.security-code-popup-wrap',
                        wrapper : '<form id="ui_security-code-popup" class="payment-popup small-popup"></form>',
                        wrapperTag:'form'
                    },
                    selectors :{
                        triggerer:'.security-number .help a',
                        window: '.security-code-popup'
                    }
                });
				
                darwin.instances.changeAddressPopup = new darwin.modules.popup({
                    modal: false,
                    content:{
                        moveContent : true,
                        container : '.change-address-popup-wrap',
                        wrapper : '<form id="ui_change-address-popup" class="payment-popup"></form>',
                        wrapperTag:'form'
                    },
                    selectors :{
                        triggerer:'#ui_change-address',
                        window: '.popup'
                    }
                });
                
                //For fancy forms, uncomment the below line
                $(darwin.instances.changeAddressPopup).bind("popupOpened", function(){
                    darwin.instances.changeAddressForm = new darwin.modules.form({id:'.payment-popup'});
					darwin.instances.addressFinderPopup = new darwin.modules.popup({
						modal: false,
						content:{
							moveContent : true,
							container : '.address-finder-popup-wrap',
							wrapper : '<form id="ui_address-finder-popup" class="payment-popup"></form>',
							wrapperTag:'form'
						},
						selectors :{
							triggerer:'.popup-buttons a.find-address',
							window: '.address-finder-popup'
						}
					});
                });
                $("#ui_close-window, .popup-buttons a.find-address").live('click', function(e) {
                    darwin.instances.changeAddressPopup.close();
                    e.preventDefault();
                });
                
                $(".review-order", ".payment-action-buttons").bind('click', function(e) {
                    $(darwin.instances.paymentForm.config.id).submit();
                });
				$(".payment-details .help a").bind('mouseover', function(e) {
					$(this).click();
                });
				if($("#ui_card-type").val() == 'TradeUK card'){
					$('.start-date, .input-text:has(#ui_issue-number), .input-text:has(#ui_security-number), .input-checkbox-save').hide();
				}else{
					$('.start-date, .input-text:has(#ui_issue-number), .input-text:has(#ui_security-number), .input-checkbox-save').show();
				}
				$("#ui_card-type").bind('change', function(){
					if($("#ui_card-type").val() == 'TradeUK card'){
						$('.start-date, .input-text:has(#ui_issue-number), .input-text:has(#ui_security-number), .input-checkbox-save').hide();
					}else{
						$('.start-date, .input-text:has(#ui_issue-number), .input-text:has(#ui_security-number), .input-checkbox-save').show();
					}
				})
                
            }
        };
    }
});