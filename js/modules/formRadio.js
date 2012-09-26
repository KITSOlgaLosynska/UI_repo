/**
* Radio form element handler. Represents and 'fancies' one radio form element
* Constructor MUST pass 'obj' that represents the radio to be fancied
*/
$.rm({
  name: "darwin.modules.formRadio",
  impl: function () {
       /*Constructor*/ 
       var Radio = function (settings){
             this.config = {};
              $.extend(true,this.config, settings || {});
              this.$ = {};
              this._loadObjects(true);
              this._init();
              this._bindEvents();
           };
           
           /*Methods*/
           Radio.prototype._init = function() {
               this.$.groupName = $(this.config.obj).attr("name");
           };
           
           Radio.prototype._removeCheckedInSameGroup = function() {
               var self = this;
               
               $("input[type=radio]", $(this.config.obj).parents('form')).each(function(){
				   if ($(this).attr("name") == self.$.groupName) {
                       $(this).parent().removeClass("checked");
                       $(self.config.obj).removeAttr("checked");
                   }
               }); 
               
           };
        
           Radio.prototype._setState = function(){
			   if(this.config.obj.checked) {
                   this._removeCheckedInSameGroup();
                   $(this.config.obj).parent().addClass("checked");
                   $(this.config.obj).attr("checked", "checked");
               } else {
                   $(this.config.obj).parent().removeClass("checked");
                   $(this.config.obj).removeAttr("checked");
               }
           };
           
           Radio.prototype._doFocus = function(){
               $(this.config.obj).parent().addClass("focus");
           };
        
           Radio.prototype._doBlur = function(){
               $(this.config.obj).parent().removeClass("focus");
           };
   
           Radio.prototype._bindEvents = function(){
            
            $(this.config.obj).bind("click", $.proxy(this._setState, this))
            .bind("focus", $.proxy(this._doFocus, this))
            .bind("blur", $.proxy(this._doBlur, this));
            
            $("label", $(this.config.obj).parent()).hover($.proxy(this._doFocus, this), $.proxy(this._doBlur, this));
         
            this._setState();
        };
        
        Radio.prototype._loadObjects=function(unique){
            var key=null;
            for (key in this.config.selectors) if (this.config.selectors.hasOwnProperty(key)) {
                if(unique){
                    this.config.selectors[key] = this.config.id+" "+this.config.selectors[key];
                }
                var obj = this.config.selectors[key];
                this.$[key]= $(obj);
            }
        };
        
        return Radio;
    }
});