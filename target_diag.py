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
    target = "ravii"
    u = db.query(models.User).filter(models.User.email.ilike(f"%{target}%")).first()
    if u:
        print(f"FOUND USER: ID={u.id}, Email={u.email}, Role={u.role}")
        bookings = db.query(models.Booking).filter(models.Booking.technician_email == u.email).all()
        print(f"FOUND {len(bookings)} bookings for this exact email")
        for b in bookings:
            print(f"  Booking {b.id}: Status={b.status}")
        
        # also check by ID
        bookings_id = db.query(models.Booking).filter(models.Booking.technician_id == u.id).all()
        print(f"FOUND {len(bookings_id)} bookings for this user ID")
    else:
        print(f"USER {target} NOT FOUND")
    db.close()
except Exception as e:
    print(f"Error: {e}")
