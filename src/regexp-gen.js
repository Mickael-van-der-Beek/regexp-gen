var RegExpTree = require('regexp-tree');
var regExpTree = new RegExpTree();

module.exports = (function () {
	'use strict';

	function RegExpGen () {}

	RegExpGen.prototype.gen = function (regexp) {
		var tree = regExpTree.parse(regexp);
	};

	return RegExpGen;
})();
