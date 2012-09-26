/*global $ */
$.rm({
    name: 'darwin.page.checkoutOrderSummary',
    dependencies: ['darwin.common', 'darwin.modules.expandableBlock', 'darwin.modules.form'],
    impl: function () {
    	return {
    		init: function () {
               /*ie fixes*/
    			$('.lt-ie8 .progress-bar li.arrow,.lt-ie8 li.completed,.lt-ie8 li.current, .lt-ie8 .your-basket span.grey-button a, .lt-ie8 .your-basket table tr.header th .icon, .lt-ie8 .checkout-order-summary div.input-text .input.text').append($(document.createElement('div')).addClass('after'));
    			$('.lt-ie8 li.completed, .lt-ie8 .checkout-order-summary header, .lt-ie8 .checkout-order-summary header h2, .lt-ie9 .your-basket table tr.product td.delivery div.wrap, .lt-ie8 .your-basket table tr.product td.image div.wrap, .lt-ie8 .checkout-order-summary  div.input-text .input.text, .lt-ie8 .button-holder .input.submit, .lt-ie8 .checkout-order-summary .back-button a').prepend($(document.createElement('div')).addClass('before'));

               //open-close block
				darwin.instances.cartDetails = new darwin.modules.expandableBlock({
					id : '.your-basket',
					selectors : {
						opener: 'span.open-close a',
						expArea :'div.expandable-box'
					},
					showText: 'Show details',
					hideText: 'Hide details',
					forIE:true,
					speed: 500
				});
				
				//For fancy forms, uncomment the below line
                darwin.instances.orderSummaryForm = new darwin.modules.form({id:'.order-summary-form'});
   			}
  		};
	}
});