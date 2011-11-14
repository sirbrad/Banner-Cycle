/* Cycle.js
 **********************************************************************/

/* OBJECTIVE
 * To loop through and rotate a list of banners.
 */
 

(function cycle(global) {
	var container = document.getElementById('cycle'),
		lis = container.getElementsByTagName('li')
		len = lis.length,
		arr = [];
	
	// Determing how many banners we want visible at a given time is simple.
	var count = 3; // Determine how many banners should be visible
	
	// Hide the banners that shouldn't be visible
	(function() {
		
		// If count is set to be more or equal to the length of our elements then return the function
		// as there is no point in doing anything.
		if (count >= len) {
			return false
		}
		
		
		// Hide all elements greater than count
		while(len--) {
			if (len > count-1) {
				lis[len].className = 'hide';
			}
		}
		
		
		
		
		/*while (len--) {
			lis[len].className = 'hide';	
		}
		
		while (count--) {
			lis[count].className = 'show';	
		}*/
		
	}());
	
	
}(this));