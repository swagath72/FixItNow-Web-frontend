import pymysql

try:
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        database='fixitnow',
        cursorclass=pymysql.cursors.DictCursor
    )
    with connection.cursor() as cursor:
        cursor.execute("SELECT id, full_name, email, role, latitude, longitude FROM app_users")
        users = cursor.fetchall()
        print("--- USER LOCATIONS ---")
        for u in users:
            print(f"ID: {u['id']} | Name: {u['full_name']} | Email: {u['email']} | Role: {u['role']} | Lat: {u['latitude']} | Lon: {u['longitude']}")
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'connection' in locals():
        connection.close()
