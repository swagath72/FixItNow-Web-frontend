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
    # Normalize ALL bookings status
    bookings = db.query(models.Booking).all()
    count = 0
    for b in bookings:
        if b.status:
            old = b.status
            new = b.status.strip().lower()
            if old != new:
                b.status = new
                count += 1
    db.commit()
    print(f"Normalized status for {count} bookings.")
    db.close()
except Exception as e:
    print(f"Error: {e}")
