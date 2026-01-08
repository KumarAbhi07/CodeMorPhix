import ast
import json
import sys
from complexity_analyzer import ComplexityAnalyzer

def analyze_code(code):
    tree = ast.parse(code)
    analyzer = ComplexityAnalyzer()
    analyzer.visit(tree)

    # -------- TIME COMPLEXITY --------
    # O(n log n): 2 recursive calls with division
    if analyzer.recursive_calls >= 2 and analyzer.dividing_recursion:
        time = "O(n log n)"
    # O(2^n): Multiple recursive calls without division (exponential)
    elif analyzer.recursive_calls > 1:
        time = "O(2^n)"
    # O(log n): Single recursive call with division
    elif analyzer.recursive_calls == 1 and analyzer.dividing_recursion:
        time = "O(log n)"
    # O(n log n): Single recursive call with nested loop
    elif analyzer.recursive_calls == 1 and analyzer.max_loop_depth >= 1:
        time = "O(n log n)"
    # O(log n): Halving loop
    elif analyzer.halving_loop:
        time = "O(log n)"
    # O(1): No loops or recursion
    elif analyzer.max_loop_depth == 0:
        time = "O(1)"
    # O(n): Single loop
    elif analyzer.max_loop_depth == 1:
        time = "O(n)"
    # O(n^k): Multiple nested loops
    else:
        time = f"O(n^{analyzer.max_loop_depth})"

    # -------- SPACE COMPLEXITY --------
    if len(analyzer.array_allocations) == 0 and analyzer.recursive_calls == 0:
        space = "O(1)"
    elif analyzer.recursive_calls > 0:
        space = "O(n)"
    elif len(analyzer.array_allocations) > 1:
        space = "O(n^2)"
    else:
        space = "O(n)"

    # -------- ISSUES --------
    issues = []
    if analyzer.max_loop_depth > 1:
        issues.append("Nested loops detected")
    if analyzer.recursive_calls > 0:
        issues.append("Recursion detected")
    if analyzer.halving_loop:
        issues.append("Logarithmic loop detected")

    def build_confidence(loop_depth, recursion, halving):
        if recursion or loop_depth >= 2:
            return "High"
        if halving:
            return "Medium"
        return "Low"

    def build_patterns(loop_depth, recursion, halving):
        patterns = []
        if loop_depth == 1:
            patterns.append("Single loop iteration")
        if loop_depth > 1:
            patterns.append("Nested loops")
        if recursion:
            patterns.append("Recursive calls")
        if halving:
            patterns.append("Logarithmic reduction")
        return patterns

    def build_optimizations(loop_depth, recursion):
        hints = []
        if loop_depth > 1:
            hints.append("Consider reducing nested loops using hashing or prefix computation")
        if recursion:
            hints.append("Try memoization or converting recursion to iteration")
        if loop_depth == 1:
            hints.append("Ensure loop body is O(1) for best performance")
        return hints

    return {
        "time": time,
        "space": space,
        "confidence": build_confidence(
            analyzer.max_loop_depth,
            analyzer.recursive_calls > 0,
            analyzer.halving_loop
        ),
        "patterns": build_patterns(
            analyzer.max_loop_depth,
            analyzer.recursive_calls > 0,
            analyzer.halving_loop
        ),
        "issues": issues,
        "optimizations": build_optimizations(
            analyzer.max_loop_depth,
            analyzer.recursive_calls > 0
        )
    }


if __name__ == "__main__":
    code = sys.argv[1]
    print(json.dumps(analyze_code(code)))
