const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

// take in alphabets as argument to allow usage in different languages
const countAlphabets = (str, a=alphabets) => {
    // turn to uppercase (if possible)
    const s = str.toUpperCase()
    // initialise results corresponding to each alphabet in given set
    const res =[...Array(a.length).keys()].map( v => 0 )
    
    
    s.split("").map( c => {
        const i = a.findIndex( v => v == c )
        if(i >= 0) res[i] += 1
    })

    // return each alphabet and frequency in object format
    return a.reduce( (obj, key, id) => { return { ...obj, [key]: res[id] } }, {} )
}
