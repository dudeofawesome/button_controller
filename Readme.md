Button Controller
=========

Ultra simple hardware button callbacks for Intel Edison

## Installation

```bash
$ npm install button_controller
```

## Usage

```js
var buttonController = require('button_controller')

buttonController.add(/*GPIO used*/ 1, function () {
  console.log("button clicked");
}, function () {
  console.log("button down");
}, function () {
  console.log("button click ended");
});
```