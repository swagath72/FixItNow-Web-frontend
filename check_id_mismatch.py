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
    email = "mr.swagath72@gmail.com"
    bb = db.query(models.Booking).filter(models.Booking.technician_email == email).all()
    print(f"Total bookings for email {email}: {len(bb)}")
    id_counts = {}
    for b in bb:
        id_counts[b.technician_id] = id_counts.get(b.technician_id, 0) + 1
    
    print("Technician ID distribution:")
    for tid, count in id_counts.items():
        print(f"  ID={tid}: {count} bookings")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
