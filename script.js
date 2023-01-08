$(window).on("load",function(){
    $(".loader").fadeOut(1000);
    delay(1000).then(() => $(".content").fadeIn(1000));
})

// Adds delay
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

// Encryption 
function submit_input() {
    var input = document.getElementById("unencrypted").value
    encrypt(input, document.getElementById("shift").value)
}

// Decryption
function submit_output() {
    var input = document.getElementById("encrypted").value
    decrypt(input, 2)
}

function encrypt(string, n) {
    const allowed_characters = ["A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", 
    "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", 
    "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"]

    const allowed_numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ]

    const allowed_symbols = ["!", "$", "%", "&", "?", "#"]

    var updated_characters = []
    updated_characters = allowed_characters.slice()

    var updated_numbers = []
    updated_numbers = allowed_numbers.slice()

    var updated_symbols = []
    updated_symbols = allowed_symbols.slice()

    // Shift Characters Array
    for (let i = 0; i < n*2; i++) {
        // Shift Characters
        var x = updated_characters.shift()
        updated_characters.push(x)
    }

    // Shift Numbers Array
    for (let i = 0; i < n; i++) {
        // Shift Numbers
        var y = updated_numbers.shift()
        updated_numbers.push(y)
    }

    // Shift Symbols Array
    for (let i = 0; i < n; i++) {
        // Shift Symbols
        var y = updated_symbols.shift()
        updated_symbols.push(y)
    }

    //Replace Characters
    var new_string = string
    
    for (let i = 0; i < new_string.length; i++) {
        // Character at index i is symbol
        if (allowed_symbols.includes(new_string[i])) {
            var replace_character = updated_symbols[allowed_symbols.indexOf(new_string[i])]
            new_string = new_string.replaceAt(i, replace_character)
        }

        // Character at index i is letter
        else if (isNaN(new_string[i])) {
            var replace_character = updated_characters[allowed_characters.indexOf(new_string[i])]
            new_string = new_string.replaceAt(i, replace_character)
        }

        // Character at index i is number
        else {
            var replace_number = updated_numbers[allowed_numbers.indexOf(new_string[i])]
            new_string = new_string.replaceAt(i, replace_number.toString())
        }
    }

    //Update Output
    document.getElementById("encrypted").value = new_string
}

function decrypt(string, n) {
    const allowed_characters = ["A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", 
    "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", 
    "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"]

    const allowed_numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ]

    const allowed_symbols = ["!", "$", "%", "&", "?", "#"]

    var new_string = string
    
    var updated_characters = []
    updated_characters = allowed_characters.slice()

    var updated_numbers = []
    updated_numbers = allowed_numbers.slice()

    var updated_symbols = []
    updated_symbols = allowed_symbols.slice()

    // Shift Characters Array
    for (let i = 0; i < n*2; i++) {
        // Shift Characters
        var x = updated_characters.shift()
        updated_characters.push(x)
    }

    // Shift Numbers Array
    for (let i = 0; i < n; i++) {
        // Shift Numbers
        var y = updated_numbers.shift()
        updated_numbers.push(y)
    }

    // Shift Symbols Array
    for (let i = 0; i < n; i++) {
        // Shift Symbols
        var y = updated_symbols.shift()
        updated_symbols.push(y)
    }

    for (let i = 0; i < new_string.length; i++) {
        // Character at index i is symbol
        if (allowed_symbols.includes(new_string[i])) {
            var replace_character = allowed_symbols[updated_symbols.indexOf(new_string[i])]
            new_string = new_string.replaceAt(i, replace_character)
        }

        // Character at index i is letter
        else if (isNaN(new_string[i])) {
            var replace_character = allowed_characters[updated_characters.indexOf(new_string[i])]
            new_string = new_string.replaceAt(i, replace_character)
        }

        // Character at index i is number
        else {
            var replace_number = allowed_numbers[updated_numbers.indexOf(new_string[i])]
            new_string = new_string.replaceAt(i, replace_number.toString())
        }
    }

    //Update Output
    document.getElementById("unencrypted").value = new_string
}


String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}