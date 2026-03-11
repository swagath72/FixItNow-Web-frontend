import urllib.request, json
data = json.dumps({'email': 'ch@gmail.com', 'password': '123'}).encode('utf-8')
req = urllib.request.Request('http://127.0.0.1:8000/login', data=data, headers={'Content-Type': 'application/json'})
with urllib.request.urlopen(req) as f:
    token = json.loads(f.read().decode('utf-8'))['token']
    req2 = urllib.request.Request('http://127.0.0.1:8000/bookings', headers={'Authorization': 'Bearer ' + token})
    with urllib.request.urlopen(req2) as f2:
        bookings = json.loads(f2.read().decode('utf-8'))
        print('Total:', len(bookings))
        print('Bookings:')
        for b in bookings:
            print(f"ID={b.get('id')} Status={repr(b.get('status'))} Cost={b.get('cost')}")
