var RegExpTree = require('regexp-tree');
var regExpTree = new RegExpTree();

module.exports = (function () {
	'use strict';

	function RegExpGen () {
		this.isNumber = /^([0-9]+)$/;

		this.currGenerated = [];
	}

	RegExpGen.prototype.gen = function (regexp) {
		var tree = regExpTree.parse(regexp);

		console.log('TREE=', require('util').inspect(tree, {
			colors: true,
			depth: 10
		}));

		this.genGroup(tree);

		var combinations = this.genCombinations([''], 0, this.currGenerated);

		return combinations;
	};

	RegExpGen.prototype.genGroup = function (group) {
		var sequences = group.sequences;
		var generated;

		if (!Array.isArray(sequences)) {
			generated = this.genStringBoundaries(sequences);

			this.currGenerated.push(generated);
		}
		else {
			var sequence;

			for (var i = 0, len = sequences.length; i < len; i++) {
				sequence = sequences[i];
				generated = null;

				if (sequence.isGroup === true) {
					this.genGroup(sequence);
				}
				else if (sequence.isSet === true) {
					generated = this.genSet(sequence);
				}

				if (generated) {
					this.currGenerated.push(generated);
				}
			}
		}
	};

	RegExpGen.prototype.genSet = function (set) {
		var me = this;

		return set.ranges.reduce(function (boundaries, range) {
			if (me.isNumber.test(range[0]) && me.isNumber.test(range[1])) {
				boundaries = boundaries
					.concat(
						range[0] ? me.genNumberBoundaries(range[0]) : [],
						range[1] ? me.genNumberBoundaries(range[1]) : []
					);
			}
			else {
				boundaries = boundaries
				.concat(
					range[0] ? me.genStringBoundaries(range[0]) : [],
					range[1] ? me.genStringBoundaries(range[1]) : []
				);			
			}

			return boundaries;
		}, []);
	};

	RegExpGen.prototype.genStringBoundaries = function (string) {
		return [
			string.slice(0, -1) + String.fromCharCode(string.slice(-1).charCodeAt(0) - 1),
			string,
			string.slice(0, -1) + String.fromCharCode(string.slice(-1).charCodeAt(0) + 1),
		];
	};

	RegExpGen.prototype.genNumberBoundaries = function (number) {
		return [
			String(parseInt(number, 10) - 1),
			String(number),
			String(parseInt(number, 10) + 1),
		];
	};

	RegExpGen.prototype.genCombinations = function (combinations, index, group) {
		if (index === group.length) {
			return combinations;
		}

		var newCombinations = [];
		var combination;
		var boundaries;
		var boundary;

		for (var i = 0, ilen = combinations.length; i < ilen; i++) {
			combination = combinations[i];

			boundaries = group[index];

			for (var k = 0, klen = boundaries.length; k < klen; k++) {
				boundary = boundaries[k];

				newCombinations.push(
					combination + boundary
				);
			}
		}

		return this.genCombinations(newCombinations, index + 1, group);
	};

	return RegExpGen;
})();
