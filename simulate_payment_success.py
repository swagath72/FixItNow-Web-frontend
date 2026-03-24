import sys
import os
import requests

# Set up paths
backend_url = "http://127.0.0.1:8000"
booking_id = 47
token = "ch@gmail.com" # Use the token from our previous successful login test

headers = {"Authorization": f"Bearer {token}"}

def verify():
    print(f"--- Simulating Frontend Post-Payment Calls for Booking {booking_id} ---")
    
    # 1. Update status to 'Completed'
    print("Step 1: Updating job status to 'Completed'...")
    res1 = requests.post(f"{backend_url}/technician/update-job-status", 
                         json={"booking_id": booking_id, "status": "Completed"},
                         headers=headers)
    print(f"Response: {res1.status_code} - {res1.json()}")
    
    # 2. Mark as paid
    print("Step 2: Marking as paid via /mock-pay...")
    res2 = requests.post(f"{backend_url}/mock-pay/{booking_id}", headers=headers)
    print(f"Response: {res2.status_code} - {res2.json()}")
    
    print("\n--- Verifying Database State ---")
    # We can't use requests to check internal DB columns if they aren't exposed, 
    # but we can run our diagnostic script again.
    
if __name__ == "__main__":
    verify()
