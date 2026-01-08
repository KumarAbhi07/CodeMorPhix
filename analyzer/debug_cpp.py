#!/usr/bin/env python3
"""Debug C++ recursion detection"""

import re

code = """
for(int i=0;i<n;i++){
  for(int j=0;j<n;j++){
    cout<<i*j;
  }
}
"""

func_match = re.search(r'(\w+)\s*\([^)]*\)\s*\{', code)
print(f"Function match: {func_match}")

# It's matching 'for' from the regex itself!
# Let's be more careful

func_match = re.search(r'(int|void|bool|double|float)\s+(\w+)\s*\([^)]*\)\s*\{', code)
print(f"Better match: {func_match}")

# Actually, the test code doesn't have a function definition!
# Let's check what's happening

print("\nSearching in code:")
print(repr(code))
print("\nMatches for r'(\\w+)\\s*\\([^)]*\\)\\s*{':")
for match in re.finditer(r'(\w+)\s*\([^)]*\)\s*\{', code):
    print(f"  Match: {match.group(1)} at {match.start()}")
