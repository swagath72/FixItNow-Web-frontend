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
    with open('users_debug.txt', 'w', encoding='utf-8') as f:
        f.write(f"Total Users: {len(users)}\n")
        for u in users:
            f.write(f"ID={u.id}, Email='{u.email}', Role={u.role}\n")
    db.close()
except Exception as e:
    with open('users_debug.txt', 'w', encoding='utf-8') as f:
        f.write(f"Error: {e}")
