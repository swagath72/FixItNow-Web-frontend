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
    user_id = 2 # ravii
    docs = db.query(models.TechnicianDocument).filter(models.TechnicianDocument.user_id == user_id).all()
    print(f"Documents for User ID {user_id}: {len(docs)}")
    for d in docs:
        print(f"ID: {d.id}, Type: {d.doc_type}, URL: '{d.file_url}'")
        # Check if file exists on disk
        full_path = os.path.join(backend_path, d.file_url.lstrip('/'))
        exists = os.path.exists(full_path)
        print(f"  Path: {full_path}, Exists: {exists}")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
