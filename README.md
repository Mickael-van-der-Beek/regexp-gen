RegExp-Gen
===========

RegExp-Gen generates data based on RegExps [`RegExp-Tree`](https://github.com/Mickael-van-der-Beek/regexp-tree).

The main purpose behind this library is to do two things:

	1. RegExp based data validation
	2. Re-use these RegExps to generate data

Thanks to RegExp sets like ```[a-z]```, we know what ranges of characters are valid and invalid.
This gives us the possibility to write software testing tools like fuzzers and boundary-value tests.
