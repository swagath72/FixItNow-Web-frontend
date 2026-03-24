import sys
import os
import time

backend_path = r"c:\xampp\htdocs\fixitnow-backend"
if backend_path not in sys.path:
    sys.path.append(backend_path)

try:
    import database
    import models
    from sqlalchemy.orm import Session
    
    db = database.SessionLocal()
    users = db.query(models.User).all()
    print(f"DEBUG: Found {len(users)} users")
    for u in users:
        print(f"USER: ID={u.id}, Email={u.email}, Role={u.role}")
        sys.stdout.flush()
    
    bookings = db.query(models.Booking).all()
    print(f"DEBUG: Found {len(bookings)} bookings")
    for b in bookings:
        print(f"BOOKING: ID={b.id}, TechEmail={b.technician_email}, Status={b.status}, PaymentStatus={b.payment_status}, Cost={b.cost}")
        sys.stdout.flush()
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
