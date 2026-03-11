import sys
import os

backend_path = r"c:\xampp\htdocs\fixitnow-backend"
if backend_path not in sys.path:
    sys.path.append(backend_path)

try:
    import database
    import models
    from sqlalchemy.orm import Session
    from sqlalchemy import func
    
    db = database.SessionLocal()
    email = "ch@gmail.com"
    bb = db.query(models.Booking).filter(func.lower(models.Booking.customer_email) == email.lower()).all()
    print(f"Total bookings for customer {email}: {len(bb)}")
    for b in bb:
        print(f"  ID={b.id}, TechEmail={b.technician_email}, Status='{b.status}'")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
