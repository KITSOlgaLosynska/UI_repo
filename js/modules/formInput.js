/**
* Input form element handler. Represents one text input form element
* Constructor MUST pass 'obj' that represents the input
*/
$.rm({
  name: "darwin.modules.formInput",
  impl: function () {
       /*Constructor*/ 
       var Input = function (settings){
             this.config = {};
              $.extend(true,this.config, settings || {});
              this.$ = {};
              this._loadObjects(true);
              this._init();
              this._bindEvents();
           };
           
       /*Methods*/
       Input.prototype._init = function() {
           this.$.failedValidationTests = new Array();
       };
           
        
       Input.prototype._doBlur = function(){
           $(this.config.obj).attr("value", $(this.config.obj).val());
           
           //Removing basic validation. To enable it uncomment the block below
           /*this.$.failedValidationTests = darwin.instances.formValidator.isValid(this.config.obj);
           if (this.$.failedValidationTests.length) {
               $(this.config.obj).parent().addClass("error");
           } else {
               $(this.config.obj).parent().removeClass("error");
           }*/
       };
   
       Input.prototype._bindEvents = function(){
           $(this.config.obj).bind('blur', $.proxy(this._doBlur, this));
       };
        
        Input.prototype._loadObjects=function(unique){
            var key=null;
            for (key in this.config.selectors) if (this.config.selectors.hasOwnProperty(key)) {
                if(unique){
                    this.config.selectors[key] = this.config.id+" "+this.config.selectors[key];
                }
                var obj = this.config.selectors[key];
                this.$[key]= $(obj);
            }
        };
        
        return Input;
    }
});