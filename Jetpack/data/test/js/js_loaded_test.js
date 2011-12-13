var passInput = null;

setTimeout(function() {
	passInput = document.createElement('input');
	passInput.type = 'password';
	document.body.appendChild(passInput);
	
	self.postMessage({
		type: 'readyForTest'
	});
},500);

self.port.on('typeText', function(msg) {
	passInput.value="somepassword";
    var evt = document.createEvent("KeyboardEvent");
	evt.initKeyEvent(                                                                                      
	                 "keydown",        //  in DOMString typeArg,                                                           
	                  true,             //  in boolean canBubbleArg,                                                        
	                  true,             //  in boolean cancelableArg,                                                       
	                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
	                  false,            //  in boolean ctrlKeyArg,                                                               
	                  false,            //  in boolean altKeyArg,                                                        
	                  false,            //  in boolean shiftKeyArg,                                                      
	                  false,            //  in boolean metaKeyArg,                                                       
					  // 'a'
	                   67,               //  in unsigned long keyCodeArg,                                                      
	                   97);              //  in unsigned long charCodeArg); 
    passInput.dispatchEvent(evt);
	self.postMessage({
		type: 'visualHash',
		value: passInput.__visualHash
	});
});