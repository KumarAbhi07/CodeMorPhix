import re
import json
import sys

def analyze_cpp(code):
    """Pattern-based C++ complexity analyzer"""
    
    # Count loops
    loop_count = len(re.findall(r'\b(for|while)\s*\(', code))
    
    # Check for recursion - exclude keywords like for/while/if
    recursion = False
    cpp_keywords = {'for', 'while', 'if', 'else', 'switch', 'catch', 'synchronized', 'return', 'do'}
    
    func_match = re.search(r'(int|void|bool|double|float|string|auto|char|long|short)\s+(\w+)\s*\([^)]*\)\s*\{', code)
    if func_match:
        func_name = func_match.group(2)
        func_body_start = code.find('{', func_match.start())
        if func_body_start != -1:
            func_body = code[func_body_start:]
            # Look for actual function calls
            if re.search(r'\b' + re.escape(func_name) + r'\s*\(', func_body):
                recursion = True
    
    # Check for halving operations
    halving = bool(re.search(r'[/]=\s*2|\s*/\s*2|>>\s*1', code))
    
    # Check for array allocations
    allocations = len(re.findall(r'\b(new|vector|array|malloc|deque|list)\b', code))
    
    # Time complexity determination
    if recursion and loop_count > 0:
        time = "O(n log n)"
    elif recursion:
        time = "O(2^n)"
    elif halving:
        time = "O(log n)"
    elif loop_count == 0:
        time = "O(1)"
    elif loop_count == 1:
        time = "O(n)"
    else:
        time = f"O(n^{loop_count})"
    
    # Space complexity
    space = "O(1)"
    if recursion:
        space = "O(n)"
    elif allocations > 1:
        space = "O(n^2)"
    elif allocations > 0:
        space = "O(n)"
    
    # Issues
    issues = []
    if loop_count > 1:
        issues.append("Nested loops detected")
    if recursion:
        issues.append("Recursion detected")
    if halving:
        issues.append("Logarithmic operation detected")
    
    return {
        "time": time,
        "space": space,
        "confidence": "High" if loop_count > 1 or recursion else "Medium",
        "patterns": [
            f"{loop_count} loop(s) detected",
            "Recursion" if recursion else "No recursion"
        ],
        "issues": issues,
        "optimizations": [
            "Use efficient STL containers or reduce loop nesting"
            if loop_count > 1 else
            "Code is already efficient"
        ]
    }

if __name__ == "__main__":
    code = sys.argv[1]
    print(json.dumps(analyze_cpp(code)))
