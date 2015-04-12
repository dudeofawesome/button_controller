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
			buttons[i].triggerClickCallback();
		} else if (buttons[i].triggerEndClickCallback !== null && buttons[i].button.read() === 0 && buttons[i].downLastTick) {
			buttons[i].triggerEndClickCallback();
		}
		if (buttons[i].triggerDownCallback !== null && buttons[i].button.read() === 1) {
			buttons[i].triggerDownCallback();
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