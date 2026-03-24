import requests
import os

url = "http://127.0.0.1:8000/upload-technician-document"
token = "mr.swagath72@gmail.com" # A technician email
headers = {"Authorization": f"Bearer {token}"}

# Create a dummy file
with open("test_doc.jpg", "wb") as f:
    f.write(b"dummy image data")

try:
    print("Testing upload for 'Government ID'...")
    files = {"file": ("test_doc.jpg", open("test_doc.jpg", "rb"), "image/jpeg")}
    params = {"doc_type": "Government ID"}
    
    response = requests.post(url, headers=headers, params=params, files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

finally:
    if os.path.exists("test_doc.jpg"):
        os.remove("test_doc.jpg")
