// backtracking study


const isValidPos = (x, y, board) => 
    // check if (x. y) is a valid coordinate and not yet travelled to 
    x >= 0 && y >= 0 && x < board.length && y < board.length && board[y][x] == -1

const solveKT = n => {
    // generate chess board of size n
    const board = [...Array(n).keys()].map( v => 
        [...Array(n).keys()].map( () => -1 ) 
    )
    // start from coordinate [0][0]
    board[0][0] = 0
    let curStep = 1

    // eight possible moves by knight
    const moveX = [2, 1, -1, -2, -2, 1, -1, 2]
    const moveY = [1, 2, 2, 1, -1, -2, -2, -1]

    const res = backtrack(0, 0, curStep, board, moveX, moveY, n)
    if(!res)
    {
        console.log("No solution")
    }
    else
    {
        console.log(res)
    }

}

const backtrack = (x, y, cur, board, moveX, moveY, n) => {
    // recursively tries next move for knight

    for(let a = 0; a < 8; a++)
    {
        const newX = x + moveX[a]
        const newY = y + moveY[a]
        if(isValidPos(newX, newY, board))
        {
            board[newY][newX] = cur
            const res = backtrack(newX, newY, cur + 1, board, moveX, moveY, n)

            if(!res)
            {
                board[newY][newX] = -1
                continue
            }
            else
            {
                return res
            }
        }
    }

    return false
}
