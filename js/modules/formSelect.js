/**
* Select form element handler. Represents and 'fancies' one select form element
* Constructor MUST pass 'obj' that represents the select to be fancied
*/
$.rm({
  name: "darwin.modules.formSelect",
  impl: function () {
       /*Constructor*/ 
       var Select = function (settings){
             this.config = {
                $wrapperForSelects: $('<div class="select"></div>'),
                $text: $('<span class="text"></span>'),
                $shim: $('<span class="shim"></span>')
              };
              $.extend(true,this.config, settings || {});
              this.$ = {};
              this._loadObjects(true);
              this._init();
              this._bindEvents();
           };
           
           /*Methods*/
           Select.prototype._init = function() {
               //Check whether this select has been initialized by another form instantiation. If yes, don't append markup again.
               if (!$(".shim", $(this.config.obj).parent()).length) {
                   (this.config.$wrapperForSelects).append(this.config.$text.attr('aria-hidden','true')).append(this.config.$shim);
                   $(this.config.obj).parent().append(this.config.$wrapperForSelects.clone().append($(this.config.obj)));
                   this.config.inited = true;
               }
           };
        
        
        Select.prototype._setState = function(){
            $(".text", $(this.config.obj).parent()).html($(':selected', $(this.config.obj)).text());
        };
        
        Select.prototype._doFocus = function(){
            $(this.config.obj).parent().parent().addClass('focus');
        };
     
        Select.prototype._doBlur = function(){
            $(this.config.obj).parent().parent().removeClass('focus');
        };
   
        Select.prototype._bindEvents = function(){
            $(this.config.obj).bind('change', $.proxy(this._setState, this))
            .bind('keyup', $.proxy(this._setState, this))
            .bind('focus', $.proxy(this._doFocus, this))
            .bind('blur', $.proxy(this._doBlur, this));
         
            this._setState();
        };
        
        Select.prototype._loadObjects=function(unique){
            var key=null;
            for (key in this.config.selectors) if (this.config.selectors.hasOwnProperty(key)) {
                if(unique){
                    this.config.selectors[key] = this.config.id+" "+this.config.selectors[key];
                }
                var obj = this.config.selectors[key];
                this.$[key]= $(obj);
            }
        };
        
        return Select;
    }
});