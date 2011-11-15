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
		this.options = $.extend({}, defaults, options);
		this._name = pluginName;
		this.init();
	};
	
	// Initialization
	Plugin.prototype.init = function () {
		
		this.lis = this.element.getElementsByTagName('li');
		this.stopper = false;
		
		// Variables
		var len = this.lis.length,
			arr = [],
			margBtm = 0; // Didn't like me setting an empty variable?
			
		// If count is set to be more or equal to the length of our elements then return the function
		// as there is no point in doing anything.
		if (this.options.count >= len) {
			this.stopper = true;
			return false;
		}
		
		// Hide the banners that shouldn't be visible
		while(len--) {
			if (len > this.options.count-1) {
				this.lis[len].className = 'hide';
			}
		}
		
		/**
		 * The toCamelCase method takes a hyphenated value and converts it into a camel case equivalent.
		 * e.g. margin-left becomes marginLeft. 
		 * Hyphens are removed, and each word after the first begins with a capital letter.
		 * 
		 * @param hyphenatedValue { String } hyphenated string to be converted
		 * @return result { String } the camel case version of the string argument
		 */
		 var toCamelCase = function(hyphenatedValue) { 
		 
			 var result = hyphenatedValue.replace(/-\D/g, function(character) { 
			  return character.charAt(1).toUpperCase(); 
			 }); 
			 
			 return result;
		  
		};
		
		/**
		 * The toHyphens method performs the opposite conversion, taking a camel case string and converting it into a hyphenated one.
		 * e.g. marginLeft becomes margin-left
		 * 
		 * @param camelCaseValue { String } camel cased string to be converted
		 * @return result { String } the hyphenated version of the string argument
		 */
		 var toHyphens = function(camelCaseValue) { 
		 
			 var result = camelCaseValue.replace(/[A-Z]/g, function(character) { 
			  return ('-' + character.charAt(0).toLowerCase()); 
			 });
			
			 return result; 
	
		};
		
		// Get Styles of particular attr
		var getStyle = (function(element) {
			if (window.getComputedStyle) { 
				// W3C specific method. Expects a style property with hyphens
				return function(element, styleName) {
					return element.ownerDocument.defaultView.getComputedStyle(element, null).getPropertyValue(toHyphens(styleName));    
				}
			} else if (element.currentStyle) { 
				// Internet Explorer-specific method. Expects style property names in camel case 
				return function(element, styleName) {
					return element.currentStyle[toCamelCase(styleName)];
				}
			}
		}(document.body));
			
		this.margBtm = getStyle(this.lis[0], 'marginBottom');
		
		// Get style returns the value with px on the end. So we just grab the number.
		this.margBtm = parseInt(this.margBtm);
		
		
	};
	
	$.fn[pluginName] = function (options) {
		return this.each(function() {
			
			
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
			
			// Store in a variable
			var constructor = $.data(this, 'plugin_' + pluginName);
			
			function run() {
				var firstElem = constructor.lis[0],
					len = constructor.lis.length,
					liCount = constructor.lis[constructor.options.count],
					cloned;
					
		
				// Add exact padding to the container, so nothing jumps
				$(this).css("padding-top", ($(firstElem).height() + constructor.margBtm) + 'px');
				// Apply class as it's more effecient. This class sets; position:absolute; top:0;
				$(firstElem).addClass('firstElem');
				
				// Clone first element
				cloned = $(firstElem).clone();
		
				// Pull in the first hidden element
				$(liCount).removeClass('hide').addClass('show');
				jQuery(liCount).animate({opacity:1});
				
		
				// Above we are added a show class to the next element we bring in,
				// Now we must remove that class by tracking back 1 and setting it to blank
				// It was conflicting with the first class we set to take our first element out
				// of the page!
				$(liCount).removeClass('show');
				
				// Animate the paddingTop of our container
				$(this).animate({paddingTop:0}, 400);
		
				// Animate the opacity of our element
				$(firstElem).animate({opacity:0}, 1000, function() {
					
					// Remove our element
					$(firstElem).remove();
					// Re-insert it
					$(self).append(cloned);
					// Then hide it
					$(constructor.lis[len-1]).removeAttr('class').addClass('hide');
				});
									
			};
			
			// This runs only if our count is less than the lis length
			if (!constructor.stopper) {
				var self = this,
					timer = window.setInterval(function(){
					run.call(self);
				}, constructor.options.delay);
			}
			
			
			
		});
	};
		
})(jQuery, window, document);