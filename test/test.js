var RegExpGen = require('../src/regexp-gen');
// var regExpGen = new RegExpGen();

var assert = require('assert');

// console.log(regExpGen.gen(/[a-c](def)/));
// console.log(regExpGen.currGenerated);

// console.log(regExpGen.gen(/[a-zA-Z0-9_\.\-]@[a-zA-Z0-9\-]\.[a-zA-Z0-9]/));
// console.log('LEN=', regExpGen.gen(/[a-zA-Z0-9_\.\-]@[a-zA-Z0-9\-]\.[a-zA-Z0-9]/).length);

// console.log((new RegExpGen()).gen(/[a-zA-Z0-9_\.\-]@[a-zA-Z0-9\-]\.[a-zA-Z0-9]/));
// console.log('LEN=', (new RegExpGen()).gen(/[a-zA-Z0-9_\.\-]@[a-zA-Z0-9\-]\.[a-zA-Z0-9]/).length);

console.log((new RegExpGen()).gen(/abc[0-9]/));
console.log('LEN=', (new RegExpGen()).gen(/abc[0-9]/).length);

// console.log(regExpGen.currGenerated);
