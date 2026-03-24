
import pymysql

try:
    conn = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='fixitnow',
        cursorclass=pymysql.cursors.DictCursor
    )
    cursor = conn.cursor()

    print("--- User Table Columns ---")
    cursor.execute("DESCRIBE app_users")
    for row in cursor.fetchall():
        print(row)

    print("\n--- Booking Table Columns ---")
    cursor.execute("DESCRIBE bookings")
    for row in cursor.fetchall():
        print(row)

    print("\n--- Sample Data ---")
    cursor.execute("SELECT email, latitude, longitude FROM app_users LIMIT 5")
    for row in cursor.fetchall():
        print(row)

    conn.close()
except Exception as e:
    print(f"Error: {e}")
