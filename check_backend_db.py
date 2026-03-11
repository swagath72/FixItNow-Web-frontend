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
    print("--- User List ---")
    for u in users:
        print(f"ID: {u.id}, Name: {u.full_name}, Email: '{u.email}', Role: {u.role}")
    
    print("\n--- Recent Bookings ---")
    bookings = db.query(models.Booking).order_by(models.Booking.id.desc()).limit(10).all()
    for b in bookings:
        print(f"ID: {b.id}, Tech: {b.technician_email}, Status: {b.status}, Cost: {b.cost}")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
