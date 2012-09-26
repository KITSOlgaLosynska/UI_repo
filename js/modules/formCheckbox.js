/**
* Checkbox form element handler. Represents and 'fancies' one checkbox form element
* Constructor MUST pass 'obj' that represents the checkbox to be fancied
*/
$.rm({
  name: "darwin.modules.formCheckbox",
  impl: function () {
       /*Constructor*/ 
       var Checkbox = function (settings){
             this.config = {};
              $.extend(true,this.config, settings || {});
              this.$ = {};
              this._loadObjects(true);
              this._init();
              this._bindEvents();
           };
           
           /*Methods*/
           Checkbox.prototype._init = function() {};
        
           Checkbox.prototype._setState = function(){
               if(this.config.obj.checked) {
                   $(this.config.obj).parent().addClass('checked');
                   $(this.config.obj).attr("checked", "checked");
               } else {
                   $(this.config.obj).parent().removeClass('checked');
                   $(this.config.obj).removeAttr("checked");
               }
           };
           
           Checkbox.prototype._doFocus = function(){
               $(this.config.obj).parent().addClass('focus');
           };
        
           Checkbox.prototype._doBlur = function(){
               $(this.config.obj).parent().removeClass('focus');
           };
   
        Checkbox.prototype._bindEvents = function(){
            
            $(this.config.obj).bind('click', $.proxy(this._setState, this))
            .bind('focus', $.proxy(this._doFocus, this))
            .bind('blur', $.proxy(this._doBlur, this));
            
            $("label", $(this.config.obj).parent()).hover($.proxy(this._doFocus, this), $.proxy(this._doBlur, this));
         
            this._setState();
        };
        
        Checkbox.prototype._loadObjects=function(unique){
            var key=null;
            for (key in this.config.selectors) if (this.config.selectors.hasOwnProperty(key)) {
                if(unique){
                    this.config.selectors[key] = this.config.id+" "+this.config.selectors[key];
                }
                var obj = this.config.selectors[key];
                this.$[key]= $(obj);
            }
        };
        
        return Checkbox;
    }
});