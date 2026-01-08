#!/usr/bin/env python3
"""Simulate server calling analyzers - Integration Test"""

import subprocess
import json
import sys

# Use the same Python executable
PYTHON_EXE = sys.executable

def test_command_execution(language, code, expected_complexity):
    """Test if server command execution works"""
    
    safe_code = json.dumps(code)
    
    if language == "python":
        cmd = [PYTHON_EXE, "analyze.py", safe_code]
    elif language == "java":
        cmd = [PYTHON_EXE, "java_analyzer.py", safe_code]
    elif language == "cpp":
        cmd = [PYTHON_EXE, "cpp_analyzer.py", safe_code]
    
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            cwd="."
        )
        
        if result.returncode != 0:
            print(f"❌ {language.upper()} execution failed")
            print(f"   Error: {result.stderr}")
            return False
        
        output = json.loads(result.stdout)
        actual = output['time']
        
        status = "✅" if actual == expected_complexity else "❌"
        print(f"{status} {language.upper():8} {expected_complexity:12} -> {actual}")
        return actual == expected_complexity
        
    except Exception as e:
        print(f"❌ {language.upper()} failed: {str(e)}")
        return False

print("=" * 70)
print("INTEGRATION TEST - Server Command Execution")
print("=" * 70)
print()

# Python Test
print("Testing Python Analyzer...")
test_command_execution("python", "for i in range(n):\n    print(i)", "O(n)")

# Java Test
print("\nTesting Java Analyzer...")
test_command_execution("java", 
    "public class T { public static void m(int n) { for(int i=0;i<n;i++){} for(int j=0;j<n;j++){} } }",
    "O(n)")

# C++ Test
print("\nTesting C++ Analyzer...")
test_command_execution("cpp",
    "void f(int n) { for(int i=0;i<n;i++) { cout<<i; } }",
    "O(n)")

print()
print("=" * 70)
print("Integration Test Complete")
print("=" * 70)
