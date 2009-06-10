jQuery.fn.edit = function()
{
	var elem = $(this);
	var lines = elem.text().split("\n");
	elem.text("");
	
	$.each(lines, function(i,e){
		
// console.log(i, e, jQuery.trim(e).length);

		if (jQuery.trim(e).length || (i && i<lines.length - 1)) {
			if (jQuery.trim(e).length > 0) {
				elem.append("<div class='code-line'>" + e + "</div>");
			} else {
				elem.append("<div class='code-line'>&nbsp;</div>");
			}
		}
	});

console.log(this);

	this[0].contentEditable = true;
	this.css("border", "1px solid #333");

	$(this).keypress(function(e){
			// this == el elemento editor (#editme)
			// e.target == e.currentTarget también es el editor... :-(
			if (e.keyCode == 13) {
				e.preventDefault();
				return;
			}

			var sel = window.getSelection();
//			console.log(window.getSelection());
			console.log(sel);
			console.log(sel.anchorNode.parentNode);
		});

/*
 * Para hacer el hover en modo "live"


		$(".code-line").live("mouseover", function(){
			$(this).css("background", "red");
		}).live("mouseout", function(){
			$(this).css("background", "transparent");
		});

*/


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



$(function(){
	$("#editme").edit();
});
