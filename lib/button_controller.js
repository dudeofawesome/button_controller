module.exports = require("./manage_buttons");
module.exports.setLongClickTime = function (duration) {
	this.longClickTime = duration;
};

var buttons = [];
var longClickTime = 300;