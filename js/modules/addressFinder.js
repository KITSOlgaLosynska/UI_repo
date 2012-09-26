/**
* Address finder module
* 
*/
$.rm({
  name: "darwin.modules.addressFinder",
  impl: function () {
       /*Constructor*/ 
       var AddressFinder = function (settings){
             this.config = {
                 enableFindingFeature: true,
                 selectors: {
                     updateButton: "#ui_addr-update",
                     enterAddressManually: "#ui_addr-manual",
                     addressSelect: "#ui_select-addr",
                     findAddressButton: "#ui_find-address",
                     searchAddressButton: "#ui_addr-srch-btn"
                 }
             };
              $.extend(true,this.config, settings || {});
              this.$ = {};
              this._loadObjects(true);
              this._bindEvents();
           };
           
           /*Methods*/
   
           AddressFinder.prototype._bindEvents = function(){
               var self = this;
               
               this.$.findAddressButton.bind('click', function() {
                   $.proxy( self.findAddressAjaxCall(), self );
               });
               
               this.$.updateButton.bind('click', function() {
                   if ($("option:selected", $(self.$.addressSelect)).length) {
                       $.proxy( self.updateAddressAjaxCall(), self );
                   }
               });
               
               this.$.enterAddressManually.bind('click', function(e) {
                   self.config.popupObj.close();
                   e.preventDefault();
               });
               
           };
           
           AddressFinder.prototype.findAddressAjaxCall = function(){
         
               var houseName = $("#ui_house-num-name").val(),
               postCode = $("#ui_postcode-srch-popup").val(),
               $errorContainer = $(".address-finder-popup-wrap .error ul"),
               $countryCode = $("#ui_countrycode").val(),
               componentValue = '{"name": "locationManager", "method": "searchForAllAddresses", "params": ["'+ houseName +'", "' +postCode+ '", "' + $countryCode + '"]}',
               self = this;
               
               $.ajax({
                   url:"/kf/kf-customer/panels/ajaxAddressLocation.jsp",
                   data: {component:componentValue},
                   success:function(data){
                       var res;
                       if (data) {
                           res = typeof(data) === 'string' ? $.parseJSON(data) : data;
                           if (res.data) {
                               $(self.$.addressSelect).empty();
                               //$('#ui_select-addr').empty();
                               $.each(res.data, function(i, v) { 
                                   $(self.$.addressSelect).append('<option value="' + v.id + '">' + v.addressLine + '</option>'); 
                               });
                               
                               if (!res.data.length) {
                                   $(self.$.updateButton).hide();
                               } else {
                                   $(self.$.updateButton).show();
                               }
                               
                               $("#address-finder-popup .addr-list").show();
                           } else if (res.customErrors) {
                               $errorContainer.empty();
                               $.each(res.customErrors, function(i, v) { 
                                   $errorContainer.append("<li>" + v + "</li>"); 
                               });
                               $errorContainer.parent().show();
                           }
                       }
                   }
               });
               $errorContainer.parent().hide();
           };
           
           AddressFinder.prototype.updateAddressAjaxCall = function(){
               var self = this,
                   $errorContainer = $(".address-finder-popup-wrap .error ul"),
                   componentValue = '{"name": "locationManager", "method": "searchForDefinedAddress", "params": ["' + $("option:selected", $(self.$.addressSelect)).attr("value") + '"]}';

               $.ajax({
                   url:"/kf/kf-customer/panels/ajaxAddressLocation.jsp",
                   data: {component:componentValue},
                   success:function(data){
                       var res;
                       if (data) {
                           res = typeof(data) === 'string' ? $.parseJSON(data) : data;
                           if (res.data) {
                           
                               $.each(res.data[0], function(i, v) { 
                                   $('#'+ i).attr('value', v);
                               });
                           
                               self.config.popupObj.close();
                           } else if (res.customErrors) {
                               $errorContainer.empty();
                               $.each(res.customErrors, function(i, v) { 
                                   $errorContainer.append("<li>" + v + "</li>"); 
                               });
                               $errorContainer.parent().show();
                           }
                       }
                   }
               });
           };
        
           AddressFinder.prototype._loadObjects=function(unique){
            var key=null;
            for (key in this.config.selectors) if (this.config.selectors.hasOwnProperty(key)) {
                if(unique){
                    this.config.selectors[key] = this.config.id+" "+this.config.selectors[key];
                }
                var obj = this.config.selectors[key];
                this.$[key]= $(obj);
            }
        };
        
        return AddressFinder;
    }
});