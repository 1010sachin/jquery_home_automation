
// Dynamically create elements by reading from the settings.json file
function createElements() {

	list_elems =[];
	div_control = $('div.control').children('div').last();
	$.when( $.get('data/settings.json', function(data) {
		div_count = Object.keys(data).length;
		cnt = 0;
		while(cnt < Object.keys(data).length) {
			txt = Object.keys(data)[cnt]
			element = data[Object.keys(data)[cnt]]
			
			central = element.central
			
			if(element['label'] !== null) {
				var $newDiv = $("<div/>")
				.attr("id", Object.keys(data)[cnt])
				.addClass("block")

				div_control.append($newDiv)

				var $h3 = $("<h3/>")
				$h3.text(element.label)

				$newDiv.append($h3)
			}
			for(i=1; i<Object.keys(element).length; i++) {
				child = element[Object.keys(element)[i]]
					
				if(Object.keys(element)[i] != 'central') {
					if (Object.keys(child).length>1) {
						if(child.type=='checkbox') {
							var $childDiv = $("<div />")
							.addClass("toggle-block")
							$newDiv.append($childDiv);

							var $switchDiv = $("<div/>")
							.addClass("switch")
							$childDiv.append($switchDiv)

							var id_input = Object.keys(data)[cnt]+ '_'+ Object.keys(element)[i]
							var $input = $("<input  type='checkbox' class='cmn-toggle cmn-toggle-round'/>")
							.attr("id",id_input)

							$input[0].checked = child.val;

							var $label = $("<label />")
							.attr('for',id_input)

							$switchDiv.append($input)
							$switchDiv.append($label)

							var $span = $("<span/>")
							$span.text(child.label)

							$childDiv.append($span)
							
						}
						else if(child.type=='number') {
							var $childDiv = $("<div/>")
							var $input = $("<input type='number'/>")
								.attr("id",Object.keys(data)[cnt] + child.type)
								.addClass("temperature-input")
								.val(child.val)
							$newDiv.append($childDiv);
							$childDiv.append($input);
						}
					}
				}
			}
			if(central === null | central === undefined) {
				$div = $("<div/>")
				.attr("id",txt+'_display')
				.text(element.label)
				list_elems.push($div)
			}
			cnt++;
		}
	},'json')
	).done(function(a) {
		addDisplayControls(list_elems);
		return 1;
	})
}

function addDisplayControls(elements) {

	//Width of the display DIV
	var displaywidth  = $('#homedisplay').width();
	//Height of the control panel
	var height = $('.control').height();

	//No. of elements to be added to the display panel
	elems_count = elements.length;
	// Rows to be added to the display panel	
	rows = Math.ceil(elements.length/2)
	
	// Width of each element
	width_x = displaywidth

	//Check if the no. of elements is more than 1
	if(elems_count>1) {
		width_x = displaywidth/ 2;
	}
	//Calculate heigh of each elements
	height_x = height/rows

	$parentDiv = null
	var i =0;

	//Loop through all the elements
	elements.forEach(function(elem) {
		//Add a new parent DIV for each 2 elements
		if( i % 2 == 0) {
			$parentDiv = $("<div/>")
			$('#homedisplay').append($parentDiv)
		}
		elem.attr('class','model')
		elem.width(width_x - 10)
		elem.height(height_x)
		$parentDiv.append(elem)
		i++;
	})

	initSettings();
}

//Initialize the page with default settings from the settings.json
function initSettings() {
	$.each($("input[type='checkbox']"), function() {
		values = $(this).attr('id').split('_')
		css_class = values[1]
		display_id = values[0]+"_display"

		if($(this)[0].checked) {
			$('#'+display_id).addClass(css_class)
		}
		else {
			$('#'+display_id).removeClass(css_class)
		}
		
		// Add Events to the checkbox click
		$(this).on('change', function() {
			values = $(this).attr('id').split('_')
			css_class = values[1]
			display_id = values[0]+"_display"

			if($(this)[0].checked) {
				
				$('#'+display_id).addClass(css_class)
			}
			else {
				$('#'+display_id).removeClass(css_class)

			}
		})
	})

}

// Function when the page loads
$(document).ready(function() {
    createElements();
});








