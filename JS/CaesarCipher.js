const allShifts = [...Array(25).keys()].map( n => n + 1 )

// takes array of numbers as keys, returns ciphertext shifted by each key
// allow force substitution option, where everything is encrypted into any ascii chracter (not just alphabets)
const cipher = (str, keys=allShifts, force=false) => {
    
    if(force)
    {
        const chars = str.split("")
        const res = keys.map( key => {
            return chars.map( c => {
                const char = c.charCodeAt(0)
                const code = char + key
                
                // code can be smaller than 0 when deciphering
                return String.fromCharCode(code < 0 ? (256 + code) % 256 : code % 256)
            })
        })

        return res.map( (r, i) => { return { key: keys[i] > 0 ? keys[i] : 0 - keys[i] , result: r.join("") } } )
    }

    // normal caesar cipher (alphabets only)
    const chars = str.split("")
    const res = keys.map( key => {
        return chars.map( c => {
            const char = c.charCodeAt(0)
            // uppercase characters
            if(char > 64 && char < 91)
            {
                return String.fromCharCode(65 + (char + key) % 65 % 26)
            }
            // lowercase
            else if(char > 96 && char < 123)
            {
                return String.fromCharCode(97 + (char + key) % 97 % 26)
            }
            // leave everything else untouched
            else
            {
                return String.fromCharCode(char)
            }
        })
    })

    // return result specifying which key it was encrypted with
    return res.map( (r, i) => { return { key: keys[i], result: r.join("") } } )
}

// decipher by using caesar cipher on str with the reverse keys
const decipher = (str, key=allShifts, force=false) => {
    
    if(force)
    {
        const keys = key.map( v => 0 - v)
        return cipher(str, keys, true)
    }
   
    const keys = key.map( v => 26 - v % 26 )
    return cipher(str, keys)
}
