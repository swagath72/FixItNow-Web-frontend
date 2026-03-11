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
    msgs = db.query(models.Message).all()
    print(f"Total Chat Messages: {len(msgs)}")
    for m in msgs[-5:]: # last 5 msgs
        print(f"From: {m.sender_email}, To: {m.receiver_email}, Msg: {m.message[:30]}, Timestamp: {m.timestamp}")
    
    db.close()
except Exception as e:
    print(f"Error: {e}")
