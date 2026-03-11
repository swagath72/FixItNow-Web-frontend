import urllib.request
import json
import urllib.error

data = json.dumps({"email": "ch@gmail.com", "password": "123"}).encode('utf-8')
req = urllib.request.Request("http://127.0.0.1:8000/login", data=data, headers={"Content-Type": "application/json"})

try:
    with urllib.request.urlopen(req) as f:
        response = json.loads(f.read().decode('utf-8'))
        token = response['token']
        print("Got token!")
        
        req2 = urllib.request.Request("http://127.0.0.1:8000/bookings", headers={"Authorization": f"Bearer {token}"})
        try:
            with urllib.request.urlopen(req2) as f2:
                bookings = json.loads(f2.read().decode('utf-8'))
                print("Bookings count:", len(bookings))
                if len(bookings) > 0:
                    print("First booking keys:", list(bookings[0].keys()))
                    print("First booking:", bookings[0])
        except urllib.error.HTTPError as e:
            print("ERROR FETCHING BOOKINGS:", e.code, e.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("LOGIN ERROR:", e.code, e.read().decode('utf-8'))
