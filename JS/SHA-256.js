const intToBytes = (int, size, endian=1) => {
    const res = Buffer.alloc(size)
    for(let i = 0; i < size; i++)
    {
        res[endian ? size - i - 1 : i] = int >>> (8 * i) & 255
        if(int < Math.pow(2, 8 * i)) break
    }
    return res
}

const addPadding = plaintext => {
    const buf = Buffer.from(plaintext)
    const size = buf.length
    const pad = Buffer.alloc(size % 64 < 56 ? 56 - size % 64 : 120 - size % 64)
    pad[0] = 0x80
    const length = intToBytes(size * 8, 8, 1)
    return Buffer.concat([buf, pad, length])
}

const makeBlocks = (bytes, size=64) => {
    let blocks = []
    for(let i = 0; i < bytes.length; i += size)
    {
        let data = Buffer.alloc(size)
        bytes.copy(data, 0, i)
        blocks.push(data)
    }

    return blocks
}

const loadWords = block => {
    const matrix = []
    for(let i = 0; i < block.length; i+=4)
    {
        let word = 0x00000000
        for(let j = 3; j > -1; j--)
        {
            word += block[i + j] * Math.pow(256, 3 - j)
        }
        matrix.push(word)
    }
    return matrix
}

const leftRotate = (word, num) => ((word << num) | (word >>> (32 - num)))


const hash = message => {
    const m = makeBlocks(addPadding(Buffer.from(message)))

    let h0 = 0x6a09e667
    let h1 = 0xbb67ae85
    let h2 = 0x3c6ef372
    let h3 = 0xa54ff53a
    let h4 = 0x510e527f
    let h5 = 0x9b05688c
    let h6 = 0x1f83d9ab
    let h7 = 0x5be0cd19
    
    const K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]

    for(let i = 0; i < m.length; i++)
    {
        const words = loadWords(m[i])
        for(let j = 16; j < 64; j++)
        {
            const s0 = leftRotate(words[j - 15], 25) ^ leftRotate(words[j - 15], 14) ^ (words[j - 15] >>> 3)
            const s1 = leftRotate(words[j - 2], 15) ^ leftRotate(words[j - 2], 13) ^ (words[j - 2] >>> 10)
            words.push((words[j - 16] + s0 + words[j - 7] + s1) >>> 0)
        }

        let A = h0,
            B = h1,
            C = h2,
            D = h3,
            E = h4,
            F = h5,
            G = h6,
            H = h7

        for(let x = 0; x < 64; x++)
        {
            const s1 = leftRotate(E, 26) ^ leftRotate(E, 21) ^ leftRotate(E, 7)
            const ch = (E & F) ^ (~E & G)
            const temp1 = H + s1 + ch + K[x] + words[x]
            const s0 = leftRotate(A, 30) ^ leftRotate(A, 19) ^ leftRotate(A, 10)
            const maj = (A & B) ^ (A & C) ^ (B & C)
            const temp2 = s0 + maj

            H = G
            G = F
            F = E
            E = (D + temp1) >>> 0
            D = C
            C = B
            B = A
            A = (temp1 + temp2) >>> 0

        }

        h0 = (h0 + A) >>> 0
        h1 = (h1 + B) >>> 0
        h2 = (h2 + C) >>> 0
        h3 = (h3 + D) >>> 0
        h4 = (h4 + E) >>> 0
        h5 = (h5 + F) >>> 0
        h6 = (h6 + G) >>> 0
        h7 = (h7 + H) >>> 0
    }

    return Buffer.concat([intToBytes(h0, 4), intToBytes(h1, 4), intToBytes(h2, 4), intToBytes(h3, 4), intToBytes(h4, 4), intToBytes(h5, 4), intToBytes(h6, 4), intToBytes(h7, 4)]).toString('hex')
}
