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
        bb_id = db.query(models.Booking).filter(models.Booking.technician_id == u.id).all()
        bb_email = db.query(models.Booking).filter(models.Booking.technician_email == u.email).all()
        print(f"UID={u.id}, Email={u.email}")
        print(f"Bookings matching Tech ID {u.id}: {len(bb_id)}")
        print(f"Bookings matching Tech Email {u.email}: {len(bb_email)}")
        for b in bb_id:
            print(f"  Booking ID={b.id}, TechEmail={b.technician_email}, Status={b.status}")
    db.close()
except Exception as e:
    print(f"Error: {e}")
