module.exports = {
	add: function (gpio, click, down, longClick, endClick) {
		var placeInArray = -1;
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].button.number === gpio) {
				buttons[i] = new Button (gpio, click, down, longClick, endClick);
				startCheckingButtons();
				return "Overwrote old callbacks";
			}
		}

		if (placeInArray === -1) {
			buttons.push(new Button (gpio, click, down, longClick, endClick));
			startCheckingButtons();
			return "Callbacks added successfully"
		}
	},
	remove: function (gpio) {
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].button.number === gpio) {
				buttons.splice(i, 1);
				if (buttons.length <= 0) {
					stopCheckingButtons();
				}
				return "Removed callbacks";
			}
		}
		return "Could not find callbacks for button on " + gpio;
	},
	setLongClickTime: function (duration) {
		longClickTime = duration;
	}
};



var mraa = require('mraa');
var buttons = [];
var longClickTime = 300;

function startCheckingButtons () {
	if (buttonInterval == null) {
		buttonInteral = setInterval(buttonFunc, BUTTON_FREQUENCY);
	}
}
function stopCheckingButtons () {
	if (buttonInterval != null) {
		buttonInteral = null;
	}
}

var buttonFunc = function () {
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].clickCallback != null && buttons[i].button.read() === 1 && !buttons[i].downLastTick) {
			buttons[i].clickCallback();
			buttons[i].timePressed = (new Date()).getTime();
		} else if (buttons[i].endClickCallback != null && buttons[i].button.read() === 0 && buttons[i].downLastTick) {
			buttons[i].endClickCallback();
		} else if (buttons[i].longClickCallback != null && buttons[i].button.read() === 1 && (new Date()).getTime() - buttons[i].timePressed >= longClickTime) {
			// TODO: make the button stop calling longClicked after first time
			buttons[i].longClickCallback();
		}
		if (buttons[i].downCallback != null && buttons[i].button.read() === 1) {
			buttons[i].downCallback();
		}
		
		if (buttons[i].button.read() === 1) {
			buttons[i].downLastTick = true;
		} else {
			buttons[i].downLastTick = false;
		}
	}
};
var BUTTON_FREQUENCY = 1000 / 60;
var buttonInterval = null;


function Button (gpio, click, down, longClick, endClick) {
	this.number = gpio;
	this.button = new mraa.Gpio(gpio);
	this.button.dir(mraa.DIR_IN);
	this.timePressed = 0;
	this.downLastTick = false;
	this.clickCallback = click;
	this.downCallback = down;
	this.longClickCallback = longClick;
	this.endClickCallback = endClick;
}
