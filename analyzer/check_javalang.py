#!/usr/bin/env python3
try:
    import javalang
    print("✓ javalang is installed")
except ImportError:
    print("✗ javalang is not installed, attempting to install...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "javalang"])
    import javalang
    print("✓ javalang installed successfully")
