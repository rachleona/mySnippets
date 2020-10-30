const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const substitute = (str, keys, nums=numbers) => {
    if(keys.length !== 26 || nums.length !== 10) return "Invalid keys"

    const chars = str.toLowerCase().split("")
    const res = chars.map( c => {
        const char = c.charCodeAt(0)
        if(char > 96 && char < 123)
        {
            return keys[char % 97]
        }
        else if(char > 47 && char < 58)
        {
            return nums[char % 48]
        }
        else
        {
            return String.fromCharCode(char)
        }
    })

    return res.join("")
}