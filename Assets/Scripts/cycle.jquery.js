;(function($, window, document, undefined){
		
	// Creating the defaults once
	var pluginName = 'cycling',
		defaults = {
			count: 4, // Determine how many elements to show
			delay: 3000 // Determine the delay time
		};
		
	// Plugin constructor
	function Plugin(element, options) {
		this.element = element;
		
		this.options = $.extend( {}, defaults, options);
		
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	};
	
	// Initialization
	Plugin.prototype.init = function () {
		
	// Variables
	var lis = this.element.getElementsByTagName('li');
		len = lis.length,
		arr = [],
		stopper = false,
		margBtm = 0; // Didn't like me setting an empty variable?
		
	// If count is set to be more or equal to the length of our elements then return the function
	// as there is no point in doing anything.
	if (this._defaults.count >= len) {
		stopper = true;
		return false;
	}
	
	// Hide the banners that shouldn't be visible
	while(len--) {
		if (len > this._defaults.count-1) {
			lis[len].className = 'hide';
		}
	}
	
	// Get Styles of particular attr
	var getStyle = (function(element) {
		if (window.getComputedStyle) { 
			// W3C specific method. Expects a style property with hyphens
			return function(element, styleName) {
				return element.ownerDocument.defaultView.getComputedStyle(element, null).getPropertyValue(styleName);    
			}
		} else if (element.currentStyle) { 
			// Internet Explorer-specific method. Expects style property names in camel case 
			return function(element, styleName) {
				return element.currentStyle[styleName];
			}
		}
	}(document.body));
	
	// Check for internext explorer, borrowed from @Integralist
	var isIE = (function() {
		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');
	
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);
	
		return v > 4 ? v : undef;	
	}());
		
	// IE7/6 needs to be passed a different arg.
	// So annoying!	
	if (isIE <= 7) {
		margBtm = getStyle(lis[0], 'marginBottom')
	} else {
		margBtm = getStyle(lis[0], 'margin-bottom')
	}
	
	
	
	// Get style returns the value with px on the end. So we just grab the number.
	margBtm = parseInt(margBtm);
		
	};
	
	$.fn[pluginName] = function (options) {
		return this.each(function() {
			
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
			
			function run() {
				/*var firstElem = lis[0],
					len = lis.length,
					cloned;*/
					
				console.log(lis)
				
			};
			
			
	
			// This runs only if our count is less than the lis length
			if (!stopper) {
				console.log(lis)
				
				var self = this,
					timer = window.setInterval(function(){
					run.call(self);
					//$.proxy(self, run);
				}, 1000);
			}
			
		});
	};
		
})(jQuery, window, document);