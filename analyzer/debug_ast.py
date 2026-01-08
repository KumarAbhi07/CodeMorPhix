#!/usr/bin/env python3
"""Debug merge sort detection"""

import ast

code = """
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr)//2
    return merge_sort(arr[:mid]) + merge_sort(arr[mid:])
"""

tree = ast.parse(code)
print(ast.dump(tree, indent=2))
