const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// takes 26 items array as keys for encrypting the alphabets, can be anything from symbols to digits, but must be unique
// also optional encryption of numbers in the same way
const substitute = (str, keys, nums=numbers) => {
    if(keys.length !== 26 || nums.length !== 10) return "Invalid keys"

    // all lowercase to ease encryption
    const chars = str.toLowerCase().split("")
    const res = chars.map( c => {
        const char = c.charCodeAt(0)
        // if alphabet, replace with character from keys array
        if(char > 96 && char < 123)
        {
            return keys[char % 97]
        }
        // if digit replace from nums array
        else if(char > 47 && char < 58)
        {
            return nums[char % 48]
        }
        // leave others untouched
        else
        {
            return String.fromCharCode(char)
        }
    })

    return res.join("")
}
