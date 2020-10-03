def factorial(num):
    if num == 1 or num == 0:
        return 1
    else:
        return num * factorial(num-1)

def combination(n, r):
    if (n or r) < 0 or r > n or not isinstance(n, int) or not isinstance(r, int):
        return "Invalid input"
    else:
        return factorial(n) / (factorial(r) * factorial(n-r))

def permutation(n, r):
    if (n or r) < 0 or r > n or not isinstance(n, int) or not isinstance(r, int):
        return "Invalid input"
    else:
        return factorial(n) / factorial(n-r)
