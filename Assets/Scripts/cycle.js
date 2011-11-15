/* Cycle.js
 **********************************************************************/

/*
 *	Cycling your way through a nice batch of banners
 *	Github: https://github.com/sirbrad
 *	Twitter: http://twitter.com/#!/Bradleyfew
 *	Any questions, hit me up on twitter.
 */
 

(function cycle(global) {
	var container = document.getElementById('cycle'),
		lis = container.getElementsByTagName('li'),
		len = lis.length,
		arr = [],
		stopper = false,
		margBtm;
	
	// Determing how many banners we want visible at a given time is simple.
	var count = 4; // Determine how many banners should be visible
		
	
	// If count is set to be more or equal to the length of our elements then return the function
	// as there is no point in doing anything.
	if (count >= len) {
		stopper = true;
		return false;
	}
	
	// Hide the banners that shouldn't be visible
	while(len--) {
		if (len > count-1) {
			lis[len].className = 'hide';
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
		
	margBtm = getStyle(lis[0], 'marginBottom');
	
	// Get style returns the value with px on the end. So we just grab the number.
	margBtm = parseInt(margBtm);
	
	function run() {
		var firstElem = lis[0],
			len = lis.length,
			cloned;
		
		// Add exact padding to the container, so nothing jumps
		container.style.paddingTop = (firstElem.clientHeight + margBtm) + 'px';
		// Apply class as it's more effecient. This class sets; position:absolute; top:0;
		firstElem.className = 'firstElem';
		
		// Clone first element
		cloned = firstElem.cloneNode(true);
		
		// Pull in the first hidden element
		lis[count].className = 'show';
		jQuery(lis[count]).animate({opacity:1});
		
		// Above we are added a show class to the next element we bring in,
		// Now we must remove that class by tracking back 1 and setting it to blank
		// It was conflicting with the first class we set to take our first element out
		// of the page!
		lis[count-1].className = '';
		
	
		// Animate the paddingTop of our container
		jQuery(container).animate({paddingTop:0}, 400);
		// Animate the opacity of our element
		
		jQuery(firstElem).animate({opacity:0}, 1000, function() {
			// Remove our element
			container.removeChild(firstElem);
			container.appendChild(cloned);
			lis[len-1].className = 'hide';
		});
		
	}
	
	// This runs only if our count is less than the lis length
	if (!stopper) {
		var timer = window.setInterval(run, 3000);
	}
	
	
}(this));