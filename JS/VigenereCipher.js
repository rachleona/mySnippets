const encrypt = (plaintext, key) => {
    const chars = plaintext.split("")
    const keys = key.toUpperCase().split("")
    const keylen = key.length
    let counter = 0

    const ciphertext = chars.map( (c, i) => {
        const k = keys[(i - counter) % keylen].charCodeAt(0) - 65
        const char = c.charCodeAt(0)
        
        if(char > 64 && char < 91)
        {
            return String.fromCharCode(65 + (char + k) % 65 % 26)
        }
        else if(char > 96 && char < 123)
        {
            return String.fromCharCode(97 + (char + k) % 97 % 26)
        }
        else
        {
            counter++
            return String.fromCharCode(char)
        }
    })

    return ciphertext.join("")
}

const decrypt = (ciphertext, key) => {
    const inverseKey = key.toUpperCase().split("").map( c => String.fromCharCode(156 - c.charCodeAt(0))).join("")
    return encrypt(ciphertext, inverseKey)
}
