#!/usr/bin/env python3
"""Test script for complexity analyzer"""

from analyze import analyze_code

def test_case(name, code, expected_time):
    try:
        result = analyze_code(code)
        time = result["time"]
        space = result["space"]
        
        status = "✅" if time == expected_time else "❌"
        print(f"{status} {name}")
        print(f"   Expected: {expected_time}, Got: {time}, Space: {space}")
        return time == expected_time
    except Exception as e:
        print(f"❌ {name}")
        print(f"   Error: {str(e)}")
        return False

# Test cases
print("=" * 60)
print("TESTING COMPLEXITY ANALYZER")
print("=" * 60)

test_case("O(1) - Constant", """
a = 5
b = a + 1
""", "O(1)")

test_case("O(n) - Linear", """
for i in range(n):
    print(i)
""", "O(n)")

test_case("O(log n) - Logarithmic", """
while n > 1:
    n //= 2
""", "O(log n)")

test_case("O(n²) - Quadratic", """
for i in range(n):
    for j in range(n):
        pass
""", "O(n^2)")

test_case("O(n log n) - Merge Sort", """
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr)//2
    return merge_sort(arr[:mid]) + merge_sort(arr[mid:])
""", "O(n log n)")

test_case("O(2^n) - Fibonacci", """
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
""", "O(2^n)")

print("=" * 60)
