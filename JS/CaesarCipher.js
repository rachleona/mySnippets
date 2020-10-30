const allShifts = [...Array(25).keys()].map( n => n + 1 )
const cipher = (str, keys=allShifts, force=false) => {
    if(force)
    {
        const chars = str.split("")
        const res = keys.map( key => {
            return chars.map( c => {
                const char = c.charCodeAt(0)
                const code = char + key
                return String.fromCharCode(code < 0 ? (256 + code) % 256 : code % 256)
            })
        })

        return res.map( (r, i) => { return { key: keys[i] > 0 ? keys[i] : 0 - keys[i] , result: r.join("") } } )
    }

    const chars = str.split("")
    const res = keys.map( key => {
        return chars.map( c => {
            const char = c.charCodeAt(0)
            if(char > 64 && char < 91)
            {
                return String.fromCharCode(65 + (char + key) % 65 % 26)
            }
            else if(char > 96 && char < 123)
            {
                return String.fromCharCode(97 + (char + key) % 97 % 26)
            }
            else
            {
                return String.fromCharCode(char)
            }
        })
    })

    return res.map( (r, i) => { return { key: keys[i], result: r.join("") } } )
}

const decipher = (str, key=allShifts, force=false) => {
    const keys = key.map( v => 26 - v % 26 )
    return cipher(str, keys)
}
