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
    print("--- FULL USER LIST ---")
    for u in users:
        print(f"ID: {u.id} | Name: {u.full_name} | Email: {u.email} | Role: {u.role}")
    
    print("\n--- ALL BOOKINGS ---")
    bookings = db.query(models.Booking).all()
    for b in bookings:
        print(f"ID: {b.id} | Tech Email: {b.technician_email} | Tech ID: {b.technician_id} | Status: {b.status} | Cost: {b.cost}")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
