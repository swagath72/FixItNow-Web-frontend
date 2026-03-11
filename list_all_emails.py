import sys
import os

backend_path = r"c:\xampp\htdocs\fixitnow-backend"
if backend_path not in sys.path:
    sys.path.append(backend_path)

try:
    import database
    import models
    from sqlalchemy.orm import Session
    
    db = database.SessionLocal()
    users = db.query(models.User).all()
    for u in users:
        print(f"ID={u.id}, Email='{u.email}', Role={u.role}")
    db.close()
except Exception as e:
    print(f"Error: {e}")
