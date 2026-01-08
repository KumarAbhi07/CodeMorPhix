#!/usr/bin/env python3
"""Test C++ analyzer"""

import sys
sys.path.insert(0, '.')

from cpp_analyzer import analyze_cpp

# Test 1: Single loop - should be O(n)
cpp_code_single = """
for(int i=0;i<n;i++){
  cout<<i;
}
"""

result = analyze_cpp(cpp_code_single)
print(f"C++ Test 1 (single loop):")
print(f"  Expected: O(n)")
print(f"  Got:      {result['time']}")
print(f"  Space:    {result['space']}")
print(f"  Issues:   {result['issues']}")
print(f"  Status:   {'✅ PASS' if result['time'] == 'O(n)' else '❌ FAIL'}")
print()

# Test 2: Nested loops - should be O(n^2)
cpp_code_nested = """
for(int i=0;i<n;i++){
  for(int j=0;j<n;j++){
    cout<<i*j;
  }
}
"""

result2 = analyze_cpp(cpp_code_nested)
print(f"C++ Test 2 (nested loops):")
print(f"  Expected: O(n^2)")
print(f"  Got:      {result2['time']}")
print(f"  Space:    {result2['space']}")
print(f"  Issues:   {result2['issues']}")
print(f"  Status:   {'✅ PASS' if result2['time'] == 'O(n^2)' else '❌ FAIL'}")
