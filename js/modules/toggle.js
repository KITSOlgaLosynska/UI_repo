/**
* Toggle module
*/
$.rm({
  name: "darwin.modules.toggle",
  dependencies: ["darwin.common"],
  impl: function () {
       /*Constructor*/ 
       var Module = function (settings){
             this.config = {
                id		: '.toggle',
                grouping: false,
                event	: 'change',
                selectors: {
                	toggle: '',
                	toggler: '.toggler',
                	toggleable: '.toggleable'
                }
              };
              $.extend(true,this.config, settings || {});
              this.$ = {};
              this._loadObjects(this.config.grouping);
              this._init();
              this._bindEvents();
           };
        /*Methods*/

        Module.prototype._init=function(){
        	
        };
        
        Module.prototype.toggle = function(e){
           if(e.hasOwnProperty('currentTarget')){
            e = e.currentTarget;
          }
        	$(this.config.selectors.toggleable,$(e)
        			.parent(this.config.selectors.toggle)).fadeToggle("fast","linear");
        	
        };

        Module.prototype.close = function(e){
            if(e.hasOwnProperty('currentTarget')){
            e = e.currentTarget;
          }
          $(this.config.selectors.toggleable,$(e)
              .parent(this.config.selectors.toggle)).hide();
          
        };

        Module.prototype.open = function(e){
            if(e.hasOwnProperty('currentTarget')){
            e = e.currentTarget;
          }
          $(this.config.selectors.toggleable,$(e)
              .parent(this.config.selectors.toggle)).show();
          
        };

        Module.prototype.rebind=function(){
        	this.$.toggler.die(this.config.event);
        	this._loadObjects(this.config.grouping);
        	this._bindEvents();
        };
        Module.prototype._loadObjects=function(unique){
        	 var key=null;
             for (key in this.config.selectors) if (this.config.selectors.hasOwnProperty(key)) {
               if(unique){
                   this.config.selectors[key] = this.config.id+" "+this.config.selectors[key];
               }
               var obj = this.config.selectors[key];
               this.$[key]= $(obj);
             }
        };
			
        Module.prototype._bindEvents=function(){
        	this.$.toggler.live(this.config.event,$.proxy(function(e){
        		e.preventDefault();
        		this.toggle(e);
        	},this));
        };
    return Module;
	}
});
