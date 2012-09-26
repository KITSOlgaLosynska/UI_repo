/**
* Lightbox module
*/
$.rm({
  name: "darwin.modules.lightbox",
  dependencies: ["darwin.common"],
  impl: function () {
       /*Constructor*/ 
       var Module = function (settings){
             this.config = {
                id				: '',
                window			: '<div class="lightbox-window"><div class="lightbox-inner"></div></div>',
                windowIE		: '<div class="lightbox-window"><div class="lightbox-window-ie-1"></div><div class="lightbox-window-ie-2"></div><div class="lightbox-inner"></div></div>',
                overlay			: '<div class="lightbox-overlay"></div>',
                inner			: 'div.lightbox-inner',
                closeBtn		: '<a class="lightbox-close" href=#><img src="$$lbcloseimg$$" width="$$lbclosewidth$$" height="$$lbcloseheight$$" alt="$$lbclosetxt$$" /></a>',
                loadingContent	: '<div class="lightbox-loading"><img src="$$ajaxloadimg$$" width="$$ajaxloadwidth$$" height="$$ajaxloadheight$$" alt="$$ajaxloadtxt$$" /></div>',
                showOverlay		: true,
                position		: false,
                overlayOpacity	: 0.6,
                showCloseBtn	: true,
                draggable		: false,
                refocus	 		: false,
                modal			: false, 
                visible	 		: true,
                loading  		: true,
                rebindObjects : {},
                ajaxLoading: {
            		src: 'images/ajax-loader.gif',
            		width: '31',
            		height: '31',
            		text: 'Loading content'	
            	},
            	lightboxClose: {
            		src: 'images/lightbox-close.png',
            		width: '38',
            		height: '38',
            		text: 'Back to content'
            	},
                selectors: {},
                events:{
                	open: 'lightBoxOpened',
                	close: 'lightBoxClosed'
                }
              };
              $.extend(true,this.config, settings || {});
               this.$ = {};
               this._init();
           };
        /*Methods*/

        Module.prototype._init=function(){
        	this.config.visible = false;
			this.config.loading = false;
			
			if($.browser.msie && $.browser.version<=8) this.$.window = $(this.config.windowIE);
			else this.$.window = $(this.config.window);
			this.$.inner = $(this.config.inner,this.$.window).attr('tabindex','-1');
			
			//modal windows require user interaction before being able to close
			if(this.config.modal){
				this.config.showOverlay = true;
				this.config.showCloseBtn = false;
			}
			
			if(this.config.showOverlay){
				this.$.overlay = $(this.config.overlay);
				if(!this.config.modal) this.$.overlay.bind('click',$.proxy(function(e){this.close(e);},this));
			}
			
			if(this.config.showCloseBtn) this.$.close = $(this.parse(this.config.closeBtn))
				.appendTo(this.$.window).bind('click',$.proxy(function(e){this.close(e);},this));
			$(this).bind(this.config.events.close,function(){});
			$(this.$.window).bind(this.config.events.close,function(){});
			$(this.$.window).bind(this.config.events.open,function(){});
			this.$.retHtml = "";
        };
    
        Module.prototype.parse = function(elem){
        	var retStr = "";
        	 switch(elem){
             	case this.config.closeBtn:
             		var props = this.config.lightboxClose;
             		retStr= elem.replace('$$lbcloseimg$$',props.src)
             					.replace('$$lbclosewidth$$',props.width)
             					.replace('$$lbcloseheight$$',props.height)
             					.replace('$$lbclosetxt$$',props.text);
             	break;
             	case this.config.loadingContent:
             		var props = this.config.ajaxLoading;
             		retStr= elem.replace('$$ajaxloadimg$$',props.src)
             					.replace('$$ajaxloadwidth$$',props.width)
             					.replace('$$ajaxloadheight$$',props.height)
             					.replace('$$ajaxloadtxt$$',props.text);
                break;
        	 }     	
        	return retStr;
        };
        
		//opens the lightbox
        Module.prototype.open = function($el,$html){
        	this.$.refocus = $el; //the element to receive focus when the lightbox is closed			
			this.setContent($html);			
			if(!this.config.visible){
				this.config.visible = true;
				//add keyboard event listeners
				$(document).bind('keydown.lightbox',$.proxy(function(e){this.keydown(e);},this));
				if(this.config.showOverlay) this.showOverlay();
				else this.showWindow();
			}
			else{
				this.updateContent();
			}
			$(this).trigger(this.config.events.open);
        };
        
        //closes the lightbox
        Module.prototype.close = function(e){
			if(e) e.preventDefault();
			this.$.refocus.focus();
			content = '';
			$(document).unbind('keydown.lightbox');		
			//hide the content
			this.retHtml = this.$.content;
			this.hideWindow();
			$(this).trigger(this.config.events.close);
		};
		
        //shows overlay
		Module.prototype.showOverlay= function(){
			this.$.overlay.css('opacity',0).appendTo('body').fadeTo(500,this.config.overlayOpacity,'swing',this.showWindow);
		}
		//hides overlay
		Module.prototype.hideOverlay & function(){
			this.$.overlay.fadeOut(150,'swing',function(){
				//$overlay.detach();
			});
		}
        
        //Sets content
        Module.prototype.setContent = function($html){
			//if no content has been passed then show the ajax spinner
			if(!$html){
				this.config.loading = true;
				this.$.content = $(this.parse(this.config.loadingContent));	
			}
			else{
				this.config.loading = false;
				this.$.content = $($html).clone(true,true);
			}
		};
		
		 Module.prototype.getContent = function($html){
			 return this.$.content.clone(true,true);
		 }
		
		Module.prototype.showOverlay = function(){
			//if($.browser.msie) $overlay.css('filter',$overlay.css('filter')); //prevents IE fading in to a solid colour
			this.$.overlay.css({opacity :0 , height : $(document).height()}).appendTo('body').fadeTo(500,this.config.overlayOpacity,'swing',this.showWindow());
		};
		
		Module.prototype.hideOverlay = function(){
			this.$.overlay.fadeOut(150,'swing',$.proxy(function(){
				this.$.overlay.detach();
			},this));
		};
		
		Module.prototype.windowOpened = function (){
			//give the window focus
			this.$.inner.focus();
			
			//get the elements that can recieve keyboard focus
			if(this.config.modal) this.$.tabbables = $(':tabbable',this.$.window);
		};
        //shows window
		Module.prototype.showWindow = function(){
			this.$.window.css('opacity',0).appendTo('body');	
			this.$.inner.append(this.$.content);
			this.config.rebindObject
			//position the window
			if(!this.config.position){
				//we centre the window if no position was specified
				var w = this.$.window.outerWidth();
				var h = this.$.window.outerHeight();
				this.$.window.css({top:(($(window).height() - this.$.window.outerHeight()) / 2) + 
	                $(window).scrollTop() + "px",left:'50%',marginLeft:(-w/2) + 'px'});
			}
			else{
				//we position it as per the options
				this.$.window.css(this.config.position);	
			}
			
			//display the content window and attach the content
			this.$.window.fadeTo(250,1,'swing',$.proxy(function(){
				this.windowOpened();			
				if(this.config.draggable) this.$.window.draggable({cancel:this.config.inner + ',a',start:
					function() {
						//remove any absolute right/bottom positioning as this will cause the window to stretch rather than be dragged
						this.$.window.css({right:'auto',left:'auto'});
					}
				});
			},this));
		};
		
		//Hides window
		Module.prototype.hideWindow = function(){
			this.$.window.fadeOut(150,'swing',$.proxy(function(){
				visible = false;
				
				//remove the content
				this.$.inner.empty();
				this.$.window.detach();
				
				//hide the overlay
				if(this.config.showOverlay) this.hideOverlay();
			},this));
		};
		
		//displays the content
		Module.prototype.updateContent = function(){
			var oldW = this.$.inner.css('width');
			var oldH = this.$.inner.css('height');
			
			//fix the width and height of the window before updating it's content
			this.$.inner.css({width:oldW,height:oldH,overflow:'hidden'});
			
			this.$.inner.children().fadeOut(150,'swing',function(){
				
				this.$.content.css('opacity',0);
				this.$.inner.empty().append(this.$.content);
				
				//if loading is true then we set the loading class and don't animate as we
				//do not need to resize the window until the new content has arrive (i.e. on the next updateContent
				if(this.config.loading){
					this.$.inner.addClass('updating');
					this.$.inner.children().animate({opacity:1},250,'swing',function(){
						this.windowOpened();
					});
				}
				else{
					this.$.inner.removeClass('updating');
					
					var newW = this.$.content.outerWidth();
					var newH = this.$.content.outerHeight();
					
					//position the window
					if(!options.position){
						var marginTop = this.$.window.css('margin-top').replace('px','');
						var marginLeft = this.$.window.css('margin-left').replace('px','');
						
						var deltaW = oldW.replace('px','') - newW;
						var deltaH = oldH.replace('px','') - newH;
						
						this.$.window.animate({marginLeft:(marginLeft*1+deltaW/2)+'px',marginTop:(marginTop*1+deltaH/2)+'px'},250,'swing');
					}
					
					this.$.inner.animate({width:newW,height:newH},250,function(){
						this.$.inner.css({width:'auto',height:'auto',overflow:'auto'});
						this.$.inner.children().animate({opacity:1},250,'swing',function(){
							this.windowOpened();
						});
					});
				}
				});
			};
			
			// Handles the keydown
			Module.prototype.keydown = function(e){
				if (this.config.modal && e.keyCode === 9) { // TAB
					this.retainFocus(e);
				}
				else if (!this.config.modal && e.keyCode === 27) { // ESC
					e.preventDefault();
					this.close(e);
				}
			};
			
			//keeps keyboard focus within the window
			Module.prototype.retainFocus = function(e){
				//if they're tabbing off of the last element in the window return them to the top
				if(!e.shiftKey && e.target === this.$.tabbables[this.$.tabbables.length - 1]){
					e.preventDefault();
					this.$.inner.focus();
				}
				//else if they're tabbing backwards and they are tabbing off of the first element (or the inner container)
				else if(e.shiftKey && (e.target === this.$.tabbables[0] || e.target === this.$.inner[0])){
					e.preventDefault();
					this.$.tabbables[this.$.tabbables.length-1].focus();
				}
			};
			
			//loads content
			Module.prototype.loadContent = function($html){
				this.setContent($html);
				this.updateContent();
			}; 
    return Module;
	}
});
