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
    techs = db.query(models.TechnicianProfile).all()
    print(f"Total technicians found: {len(techs)}")
    print("--- Technician Verification Statuses ---")
    for t in techs:
        user = db.query(models.User).filter(models.User.id == t.user_id).first()
        name = user.full_name if user else "Unknown"
        print(f"User ID: {t.user_id}, Name: {name}, Status: '{t.verification_status}'")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
