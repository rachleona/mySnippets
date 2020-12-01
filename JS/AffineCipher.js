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

const decrypt = (ciphertext, keys=defaultKeys) => {
    const chars = ciphertext.split("")
    const res = keys.map(([a, b]) => {
        const cipheredAlph = [...Array(26).keys()].map( x => {
            return (x * a + b) % 26
        })

        return chars.map(c => {
            const char = c.charCodeAt(0)
            if(char > 64 && char < 91)
            {
                return String.fromCharCode(65 + cipheredAlph.indexOf(char - 65))
            }
            else if(char > 96 && char < 123)
            {
                return String.fromCharCode(97 + cipheredAlph.indexOf(char - 97))
            }
            else
            {
                return String.fromCharCode(char)
            }
        })
    })

    return res.map( (r, i) => { return { key: keys[i], result: r.join("") } } )
}

