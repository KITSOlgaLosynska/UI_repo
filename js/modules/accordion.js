/**
* Accordion module
*/
$.rm({
  name: "darwin.modules.accordion",
  dependencies: ["darwin.common"],
  impl: function () {
       /*Constructor*/ 
       var Module = function (settings){
             this.config = {
                id		: '',
                grouping: false,
                event	: 'click',
                selectors: {
                	toggle: '.accordion',
                	toggler: '.accordion-bar',
                	toggleable: '.accordion-panel',
                	stateIcon : 'span.state-icon',
                	stateClass: 'up'
                }
              };
              $.extend(true,this.config, settings || {});
              this.$ = {};
              this._loadObjects(this.config.grouping);
              this._bindEvents();
           };
        /*Methods*/
           
        Module.prototype.toggle = function(e){
          if(e.hasOwnProperty('currentTarget')){
            e = e.currentTarget;
          }
        	$(this.config.selectors.toggleable ,$(e).parent("li"))
        		.fadeToggle("fast","linear");
        	$(this.config.selectors.stateIcon , $(e))
        		.toggleClass(this.config.selectors.stateClass);
          $(e).toggleClass(this.config.selectors.stateClass);
        
      };


        
        Module.prototype.openPanel = function(obj){
            if(!$(obj).hasClass(this.config.selectors.stateClass)){
              this.toggle(obj);
            }
        };

        Module.prototype.closePanel = function(obj){
            if($(obj).hasClass(this.config.selectors.stateClass)){
              this.toggle(obj); 
            }
        };
                
        Module.prototype._loadObjects=function(unique){
        	 var key;
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
