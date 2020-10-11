const vernamEncrypt = (str, key) => {
    if(str.length !== key.length) return "Invalid key"

    const chars = str.split("")
    const keys = key.split("")

    const res = chars.map( (c, i) => {
        const char = c.charCodeAt(0)
        const k = keys[i].charCodeAt(0)

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
            return String.fromCharCode(char)
        }
    })

    return res
}