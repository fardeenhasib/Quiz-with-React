arr = [
    [1, 3, 4, 10],
    [2, 5, 9, 11],
    [6, 8, 12, 15],
    [7, 13, 14, 16]
]


def zigzagTraverse(array):
    # Write your code here.
    up = False
    ans = []
    rows, cols = len(array), len(array[0])
    last_ele = [0, -1]
    count = 0
    while len(ans) < rows * cols:
        if not up:  # going down
            if last_ele[1] < cols - 1:  # if last element's has a right element"
                # start from the right element and go diagonally left downwad until boundary
                i_, j_ = 0, last_ele[1] + 1
                while i_ < rows and j_ >= 0:
                    ans.append(array[i_][j_])
                    count += 1
                    last_ele = [i_, j_]
                    j_ -= 1
                    i_ += 1
            else:
                # start from the immediate bottom element if any and go diagonally left downwad until boundary
                i_, j_ = last_ele[0] + 1, cols - 1
                while i_ < rows and j_ >= 0:
                    ans.append(array[i_][j_])
                    count += 1
                    last_ele = [i_, j_]
                    j_ -= 1
                    i_ += 1
        else:  # going up
            if last_ele[0] < rows - 1:  # if last elemet has a bottom element:
                # start from the bottm element and go diagonally right upwad until boundary
                i_, j_ = last_ele[0] + 1, 0
                while i_ >= 0 and j_ < cols:
                    ans.append(array[i_][j_])
                    count += 1
                    last_ele = [i_, j_]
                    j_ += 1
                    i_ -= 1
            else:
                # start from the immediate right element if any and go diagonally right downwad until boundary
                i_, j_ = rows - 1, last_ele[1] + 1
                while i_ >= 0 and j_ < cols:
                    ans.append(array[i_][j_])
                    count += 1
                    last_ele = [i_, j_]
                    j_ += 1
                    i_ -= 1

        up = not up
        # if count == rows * cols:
        #     break

    return ans


print(zigzagTraverse(arr))
