$.rm({
  name: "darwin.modules.popup",
  dependencies: ["darwin.common","darwin.modules.lightbox"],
  impl: function () {
	  
   var Module = function (settings){
      
         this.config = {
            id	: '',
            modal: false,
            content : {
              moveContent: true,
              singleWindow: true,
            	wrapper :'',
            	wrapperTag : '',
            	container:''
            },                        
            selectors :{
            	triggerer :'',
              closer: '.closer',
            	window :''
            },
            events : {
            	open: 'popupOpened'  ,
            	close:'popupClosed'
            }
         };
         $.extend(true,this.config, settings || {});
         this.$ = {};
        
         this._loadObjects(false);

         this._init();
         this._bindEvents();
        
   };
  
   Module.prototype.close = function(){
     if(this.$.lightbox){
       this.$.lightbox.close();
     }
   };
   Module.prototype.isOpened = function(){
	     return this.$.activeWindow?true:false;    	 
	   };
   
   Module.prototype.getTriggererEvent = function(){
	   return this.$.triggererEvent;
   };
   Module.prototype._init = function(){
	   this.$.lightbox = new darwin.modules.lightbox({modal: this.config.modal});
   };
   // Loads the objects
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
      
   //Bindings
   Module.prototype._bindEvents=function(){
	   	//Self events
	    $(this).bind(this.config.events.open,function(){});
	   	$(this).bind(this.config.events.close,function(){});
	   	
	   	// Binding to the triggerer
	   	this.$.triggerer.bind('click', $.proxy( function(event){   	
	   		event.preventDefault();
	   		this.$.triggererEvent = event;
	   		//bulk or single windowing
	   		if(this.config.content.singleWindow){
	   			this.$.activeWindow = $(this.config.selectors.window);
	   		}else{
	   			this.$.activeWindow = $(event.currentTarget).next(this.config.selectors.window);
	   		}
	   		var html = "";
	   	// if needs to copy the content from the markup
        if (this.config.content.moveContent){
         html= this.$.activeWindow.html();
         //if needs to be wrapped
          if(this.config.content.wrapper){
            html= $(html).wrap(this.config.content.wrapper).closest(this.config.content.wrapperTag);
          }
        }else{
	   		if(this.config.content.wrapper){
            html= this.config.content.wrapper;
          }
        }
	   		this.$.lightbox._init();
	   		this.$.lightbox.open($(event.currentTarget),html);
	   		$(this).trigger(this.config.events.open);
        if (this.config.content.moveContent){
	   		  this.$.activeWindow.empty();
        }  		
	   	},this));	   	
      this.$.closer.live('click',$.proxy(function(event){
        event.preventDefault();
        if(this.config.content.wrapper){
             this.$.activeWindow.html($(this.config.content.container,this.$.lightbox.getContent()).parent().html());
          }else{
             this.$.activeWindow.html(this.$.lightbox.getContent());
          }
        this.$.lightbox.close();
        $(this).trigger(this.config.events.close);
      },this));

	   	//binding to the lightbox close event to handling te possibble dewrapping
	   	$(this.$.lightbox).bind(this.$.lightbox.config.events.close,$.proxy(function(e){
         if (this.config.content.moveContent){
	   		if(this.config.content.wrapper){
  	    		 this.$.activeWindow.html($(this.config.content.container,this.$.lightbox.getContent()).parent().html());
  	    	}else{
  	    		 this.$.activeWindow.html(this.$.lightbox.getContent());
  	    	}
  	    	$(this).trigger(this.config.events.close);
        }
  		},this));	   	  
   };  
    return Module;
	}
});