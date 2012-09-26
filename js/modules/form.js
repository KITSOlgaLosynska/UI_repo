/**
* Base form handler
*/
$.rm({
  name: "darwin.modules.form",
  dependencies: ["darwin.modules.formSelect", "darwin.modules.formCheckbox", "darwin.modules.formRadio", "darwin.modules.formInput", "darwin.modules.formValidator"],
  impl: function () {
       /*Constructor*/ 
       var Form = function (settings){
           this.config = {
               id    : 'form',
               selectors: {},
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
       Form.prototype._init=function(){
           var self = this;
           
           darwin.instances.formValidator = darwin.instances.formValidator || new darwin.modules.formValidator();
           self.$.formFields = self.$.formFields || {};
           
           //Initializing selects
           $("select", $(this.config.id)).each(function(i) {
               self.$.formFields.selects = self.$.formFields.selects || {};
               self.$.formFields.selects['select' + i] = new darwin.modules.formSelect({obj: this});
           });
           
           //Initializing checkboxes
           $("input[type=checkbox]", $(this.config.id)).each(function(i) {
               self.$.formFields.checkboxes = self.$.formFields.checkboxes || {};
               self.$.formFields.checkboxes['checkbox' + i] = new darwin.modules.formCheckbox({obj: this});
           });
           
           //Initializing radios
           $("input[type=radio]", $(this.config.id)).each(function(i) {
               self.$.formFields.radios = self.$.formFields.radios || {};
               self.$.formFields.radios['radio' + i] = new darwin.modules.formRadio({obj: this});
           });
           
           //Initializing textareas (there's no class for this and there's no spec behaviour we need to implement). Storing only.
           $("textarea", $(this.config.id)).each(function(i) {
               self.$.formFields.textareas = self.$.formFields.textareas || {};
               self.$.formFields.textareas['textarea' + i] = this;
           });
           
           //Initializing text inputs (there's no class for this and there's no spec behaviour we need to implement). Storing only.
           $("input[type=text]", $(this.config.id)).each(function(i) {
               self.$.formFields.textinputs = self.$.formFields.textinputs || {};
               self.$.formFields.textinputs['textinput' + i] = new darwin.modules.formInput({obj: this});
           });
           
           //Initializing password inputs (there's no class for this and there's no spec behaviour we need to implement). Storing only.
           $("input[type=password]", $(this.config.id)).each(function(i) {
               self.$.formFields.passwords = self.$.formFields.password || {};
               self.$.formFields.passwords['password' + i] = this;
           });
           
           //Storing submit inputs
           $("input[type=submit]", $(this.config.id)).each(function(i) {
               self.$.formFields.submits = self.$.formFields.submits || {};
               self.$.formFields.submits['submit' + i] = this;
           });
           
           //Storing buttons
           $("button", $(this.config.id)).each(function(i) {
               self.$.formFields.buttons = self.$.formFields.buttons || {};
               self.$.formFields.buttons['button' + i] = this;
           });
           
       };
     
       Form.prototype._loadObjects=function(unique){
         var key=null;
            for (key in this.config.selectors) if (this.config.selectors.hasOwnProperty(key)) {
              if(unique){
                  this.config.selectors[key] = this.config.id+" "+this.config.selectors[key];
              }
              var obj = this.config.selectors[key];
              this.$[key]= $(obj);
            }
       };
   
        Form.prototype._bindEvents=function(){

        };
    return Form;
 }
});