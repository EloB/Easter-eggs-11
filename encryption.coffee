# This encryption can be used on both back- and frontend.

encryption = 
	secret: ((value) ->	value.charCodeAt(i) for i in [0...value.length] by 1) 'Martina'
	hexIndex: ((min, max) ->
		for i in [min..max] by 1
			(if (hex = i.toString(16)).length is 1 then '0' + hex else hex)
	) 0, 255
	dehexIndex: ((min, max) ->
		obj = {}
		
		for i in [min..max] by 1
			hex = '0' + hex if (hex = i.toString(16)).length is 1 
			
			obj[hex] = i
		
		obj
	) 0, 255
	###*
	* Get the encrypted value
	* @namespace App
	* @param value {string}
	* @return {string}
	###
	crypt: (value) ->
		j = @secret.length
	
		result = "";
		
		result += @hexIndex[value.charCodeAt(i) ^ @secret[i % j]] for i in [0...value.length] by 1
	
		result
	###*
	* Get the decrypted value
	* @namespace App
	* @param value {string}
	* @return {string}
	###
	decrypt: (value) ->
		j = @secret.length
		
		result = ""
		
		for i in [0...value.length] by 2
			result += String.fromCharCode @dehexIndex[value.substr i, 2] ^ @secret[(i / 2) % j]
		
		result

if exports
	module.exports = encryption
else
	window.encryption = encryption

### Benchmark
i = 1000000

console.time 'Benchmark'
encryption.decrypt encryption.crypt 'olle.broms@ewebbyran.se' while(i--)
console.timeEnd 'Benchmark'
###