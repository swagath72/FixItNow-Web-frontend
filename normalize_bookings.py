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
    email = "mr.swagath72@gmail.com"
    u = db.query(models.User).filter(func.lower(models.User.email) == email.lower()).first()
    if u:
        print(f"Syncing bookings for {u.email} (ID: {u.id})")
        # Find all bookings that match the email
        bookings = db.query(models.Booking).filter(func.lower(models.Booking.technician_email) == u.email.lower()).all()
        for b in bookings:
            b.technician_id = u.id
            b.technician_email = u.email # Normalize email casing
            if b.status == 'Completed':
                b.status = 'completed' # Normalize status casing
        db.commit()
        print(f"Normalized {len(bookings)} bookings.")
    else:
        print("User not found.")
    db.close()
except Exception as e:
    print(f"Error: {e}")
