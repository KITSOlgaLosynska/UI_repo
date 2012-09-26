/*global $ */
$.rm({
    name: 'darwin.page.header',
    dependencies: [  'darwin.common',
                     'darwin.modules.popup',
                     'darwin.modules.lightbox'],  
    impl: function () {
    	return {
    		init: function () {
               //initialization of page related objects
      			
      			darwin.instances.miniBasketPopup = new darwin.modules.popup({
              modal:false,
      				content:{
                moveContent : true,
      					container : '.mini-basket .mini-basket-popup-content'
      				},
      				selectors :{
      					triggerer:'.mini-basket-triggerer',
      					window: '.mini-basket .popup'
      				}
      			});
               
   			}
  		};
	}
});