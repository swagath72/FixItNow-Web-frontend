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
    user_id = 35 # mr.swagath72@gmail.com
    docs = db.query(models.TechnicianDocument).filter(models.TechnicianDocument.user_id == user_id).all()
    
    print(f"DEBUG: Found {len(docs)} documents for user {user_id}")
    for d in docs:
        print(f"DOC: ID={d.id}, Type={d.doc_type}, URL={d.file_url}")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
