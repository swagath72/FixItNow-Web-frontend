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
    docs = db.query(models.TechnicianDocument).all()
    print(f"Total documents in database: {len(docs)}")
    for d in docs:
        user = db.query(models.User).filter(models.User.id == d.user_id).first()
        name = user.full_name if user else "Unknown"
        print(f"Doc ID: {d.id}, User: {name} (ID {d.user_id}), Type: {d.doc_type}, URL: {d.file_url}")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
