var RegExpTree = require('regexp-tree');
var regExpTree = new RegExpTree();

module.exports = (function () {
	'use strict';

	function RegExpGen () {}

	RegExpGen.prototype.gen = function (regexp) {
		var tree = regExpTree.parse(regexp);

		return this.genGroup(regexp);
	};

	RegExpGen.prototype.genGroup = function (prevGenerated, group) {
		var sequences = group.sequences;
		var currGenerated = [];

		if (typeof sequences === 'string') {
			currGenerated.push(sequences);
		}
		else {
			var sequence;

			for (var i = 0, len = sequences.length; i < len; i++) {
				sequence = sequences[i];

				if (sequence.isGroup === true) {
					currGenerated.push(
						this.genGroup(prevGenerated, currGenerated)
					);
				}
				else if (sequence.isSet === true) {
					currGenerated.push(
						this.genSet(prevGenerated, currGenerated)
					);
				}
			}
		}

		return this.mergeGen(prevGenerated, currGenerated);
	};

	RegExpGen.prototype.genSet = function (prevGenerated, set) {
		
	};

	RegExpGen.prototype.mergeGen = function (prevGenerated, currGenerated) {
		var generated = [];

		for (var i = 0, lenPrev = prevGenerated.length; i < lenPrev; i++) {
			for (var k = 0, lenCurr = currGenerated.length; k < lenCurr; k++) {
				generated.push(prevGenerated[i] + currGenerated[k]);
			}
		}

		return generated;
	};

	return RegExpGen;
})();
