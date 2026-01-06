import json
import sys
from complexity_analyzer import ComplexityAnalyzer
import ast

def analyze_code(code):
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        return {
            "time": "Invalid code",
            "space": "Invalid code",
            "issues": [f"Syntax error: {str(e)}"]
        }
    
    analyzer = ComplexityAnalyzer()
    analyzer.visit(tree)

    # Time Complexity
    if analyzer.has_recursion:
        time = "O(n)"
    elif analyzer.max_loop_depth == 0:
        time = "O(1)"
    else:
        time = f"O(n^{analyzer.max_loop_depth})" if analyzer.max_loop_depth > 1 else "O(n)"

    # Space Complexity
    space = "O(1)" if len(analyzer.variables) < 5 else "O(n)"

    issues = []
    if analyzer.max_loop_depth > 1:
        issues.append("Nested loops detected")
    if analyzer.has_recursion:
        issues.append("Recursion detected")

    return {
        "time": time,
        "space": space,
        "issues": issues
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        code = sys.argv[1]
        result = analyze_code(code)
        print(json.dumps(result))
    else:
        sample = """
def foo(n):
    for i in range(n):
        for j in range(n):
            print(i, j)
"""
        result = analyze_code(sample)
        print(json.dumps(result))
