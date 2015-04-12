module.exports = {
	add: function (gpio, click, down, longClick, endClick) {
		var placeInArray = -1;
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].button.number === gpio) {
				buttons[i] = new Button (gpio, click, down, longClick, endClick);
				checkButtons.startCheckingButtons();
				return "Overwrote old callbacks";
			}
		}

		if (placeInArray === -1) {
			buttons.push(new Button (gpio, click, down, longClick, endClick));
			checkButtons.startCheckingButtons();
			return "Callbacks added successfully"
		}
	},
	remove: function (gpio) {
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].button.number === gpio) {
				buttons.splice(i, 1);
				if (button.length <= 0) {
					checkButtons.stopCheckingButtons();
				}
				return "Removed callbacks";
			}
		}
		return "Could not find callbacks for button on " + gpio;
	}
};


var checkButtons = require("./check_buttons");
var mraa = require('mraa');

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