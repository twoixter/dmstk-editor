(function($){

	$.widget("ui.prueba", {
	
	_init: function() {
		var self = this;

		self._makeEditable();
		self.element.keypress(function(e){self._keyPress(e);});
		self.element.keyup(function(e){self._keyUp(e);});

		self._initContent(self.element.text());
	},

	_makeEditable: function() {
		var self = this;
		self.element.get(0).contentEditable = true;
	},

	_initContent: function(txt) {
		var self = this;
		var lines = self.element.text().split(/[\n\r]/);

		self.element.text("");
		$.each(lines, function(i,e){
			if ($.trim(e).length || (i && i<lines.length - 1)) {
				self.element.append(
					self._lineFormat(e, { lineNo: i })
				);
			}
		});
	},

	_keyPress: function(e){
		var self = this;

		/*
		 * e.charCode = Key Code (ASCII)
		 * e.keyCode  = Key Code (Control like Enter, ESC, etc)
		 * e.metaKey  = true | false
		 * e.ctrlKey  = true | false
		 * e.shiftKey = true | false
		 * e.altKey   = true | false
		 *
		 */

		if (e.keyCode == 13) {
			self._debug(window.getSelection());
			
			self._breakLine(window.getSelection());
			e.preventDefault();
		}
		e.preventDefault();

		// Test for manually inserting text...
		if (e.charCode && !e.keyCode && !e.metaKey && !e.ctrlKey && !e.altKey) {
			var range = window.getSelection().getRangeAt(0);
			var node = window.document.createTextNode(e.charCode);
			var selct = window.getSelection();
			var range2 = range.cloneRange();
			// Insert text at cursor position
			selct.removeAllRanges();
			range.deleteContents();
			range.insertNode(node);
			// Move the cursor to the end of text
			range2.selectNode(node);
			range2.collapse(false);
			selct.removeAllRanges();
			selct.addRange(range2);
		}
		// **** END OF TEST ****


//		self._enableTimer();
	},

	/*
	 * Key up event. This event is triggered ONCE per keyboard repetitions.
	 * In other words, if we press enter for about 5 seconds, we get the 
	 * following secuence of events:
	 *
	 * keyDown, keyPress, keyPress, keyPress, keyPres, keypress, keyUP
	 */
	_keyUp: function(e){
		var self = this;
		// self._debug(e);
	},

	_breakLine: function(sel){
		var self = this;

		self._debug(sel);
		
		// sel.anchorNode ?  sel.focusNode ?
		// https://developer.mozilla.org/en/DOM/selection
		// http://blog.versionate.com/2007/04/25/getting-range-objects-from-dom-selection/

		// jQuery "closest" magic. Returns the closest "parent" element which
		// has the indicated properties.
		// On pressing return "outside" some DIV.code-line, "closest" returns
		// nothing.
		// WARNING: jQuery 1.3 and up only.
		var closestLine = $(sel.anchorNode).closest(".code-line");

		if (!closestLine.length) {
			// OK, so we are on first line.
			self.element.prepend(
					self._lineFormat("", { lineNo: 1 })
				);
			return;
		}

		// We have to break a line. 
		self._debug(sel.anchorOffset);

		var txt = closestLine.text();
		self._debug(txt.substr(0, sel.anchorOffset));
		self._debug(txt.substr(sel.anchorOffset));

		closestLine.after(
				self._lineFormat(txt.substr(sel.anchorOffset))
			);
		closestLine.replaceWith(
				self._lineFormat(txt.substr(0, sel.anchorOffset))
			);

/*
		  	var range = document.createRange();
			range.setStartAfter(closestLine[0]);
			range.collapse(true);
	      	sel.removeAllRanges();
	      	sel.addRange(range);
			self._debug(window.getSelection());
*/


//		self._debug(sel.anchorNode);
		self._debug(closestLine[0].lineNo);
	},

	_enableTimer: function(){
		var self = this;

		self.element.stopTime();
		self.element.oneTime(1000, function(){
			self._debug( self.element );
			self._debug( self );
		})
	},

	_lineFormat: function(txt, options) {
		var newTxt = $.trim(txt).length ? txt : "&nbsp;";
    	var elem = $("<div class='code-line'>" + newTxt + "</div>");
		var ops  = { lineNo: 0, dirty: true };

		// The creation of the above DOM element could fail in cases where
		// the XHTML structure of txt is invalid, so we must ensure a clean,
		// empty DOM node instead.
		if (!elem.length) elem = $("<div class='code-line'>&nbsp;</div>");

		$.extend(elem[0], ops, options);
		return elem;
  	},

	_debug: function(obj) {
		if (window.console && window.console.log)
			window.console.log(obj);
	}

});

$.extend($.ui.prueba, {
	version: "@VERSION",
	defaults: {
		value: 0
	}
});

	
})(jQuery);
