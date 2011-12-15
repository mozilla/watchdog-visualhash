(function () {
	
	function attachToInputs(e) {
		var elements = document.getElementsByTagName('input');
		for (var elIdx = 0; elIdx < elements.length; elIdx++) {
	        if (elements[elIdx] && elements[elIdx].tagName == 'INPUT' && elements[elIdx].type == 'password' && !(elements[elIdx].__visualHash))
	            attachHashAsYouType(elements[elIdx]);
		}
	}	
	document.addEventListener('DOMSubtreeModified', attachToInputs);
	
	attachToInputs();
	
    function attachHashAsYouType(passwordElem) {
        var oldBackgroundImage = passwordElem.style['backgroundImage'];
        var oldBackgroundColor = passwordElem.style['backgroundColor'];
        var oldKeyDown = passwordElem.onkeydown;

        function restoreBackgroundColor(elem) {
            elem.style['backgroundImage'] = oldBackgroundImage;
            elem.style['backgroundColor'] = oldBackgroundColor;
        }

        function updateVisualHash(elem) {
            if (elem.value == '' || elem != document.activeElement) {
                restoreBackgroundColor(elem);
                return;
            }
            var passwordHash = SHA1(elem.value);
            var elemWidth = Math.max(elem.clientWidth,elem.offsetWidth);
            var elemHeight = Math.max(elem.clientHeight,elem.offsetHeight);
            elem.style['backgroundImage'] = 'url(' + getDataURLForHash(passwordHash,elemWidth,elemHeight) + ')';
        }
        
        function updateHashTimeout() {
			// Timeout for a small amount of time (10ms) because element.value isn't updated until
			// after keydown event raises.
			
	        // TODO: find if there's another way of keeping track of typed updates.
            setTimeout(function() {
                updateVisualHash(passwordElem)
            },10);
        }
        passwordElem.addEventListener('keydown', updateHashTimeout);
		passwordElem.addEventListener('focus', updateHashTimeout);
		passwordElem.addEventListener('blur', updateHashTimeout);
        
        // FIXME: Find a better way of marking an element as having visual hashing attached.
        passwordElem.__visualHash = true;
        
        // Update for first keydown
        updateHashTimeout();
    }
})();