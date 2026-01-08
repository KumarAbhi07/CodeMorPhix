#!/usr/bin/env python3
"""Direct test of analyze.py"""

import ast
import sys

# Add current directory to path
sys.path.insert(0, '.')

from complexity_analyzer import ComplexityAnalyzer

def analyze_code(code):
    tree = ast.parse(code)
    analyzer = ComplexityAnalyzer()
    analyzer.visit(tree)

    print(f"DEBUG: recursive_calls={analyzer.recursive_calls}, dividing_recursion={analyzer.dividing_recursion}")

    # -------- TIME COMPLEXITY --------
    # O(n log n): 2 recursive calls with division
    if analyzer.recursive_calls >= 2 and analyzer.dividing_recursion:
        time = "O(n log n)"
    # O(2^n): Multiple recursive calls without division (exponential)
    elif analyzer.recursive_calls > 1:
        time = "O(2^n)"
    # O(log n): Single recursive call with division
    elif analyzer.recursive_calls == 1 and analyzer.dividing_recursion:
        time = "O(log n)"
    # O(n log n): Single recursive call with nested loop
    elif analyzer.recursive_calls == 1 and analyzer.max_loop_depth >= 1:
        time = "O(n log n)"
    # O(log n): Halving loop
    elif analyzer.halving_loop:
        time = "O(log n)"
    # O(1): No loops or recursion
    elif analyzer.max_loop_depth == 0:
        time = "O(1)"
    # O(n): Single loop
    elif analyzer.max_loop_depth == 1:
        time = "O(n)"
    # O(n^k): Multiple nested loops
    else:
        time = f"O(n^{analyzer.max_loop_depth})"

    return time

code = """
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr)//2
    return merge_sort(arr[:mid]) + merge_sort(arr[mid:])
"""

result = analyze_code(code)
print(f"Result: {result}")
