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
    u = db.query(models.User).filter(models.User.email == 'mr.swagath72@gmail.com').first()
    if u:
        print(f"USER: ID={u.id}, Email='{u.email}', Role={u.role}, FullName='{u.full_name}'")
        bookings = db.query(models.Booking).filter(models.Booking.technician_email == u.email).all()
        print(f"Bookings (by email): {len(bookings)}")
        for b in bookings:
            print(f"  Booking {b.id}: Status='{b.status}'")
        
        bookings_id = db.query(models.Booking).filter(models.Booking.technician_id == u.id).all()
        print(f"Bookings (by ID): {len(bookings_id)}")
    db.close()
except Exception as e:
    print(f"Error: {e}")
