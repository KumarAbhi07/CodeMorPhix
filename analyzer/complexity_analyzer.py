import ast

class ComplexityAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.loop_depth = 0
        self.max_loop_depth = 0

        self.recursive_calls = 0
        self.current_function = None

        self.halving_loop = False
        self.dividing_recursion = False

        self.array_allocations = []
        self.recursion_depth = 0

    # -------- LOOPS --------
    def visit_For(self, node):
        self.loop_depth += 1
        self.max_loop_depth = max(self.max_loop_depth, self.loop_depth)
        self.generic_visit(node)
        self.loop_depth -= 1

    def visit_While(self, node):
        self.loop_depth += 1
        if self._is_halving_loop(node):
            self.halving_loop = True
        self.max_loop_depth = max(self.max_loop_depth, self.loop_depth)
        self.generic_visit(node)
        self.loop_depth -= 1

    def _is_halving_loop(self, node):
        if isinstance(node.test, ast.Compare):
            return True
        for stmt in node.body:
            if isinstance(stmt, ast.AugAssign):
                if isinstance(stmt.op, (ast.FloorDiv, ast.Div)):
                    return True
        return False

    # -------- FUNCTIONS / RECURSION --------
    def visit_FunctionDef(self, node):
        prev = self.current_function
        self.current_function = node.name
        self._detect_dividing_recursion(node)
        self.generic_visit(node)
        self.current_function = prev

    def _detect_dividing_recursion(self, node):
        """Detect if function divides input (e.g., mid = len(arr)//2)"""
        for child in ast.walk(node):
            if isinstance(child, ast.BinOp):
                if isinstance(child.op, (ast.FloorDiv, ast.Div)):
                    # Check if it's dividing based on input
                    if isinstance(child.left, ast.Call):
                        if isinstance(child.left.func, ast.Name):
                            if child.left.func.id in ['len']:
                                self.dividing_recursion = True

    def visit_Call(self, node):
        if isinstance(node.func, ast.Name):
            if node.func.id == self.current_function:
                self.recursive_calls += 1
        self.generic_visit(node)

    # -------- SPACE --------
    def visit_Assign(self, node):
        if isinstance(node.value, (ast.List, ast.Dict, ast.Set)):
            self.array_allocations.append(1)
        self.generic_visit(node)
