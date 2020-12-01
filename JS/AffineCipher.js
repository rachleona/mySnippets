const defaultKeys = [[3, 5]]
const encrypt = (plaintext, keys=defaultKeys) => {
    const chars = plaintext.split("")
    const res = keys.map(([a, b]) => 
        chars.map( c => {
            const char = c.charCodeAt(0)
            if(char > 64 && char < 91)
            {
                return String.fromCharCode(65 + ((char - 65) * a + b) % 26)
            }
            else if(char > 96 && char < 123)
            {
                return String.fromCharCode(97 + ((char - 97) * a + b) % 26)
            }
            else
            {
                return String.fromCharCode(char)
            }
        })
    )

    return res.map( (r, i) => { return { key: keys[i], result: r.join("") } } )
}


