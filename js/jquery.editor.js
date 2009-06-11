/*
 *
 *
 */
(function($){
	
$.fn.edit = function(options)
{
    var opts = $.extend({}, $.fn.edit.defaults, options);

    return this.each(function() {
		this.abcde = true;
		__debug(this);
		
		var self = $(this);
		var lines = self.text().split("\n");

		self.text("");

		window.setTimeout(function(){
			console.log(self);
		}, 300);


		/*
		 * Para hacer el hover en modo "live"
		 */
		$("#" + self[0].id + " .code-line").live("mouseover", function(){
			$(this).css("background", "#bbb");
// __debug(data_edit);
		}).live("mouseout", function(){
			$(this).css("background", "transparent");
// __debug(data_edit);
		});

		$.each(lines, function(i,e){
			if (jQuery.trim(e).length || (i && i<lines.length - 1)) {
				if (jQuery.trim(e).length > 0) {
					self.append("<div class='code-line'>" + e + "</div>");
				} else {
					self.append("<div class='code-line'>&nbsp;</div>");
				}
			}
		});

		this.contentEditable = true;
		self.css("border", "1px solid #333");

		self.keypress(__keyPress);
	});





	function __debug(obj, txt)
	{
		if (window.console && window.console.log)
			window.console.log( obj );

		$("#editdebug").text(txt || "debugging");
	};

	function __doTimer()
	{
		console.log(self);
		window.setTimeout(function(){
			console.log(self);
		}, 300);
	}

	function __endTimer()
	{
		__debug("Timer ended", "Timer ended");
	}

	function __keyPress(e)
	{
		__debug(this);

		// this == el elemento editor (#editme)
		// e.target == e.currentTarget también es el editor... :-(
		switch (e.keyCode) {
			case 13:
				__breakLine(window.getSelection());
				__doTimer();

				e.preventDefault();
				break;
		}

		var sel = window.getSelection();
//		__debug(sel);
	}


	/*
	 *  El cursor está al principio del texto:
	 *  anchorNode == div#editme && parentNode == body
	 *
	 *  El cursor está al final del texto:
	 *  anchorNode == div.code-line  && parentNode = div#editme
	 *
	 *  En cualquier otro caso:
	 *  anchorNode == "texto (3)" && parentNode = div.code-line
	 */
	function __breakLine(e)
	{
		var anode = e.anchorNode;
		var pnode = e.anchorNode.parentNode;

		// Insertamos al principio...
		if ($(anode).is("#editme")) {
			__debug( self /* __lineFormat("&nbsp;") */ );
		}

//		__debug(e.anchorNode);
//		__debug(e.anchorNode.parentNode);
	}


	function __lineFormat(txt) {
    	return "<class='code-line'>" + txt + "</div>";
  	};


  	$.fn.edit.defaults = {
    	foreground: "red",
    	background: "yellow"
  	};


/*
	function setEditable() {
      // In IE, designMode frames can not run any scripts, so we use
      // contentEditable instead.
      if (document.body.contentEditable != undefined && internetExplorer)
        document.body.contentEditable = "true";
      else
        document.designMode = "on";

      document.documentElement.style.borderWidth = "0";
      if (!options.textWrapping)
        container.style.whiteSpace = "nowrap";
    }
*/
};
  
})(jQuery);

