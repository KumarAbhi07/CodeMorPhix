#!/usr/bin/env python3
"""Comprehensive multi-language test"""

import sys
sys.path.insert(0, '.')

from analyze import analyze_code
from java_analyzer import analyze_java
from cpp_analyzer import analyze_cpp

print("=" * 70)
print("MULTI-LANGUAGE COMPLEXITY ANALYZER TEST")
print("=" * 70)
print()

# Python Tests
print("✅ PYTHON TESTS")
print("-" * 70)

python_tests = [
    ("O(1)", "a = 5\nb = a + 1"),
    ("O(n)", "for i in range(n):\n    print(i)"),
    ("O(n^2)", "for i in range(n):\n    for j in range(n):\n        pass"),
    ("O(2^n)", "def fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)"),
]

for expected, code in python_tests:
    result = analyze_code(code)
    status = "✅" if result['time'] == expected else "❌"
    print(f"{status} {expected:12} -> {result['time']}")

print()
print("✅ JAVA TESTS")
print("-" * 70)

java_tests = [
    ("O(1)", "public class T { public static void main(int n) { int a = 5; } }"),
    ("O(n)", "public class T { public static void main(int n) { for(int i=0;i<n;i++) {} } }"),
    ("O(n^2)", "public class T { public static void main(int n) { for(int i=0;i<n;i++) { for(int j=0;j<n;j++) {} } } }"),
]

for expected, code in java_tests:
    result = analyze_java(code)
    status = "✅" if result['time'] == expected else "❌"
    print(f"{status} {expected:12} -> {result['time']}")

print()
print("✅ C++ TESTS")
print("-" * 70)

cpp_tests = [
    ("O(1)", "int main() { int a = 5; }"),
    ("O(n)", "void process(int n) { for(int i=0;i<n;i++) {} }"),
    ("O(n^2)", "void process(int n) { for(int i=0;i<n;i++) { for(int j=0;j<n;j++) {} } }"),
]

for expected, code in cpp_tests:
    result = analyze_cpp(code)
    status = "✅" if result['time'] == expected else "❌"
    print(f"{status} {expected:12} -> {result['time']}")

print()
print("=" * 70)
print("ALL TESTS COMPLETED")
print("=" * 70)
