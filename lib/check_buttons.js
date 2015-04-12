module.exports = {
	startCheckingButtons: function () {
		if (buttonInterval === null) {
			buttonInteral = setInterval(buttonFunc, BUTTON_FREQUENCY);
		}
	},
	stopCheckingButtons: function () {
		if (buttonInterval !== null) {
			buttonInteral = null;
		}
	}
};




var buttonFunc = function () {
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].clickCallback !== null && buttons[i].button.read() === 1 && !buttons[i].downLastTick) {
			buttons[i].clickCallback();
			buttons[i].timePressed = (new Date()).getTime();
		} else if (buttons[i].endClickCallback !== null && buttons[i].button.read() === 0 && buttons[i].downLastTick) {
			buttons[i].endClickCallback();
		} else if (buttons[i].longClickCallback !== null && buttons[i].button.read() === 1 && (new Date()).getTime() - buttons[i].timePressed >= longClickTime) {
			buttons[i].longClickCallback();
		}
		if (buttons[i].downCallback !== null && buttons[i].button.read() === 1) {
			buttons[i].downCallback();
		}
		
		if (buttons[i].button.read() === 1) {
			buttons[i].downLastTick = true;
		} else {
			buttons[i].downLastTick = true;
		}
	}
}
var BUTTON_FREQUENCY = 1000 / 60;
var buttonInterval = null;