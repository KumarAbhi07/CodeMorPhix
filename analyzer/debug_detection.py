#!/usr/bin/env python3
"""Debug analyzer detection"""

from complexity_analyzer import ComplexityAnalyzer
import ast

code = """
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr)//2
    return merge_sort(arr[:mid]) + merge_sort(arr[mid:])
"""

tree = ast.parse(code)
analyzer = ComplexityAnalyzer()
analyzer.visit(tree)

print(f"recursive_calls: {analyzer.recursive_calls}")
print(f"dividing_recursion: {analyzer.dividing_recursion}")
print(f"halving_loop: {analyzer.halving_loop}")
print(f"max_loop_depth: {analyzer.max_loop_depth}")
