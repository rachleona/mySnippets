const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const countAlphabets = (str, a=alphabets) => {
    const s = str.toUpperCase()
    const res =[...Array(a.length).keys()].map( v => 0 )
    
    s.split("").map( c => {
        const i = a.findIndex( v => v == c )
        if(i >= 0) res[i] += 1
    })

    return a.reduce( (obj, key, id) => { return { ...obj, [key]: res[id] } }, {} )
}
