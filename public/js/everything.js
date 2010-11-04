// I'll be your everything.


// ...unless you're using Internet Explorer, in which case you
// can fuck off until you've switched to Chrome or Firefox.
if ($.browser.msie) {
	alert('You’re being redirected to Google where you can download Chrome, a browser that is capable of displaying modern websites. If you don’t want to switch, I recommend banging your head into a wall — it’ll accomplish the same thing much faster.');
	window.location = "http://google.com/chrome";
}


var lightning = {
	fps: 1132,
	mile: 5280,

	calc: function(seconds) {
		var result = {
			distance: 0,
			units: 'feet'
		};
	
		seconds = parseFloat(seconds);
	
		result.distance = Math.round(seconds * this.fps);
		
		if (result.distance > this.mile) {
			result.distance = Math.round(result.distance / this.mile * 10) / 10;
			if (result.distance != 1) {
				result.units = 'miles';
			} else {
				result.units = 'mile';
			}
		}
	
		return result;
	}
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function lightswitch(link) {
	var $body = $('body');
	
	if ($body.hasClass('dark')) {
		$body.removeClass('dark');
		$(link).text('Turn the lights off.');
	} else {
		$body.addClass('dark');
		$(link).text('Turn the lights on.');
	}
}

$(function(){
	$('#seconds').bind('keyup change', function(){
		var seconds = jQuery.trim( $(this).val() );
		var message = false;
		
		if (seconds.length == 0) {
			message = "I didn’t see the lightning or hear the thunder – you’ll have to <strong>tell me how long it took</strong>.<br><strong>&larr; &larr; &larr;</strong>";
		} else if (!isNumeric(seconds)) {
			message = "How many seconds are in “" + $('<div/>').text(seconds).html() + "”?";
		} else if (seconds == 0) {
			message = "<strong>Direct hit captain!</strong>";
		} else if (seconds > 120) {
			message = "<strong>Quit counting already.</strong> You can only hear thunder from about 10 miles away. You’ve been counting for way too long.";
		} else if (seconds > 60) {
			message = "<strong>Quit counting already.</strong> You can only hear thunder from about 10 miles away. You’ve been counting for an extra " + parseInt(seconds - 47) + " seconds.";
		} else if (seconds < 0) {
			message = "Can I borrow your time machine? I have some lotto tickets to buy.";
		} else {
			var result = lightning.calc(seconds);
			var multiplier = '';
			var punctuation = '!';
			
			if (result.units == 'feet') {
				if (result.distance < 200) {
					multiplier = 'an exhilarating ';
				} else if (result.distance < 1000) {
					multiplier = 'a very close ';
				} else if (result.distance < 2500) {
					multiplier = 'a close ';
				} else if (result.distance < 5280) {
					multiplier = 'only ';
				} else {
					punctuation = '.';
				}
			} else {
				punctuation = '.';
				if (result.distance > 8) {
					multiplier = 'a safe ';
				} else if (result.distance > 4.5) {
					multiplier = 'a somewhat safe ';
				}
			}
			
			if (isNumeric(result.distance)) {
				message = 'That lightning strike was ' + multiplier + '<strong>' + result.distance + ' ' + result.units + '</strong> away' + punctuation;
			}
		}
		
		if (message) {
			$('#answer').html(message);
		}
	}).bind('click', function(){
		$(this).val('');
	});
	
	$('#seconds').change();
});