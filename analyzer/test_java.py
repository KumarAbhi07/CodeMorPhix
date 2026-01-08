#!/usr/bin/env python3
"""Test Java analyzer"""

import sys
sys.path.insert(0, '.')

from java_analyzer import analyze_java

# Test nested loops - should be O(n^2)
java_code = """
public class Test {
    public static void main(int n) {
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                System.out.println(i+j);
            }
        }
    }
}
"""

result = analyze_java(java_code)
print(f"Java Test (nested loops):")
print(f"  Expected: O(n^2)")
print(f"  Got:      {result['time']}")
print(f"  Space:    {result['space']}")
print(f"  Issues:   {result['issues']}")
print(f"  Status:   {'✅ PASS' if result['time'] == 'O(n^2)' else '❌ FAIL'}")
