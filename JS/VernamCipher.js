const vernamEncrypt = (str, key) => {
    // vernam cipher requires key to be same length as str
    if(str.length !== key.length) return "Invalid key"

    const chars = str.split("")
    const keys = key.split("")

    const res = chars.map( (c, i) => {
        const char = c.charCodeAt(0)
        // get shift from corresponding position at key string 
        const k = keys[i].charCodeAt(0)

        // uppercase
        if(char > 64 && char < 91)
        {
            return String.fromCharCode(65 + (char + k) % 65 % 26)
        }
        // lowercase
        else if(char > 96 && char < 123)
        {
            return String.fromCharCode(97 + (char + k) % 97 % 26)
        }
        // keep none alphabets untouched
        else
        {
            return String.fromCharCode(char)
        }
    })

    return res
}
