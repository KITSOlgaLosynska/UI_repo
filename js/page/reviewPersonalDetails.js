/*global $ */
$.rm({
    name: 'darwin.page.reviewPersonalDetails',
    dependencies: [  'darwin.common',
                     'darwin.modules.toggle',
                     'darwin.modules.accordion',
                     'darwin.modules.popup',
                     'darwin.modules.form',
                     'darwin.modules.formSelect',
                     'darwin.modules.addressFinder'],
    impl: function () {
        return {
            init: function () {
               //initialization of page related objects
               darwin.instances.form = new darwin.modules.form({id:'.personal-deatails-mainform'});
               darwin.instances.tradeAccordion = new darwin.modules.accordion();
               darwin.instances.tradeToggler = new darwin.modules.toggle({id:'.toggle'});
               
               darwin.instances.tradePopup = new darwin.modules.popup({
                 modal: false,
                   content:{
                     moveContent : true,
                       container : '.tradeassoc-accordion-wrap',
                       wrapper : '<form name="tradeassoc-accordion-form" method="post" class="tradeassoc-accordion-form g8 nomargin"><div></div><input type="submit" class="personal-details-tradeassoc-submit closer" value="Add and continue"/></form>',
                       wrapperTag:'form'
                   },
                   
                   selectors :{
                     triggerer:'.trade-association .popup-triggerer',
                     window: '.trade-association .popup'
                   }
                });
               //Page specific form element behaviour
               $('.lightbox-window .tradeassoc-accordion-wrap input[type=checkbox]').live('click',function(e){
                 // console.log();
                  var elem =  e = e.currentTarget;
                  if(!$(elem).attr('checked')||$(elem).parent().hasClass('checked')){
                     $(elem).closest('.toggle').find('.toggleable input[type=text]').attr('value','');
                     if ($.browser.msie  && parseInt($.browser.version, 10)<9) {
                   
                       darwin.instances.tradeToggler.close($(elem));
                     }
                  }
               });

               //Page  specific behavioural settings of popup related elements
               $(darwin.instances.tradePopup).bind('popupOpened',function(){
                  darwin.instances.popupForm = {};
                 
                  $('.lightbox-window .tradeassoc-accordion-wrap input[type=text]').each(function(i,elem){
                    $('.trade-associations-list .value').each(function(j,html_elem){
                       if($(html_elem).hasClass($(elem).attr('id'))){

                          var checkBox = $('.toggler input[type=checkbox]',$(elem).closest('.toggle'));
                          //checking the checkbox
                          if ($.browser.msie){
                            
                            checkBox.get(0).checked = true;      
                           }   
                           
                          //opening the first element related accordion panel

                        darwin.instances.tradeAccordion.openPanel($(elem).closest('.accordion-panel').prev());
                       }; 
                    });
                  });

                  darwin.instances.popupForm = new darwin.modules.form({id:'.tradeassoc-accordion-wrap'});
               });

               //binding to popup close
               $(darwin.instances.tradePopup).bind('popupClosed',function(){
                  $('.trade-associations-list').empty();
                  //refreshing the list
                  $('.lightbox-window .tradeassoc-accordion-wrap input[type=text]').each(function(i,elem){
                     if ($(elem).val()){  
                        $('.trade-associations-list').append('<li>'+$(elem).closest('.toggle').find('.toggler label').text()
                           +'<span>Membership no. <span class="value '+$(elem).attr('id')+'">'+$(elem).val()+'</span></span></li>');
                     };
                  });
                  //refreshing triggerer button text
                   if($('.trade-associations-list .value').length > 0){
                     $('.popup-triggerer .text').text('Add/Edit trade association');
                  }else{
                     $('.popup-triggerer .text').text('Add trade association');
                  }
               });
               
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