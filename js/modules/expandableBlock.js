$.rm({
	name: "darwin.modules.expandableBlock",
	dependencies: ["darwin.common"],
	impl: function () {
		var Expandable = function (settings){
			 
			this.config = {
				id	: '',
				selectors : {
					opener: '',
					expArea :''
				},
				showText: 'Show',
				hideText: 'Hide',
				addedClass: 'show-box',
				state: 'closed',
				isAnimating: false,
				forIE: false,
				speed:1500
			};
			$.extend(true,this.config, settings || {});
			this.$ = {};
			
			this._loadObjects(false);
			 
			this._init();
			this._bindEvents();
			 
		};
		Expandable.prototype.isOpened = function(){
			return this.config.state == 'opened' ? true : false;    	 
		};
		Expandable.prototype.ieFix = function(){
			this.$.opener.append('<div class="after">');
		}
	
		Expandable.prototype._init = function(){
			this.$.opener.text(this.config.showText);
			if($(this.config.id).hasClass(this.config.addedClass))
				$(this.config.id).removeClass(this.config.addedClass);
			if(this.config.forIE && $.browser.msie && $.browser.version < 8)
				this.ieFix();
		};
		Expandable.prototype.animation = function(event){
			var self = this;
			switch(event){
				case 'open':
					self.$.expArea.slideDown(self.config.speed,function(){self.config.isAnimating = false;});
					break;
				case 'close':
					self.$.expArea.slideUp(self.config.speed,function(){self.config.isAnimating = false;});
					break;
			}
		};
	   // Loads the objects
		Expandable.prototype._loadObjects=function(unique){
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
	   Expandable.prototype._bindEvents=function(){
			// Binding to the triggerer
			this.$.opener.bind('click', $.proxy( function(event){   	
				event.preventDefault();
				if(this.isOpened()){
					if(!this.config.isAnimating){
						this.config.isAnimating = true;
						this.$.opener.text(this.config.showText);
						$(this.config.id).removeClass(this.config.addedClass);
						this.animation("close");
						this.config.state = 'closed';
						if(this.config.forIE && $.browser.msie && $.browser.version < 8)
							this.ieFix();
					}
				}else{
					if(!this.config.isAnimating){
						this.config.isAnimating = true;
						this.$.opener.text(this.config.hideText);
						$(this.config.id).addClass(this.config.addedClass);
						this.animation("open");
						this.config.state = 'opened';
						if(this.config.forIE && $.browser.msie && $.browser.version < 8)
							this.ieFix();
					}
				}
				
			},this));

		};  
		return Expandable;
	}
});