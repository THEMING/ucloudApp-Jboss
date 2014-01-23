/*function adClass(comp){
	comp.removeClass("x-form-radio");
	comp.removeClass("x-form-field");
	comp.addClass("styled");
}*/
    	
var radioHeight = "21";

var radioContr = {
		init: function() {
		var inputs = document.getElementsByTagName("input");
		for(a = 0; a < inputs.length; a++) {
			if(inputs[a].type == "radio" && inputs[a].className == " x-form-radio x-form-field") {
				inputs[a].nextSibling.className = "radio";
				if(inputs[a].checked == true) {
					position = "0 -" + (radioHeight*2) + "px";
					inputs[a].nextSibling.style.backgroundPosition = position;
				}
			
				inputs[a].onchange = radioContr.clear;
				if(!inputs[a].getAttribute("disabled")) {
					inputs[a].nextSibling.onmousedown = radioContr.pushed;
					inputs[a].nextSibling.onmouseup = radioContr.check;
				} else {
					inputs[a].nextSibling.className = inputs[a].nextSibling.className += " disabled";
				}
			}
		}
		document.onmouseup = radioContr.clear;
	},
	pushed: function() {
		element = this.previousSibling;
		if(element.checked == true && element.type == "radio") {
			this.style.backgroundPosition = "0 -" + radioHeight*3 + "px";
		} else {
			this.style.backgroundPosition = "0 -" + radioHeight + "px";
		}
	},
	check: function() {
		element = this.previousSibling;
		this.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
		group = this.previousSibling.name;
		inputs = document.getElementsByTagName("input");
		for(a = 0; a < inputs.length; a++) {
			if(inputs[a].name == group && inputs[a] != this.previousSibling) {
				inputs[a].nextSibling.style.backgroundPosition = "0 0";
			}
		}
		element.checked = true;
	},
	clear: function() {
		inputs = document.getElementsByTagName("input");
		for(var b = 0; b < inputs.length; b++) {
			if(inputs[b].type == "radio" && inputs[b].checked == true && inputs[b].className == "x-form-radio x-form-field") {
				inputs[b].nextSibling.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
			} else if(inputs[b].type == "radio" && inputs[b].className == "x-form-radio x-form-field") {
				inputs[b].nextSibling.style.backgroundPosition = "0 0";
			}
		}
	}
}