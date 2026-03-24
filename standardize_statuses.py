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
    # Update all "Pending Review" to "pending"
    updated_count = db.query(models.TechnicianProfile).filter(
        models.TechnicianProfile.verification_status == "Pending Review"
    ).update({models.TechnicianProfile.verification_status: "pending"}, synchronize_session=False)
    
    db.commit()
    print(f"Successfully standardized {updated_count} technician statuses to 'pending'.")
    db.close()
except Exception as e:
    print(f"Error: {e}")
