import sys
import os

backend_path = r"c:\xampp\htdocs\fixitnow-backend"
if backend_path not in sys.path:
    sys.path.append(backend_path)

try:
    import database
    import models
    from sqlalchemy.orm import Session
    from sqlalchemy import func, or_
    
    db = database.SessionLocal()
    email = "mr.swagath72@gmail.com"
    user = db.query(models.User).filter(func.lower(models.User.email) == email.lower()).first()
    
    if not user:
        print("User not found")
    else:
        print(f"User found: {user.email}, ID: {user.id}")
        # Replicate get_user_bookings logic
        query = db.query(models.Booking).filter(
            or_(
                func.lower(models.Booking.technician_email) == user.email.lower(),
                models.Booking.technician_id == user.id
            )
        )
        results = query.order_by(models.Booking.id.desc()).all()
        print(f"Success! Found {len(results)} bookings")
        for r in results:
            print(f"  ID={r.id}, Status={r.status}")
    db.close()
except Exception as e:
    print(f"Crash: {e}")
