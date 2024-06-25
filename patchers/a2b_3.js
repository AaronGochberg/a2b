//AARON GOCHBERG //MAY 2024
//HfMT Hamburg
//for ES5 in MAX/MSP

inlets = 1;
outlets = 1;

var bs = 0;

function a2b(input) {
	
	if (typeof input == "string") {
	
	var leadZeros = "00000000"; 			//to fill leading zeroes
	var converted = [];						//array for binary "strings"
	for (var i = 0; i < input.length; i++) {
		shortBin = input.charCodeAt(i).toString(2); 												//pulls corresponding UTF-16, toString(2) converts to binary
  		fullBin  = leadZeros.substring(0, leadZeros.length - shortBin.length) + shortBin;		//add leading zeros
		utf16 = input.charCodeAt(i);

  	converted.push(fullBin);
	}

	// post(bs);
	
	if (bs == 1) {
		outlet(0, converted.join(' '));
		} else {
			outlet(0, converted.join(''));
		}
	} else {
			error("input to a2b must be a string or symbol \n ...if using numbers, surround in double-qoutes \n");
		}
}

function a2u(str) {
		var unicodeArray = [];					//array to store UTF-16 codes
		
		for (var i = 0; i < str.length; i++) {
			utf16 = str.charCodeAt(i);
			unicodeArray.push(utf16)
	}
				
	outlet(0, unicodeArray);
	
}

function b2a(str) {
	var t = 8; 		//default value for bitstring formatting (no space)
	
	if (bs == 1) {
		t = 9;		// if "bistring" is set to 1, then format in eight-character chunks
		} else {
			t = 8;
		}	
		
	var binaryArray = str.match(new RegExp('.{1,' + t + '}', 'g')); 	//regex to split every 8 characters //???		
	//var binaryArray = str.split(" ");
		//if grouping into 8 digit binary sequences, can split with space
	var charCode = [];
	for (i = 0; i < binaryArray.length; i++) {
		charCode.push(String.fromCharCode(parseInt(binaryArray[i], 2))); 	// parseInt(2) is base2 for binary
		}
outlet(0, charCode.join(""));
}

function bitstring(a) {		
	bs = a;
	//post(bs);
}