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
    print("--- Technician Profiles ---")
    techs = db.query(models.TechnicianProfile).all()
    for t in techs:
        print(f"Profile ID: {t.id}, User ID: {t.user_id}, Status: '{t.verification_status}'")
    
    print("\n--- Users Table Check ---")
    for t in techs:
        user = db.query(models.User).filter(models.User.id == t.user_id).first()
        if user:
            print(f"User ID: {user.id}, Name: {user.full_name}, Role: {user.role}, Email: {user.email}")
        else:
            print(f"User ID {t.user_id} NOT FOUND in app_users table!")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
