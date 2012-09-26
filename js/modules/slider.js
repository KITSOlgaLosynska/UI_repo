/**
* Slider module
* 
*/
$.rm({
  name: "darwin.modules.slider",
  dependencies: ["darwin.common"],
  impl: function () {
       /*Constructor*/
       var Slider = function (settings){
             this.config = {
                id       : 'slider-wrap',
                alignment: "horizontal",
                elemsNo : 0,
                upmElIdx : 0,
                pageSize : 3,
                selectors: {
                  slider     : '',
                  prevButton   : '.page-prev',
                  nextButton   : '.page-next',
                  sliderPane : '.slider-pane',
                  sliderWindow : '.slider-window',
                  elems       : 'ul li',
                  elem    : 'ul li div',
                  disabler: '.disabler',
                  pager: '.pager'
                  }
              };
              $.extend(true,this.config, settings || {});
               this.$ = {};
               this._loadObjects(true);
               this._initSlider();
               this._bindEvents();
           };
        /*Methods*/
        // handles carousel pane animation
        Slider.prototype.animation = function(){
         switch(this.config.alignment){
         case 'vertical':
            this.$.sliderPane.animate({
            top: -$($("li",this.$.sliderPane).get(this.config.upmElIdx)).position().top}, 300);
          break;
          case 'horizontal':
            this.$.sliderPane.animate({
            left: -$($("li",this.$.sliderPane).get(this.config.upmElIdx)).position().left}, 300);
          break;
          }
        };
        //handling button state
        Slider.prototype.buttonState=function(){
          if (this.config.elemsNo<=this.config.pageSize){
            this.$.pager.hide();
          }else{
            this.$.pager.show();
            if(this.config.upmElIdx <1){
                  this.$.prevButton.addClass('disabled');
                  this.$.disabler.addClass('page-prev');
            }
            else{
                  this.$.prevButton.removeClass('disabled');
                  this.$.disabler.removeClass('page-prev');
            }
            if(this.config.upmElIdx < this.config.elemsNo - this.config.pageSize){
                  this.$.nextButton.removeClass('disabled');
                  this.$.disabler.removeClass('page-next');
            }else{
                  this.$.nextButton.addClass('disabled');
                  this.$.disabler.addClass('page-next');
            }
          }
        };
         //handling movement
        Slider.prototype.move = function(direction){
        switch(direction){
            case 'prev':
              if(this.config.upmElIdx >0){
                --this.config.upmElIdx;  
              }
            break;
            case 'next':
              if(this.config.upmElIdx < this.config.elemsNo - this.config.pageSize){
              ++this.config.upmElIdx;
            }
            break;
          }
           this.buttonState();
           this.animation();
           this.$.slider.trigger('sliderChanged');
        }
        //loads the html content into the slider
        Slider.prototype.loadContent = function(html){
            this.$.sliderWindow.empty();
            this.$.sliderWindow.append(html);
             this.config.upmElIdx = 0;
            this.$ = {};
            this._loadObjects(false);
            this._initSlider();
           };
        //inits the slider
        Slider.prototype._initSlider=function(){
          this.config.elemsNo = $("li", this.$.sliderPane).length;
          if (this.config.alignment ==='horizontal'){
            this.$.sliderPane.width($(this.$.elems[0]).width()*this.$.elems.length);
             this.$.sliderWindow.width($(this.$.elems[0]).width()*this.config.pageSize);
          }
          this.$.slider.addClass(this.config.alignment);
          this.$.prevButton.parent().prepend(this.config.disabler);
          this.buttonState();
        };

        // Loads te objects
        Slider.prototype._loadObjects=function(unique){
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
        Slider.prototype._bindEvents=function(){
          /*prev*/
          this.$.prevButton.bind('click', $.proxy( function(event){
            event.preventDefault();
            this.move("prev");   
          },this));
          /*next*/
          this.$.nextButton.bind('click', $.proxy( function(event){
            event.preventDefault();
             this.move("next");   
          },this));  
        };
    return Slider;
    }
});