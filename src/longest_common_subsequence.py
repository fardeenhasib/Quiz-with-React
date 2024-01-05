def longestCommonSubsequence(str1, str2):
    # Write your code here.
    edits = [["" for x in range(len(str1) + 1)] for y in range(len(str2) + 1)]
    for i in range(1, len(str2) + 1):
        for j in range(1, len(str1) + 1):
            if str2[i - 1] == str1[j - 1]:
                edits[i][j] = edits[i - 1][j - 1] + str2[i-1]
            else:
                edits[i][j] = max(edits[i - 1][j], edits[i][j-1], key=len)

    return list(edits[-1][-1])
