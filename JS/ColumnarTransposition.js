const encrypt = (plaintext, key) => {
    // arrange key and convert it to interpreted order to swap by e.g "ACB" -> [0, 2, 1]
    const k = key.split("").sort().map( v => key.indexOf(v) )
    const len = k.length
    const chars = plaintext.split("")

    let matrix = []

    for(let i = 0; i < chars.length; i += len)
    {
        // get substring of key length
        let arr = []
        for(let j = 0; j < len; j++)
        {
            if(!chars[i + j]) break
            arr.push(chars[i + j])
        }
        
        // padding if string not long enough
        arr = arr.length == len ? arr : arr.concat(Array(len).fill('X')).slice(0, len) 
        
        // rearrange 
        let res = [] 
        arr.map( (v, i) => {
            res[k.indexOf(i)] = v
        })
    
        matrix.push(res)
    }

    let ciphertext = ""
    
    // turn matrix into string column by column
    for(let i = 0; i < len; i++)
    {
        matrix.map( row => {
            ciphertext += row[i]
        })
    }

    return ciphertext
}

const decrypt = (ciphertext, key) => {
    // get swap order
    const k = key.split("").sort().map( v => key.indexOf(v) )
    const len = k.length
    const chars = ciphertext.split("")
    // get number of rows (each row should be length of key)
    const rows = Math.floor(chars.length / len)
    const matrix = Array(rows)

    // convert to matrix by column
    for(let i = 0; i < chars.length; i++)
    {
        let index = i % rows
        if(!matrix[index]) matrix[index] = []
        matrix[index].push(chars[i])
    }
    
    // rearrange
    const plaintext = matrix.map( row => {
        let arr = []
        for(let i = 0; i < len; i++)
        {
            arr[k[i]] = row[i]
        }
        return arr
    }).reduce( (acc, cur) => {
        return [...acc, ...cur]
    }, [])

    return plaintext.join("")
    
}
