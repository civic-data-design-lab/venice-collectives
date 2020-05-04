import os
import sys

print(sys.version)
print(sys.path)
print(sys.executable)
CURRENT_FILE = os.path.abspath(__file__)
CURRENT_DIR = os.path.dirname(CURRENT_FILE)
PROJECT_DIR = os.path.dirname(CURRENT_DIR)

# Add project top-dir to path (since it has no __init__.py)
sys.path.append(PROJECT_DIR + '/src/')

# Add virtualenv to path
sys.path.append(PROJECT_DIR + '/virtualenv/lib/python3.8/site-packages/')

# Export the Flask app object from the project as wsgi application object
from app import app as application

