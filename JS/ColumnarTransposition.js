const encrypt = (plaintext, key) => {
    const k = key.split("").sort().map( v => key.indexOf(v) )
    const len = k.length
    const chars = plaintext.split("")

    let matrix = []

    for(let i = 0; i < chars.length; i += len)
    {
        let arr = []
        for(let j = 0; j < len; j++)
        {
            arr.push(chars[i + j])
        }

        arr = arr.length == len ? arr : arr.concat(Array(len).fill('X')).slice(0, len) 

        let res = [] 
        arr.map( (v, i) => {
            res[k.indexOf(i)] = v
        })

        matrix.push(res)
    }

    let ciphertext = ""

    for(let i = 0; i < len; i++)
    {
        matrix.map( row => {
            ciphertext += row[i]
        })
    }

    return ciphertext
}

const decrypt = (ciphertext, key) => {
    const k = key.split("").sort().map( v => key.indexOf(v) )
    const len = k.length
    const chars = ciphertext.split("")
    const rows = Math.floor(chars.length / len)
    const matrix = Array(rows)

    for(let i = 0; i < chars.length; i++)
    {
        let index = i % rows
        if(!matrix[index]) matrix[index] = []
        matrix[index].push(chars[i])
    }
    
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
