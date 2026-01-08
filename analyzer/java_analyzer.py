import javalang
import json
import sys

def analyze_java(code):
    try:
        tree = javalang.parse.parse(code)
    except Exception as e:
        return {
            "time": "Invalid code",
            "space": "Invalid code",
            "issues": [f"Parse error: {str(e)}"]
        }

    loop_depth = 0
    max_loop_depth = 0
    recursive_calls = 0
    current_method = None
    dividing_recursion = False
    halving_loop = False

    # Walk the AST
    for path, node in tree:
        # Track loops
        if isinstance(node, (javalang.tree.ForStatement,
                            javalang.tree.WhileStatement,
                            javalang.tree.DoStatement)):
            loop_depth += 1
            max_loop_depth = max(max_loop_depth, loop_depth)
            
            # Check if it's a halving loop
            if isinstance(node, javalang.tree.WhileStatement):
                if hasattr(node, 'condition') and node.condition:
                    halving_loop = True

        # Track method definitions
        if isinstance(node, javalang.tree.MethodDeclaration):
            current_method = node.name

        # Track recursive calls
        if isinstance(node, javalang.tree.MethodInvocation):
            if current_method and node.member == current_method:
                recursive_calls += 1
            
            # Check for division in recursion
            if isinstance(node, javalang.tree.BinaryOperation):
                if node.operator in ['//', '/', '%']:
                    dividing_recursion = True

    # Time complexity logic
    if recursive_calls > 1 and not dividing_recursion:
        time = "O(2^n)"
    elif recursive_calls >= 2 and dividing_recursion:
        time = "O(n log n)"
    elif recursive_calls == 1 and dividing_recursion:
        time = "O(log n)"
    elif recursive_calls == 1 and max_loop_depth >= 1:
        time = "O(n log n)"
    elif halving_loop:
        time = "O(log n)"
    elif max_loop_depth == 0:
        time = "O(1)"
    elif max_loop_depth == 1:
        time = "O(n)"
    else:
        time = f"O(n^{max_loop_depth})"

    # Space complexity
    if recursive_calls == 0 and max_loop_depth == 0:
        space = "O(1)"
    elif recursive_calls > 0:
        space = "O(n)"
    else:
        space = "O(1)"

    # Issues
    issues = []
    if max_loop_depth > 1:
        issues.append("Nested loops detected")
    if recursive_calls > 0:
        issues.append("Recursion detected")
    if halving_loop:
        issues.append("Logarithmic loop detected")

    return {
        "time": time,
        "space": space,
        "confidence": "High" if max_loop_depth > 1 or recursive_calls > 0 else "Medium",
        "patterns": [
            "Nested loops" if max_loop_depth > 1 else "Single loop",
            "Recursion" if recursive_calls > 0 else "Iteration"
        ],
        "issues": issues,
        "optimizations": [
            "Reduce nested loops using better data structures"
            if max_loop_depth > 1 else
            "Loop is optimal"
        ]
    }

if __name__ == "__main__":
    code = sys.argv[1]
    print(json.dumps(analyze_java(code)))
