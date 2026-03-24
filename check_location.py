import mysql.connector
import time

def check_technician_location(email):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="fixitnow"
        )
        cursor = conn.cursor(dictionary=True)

        print(f"Monitoring location for: {email}")
        print("Press Ctrl+C to stop.\n")

        last_lat, last_lng = None, None

        while True:
            query = "SELECT latitude, longitude FROM app_users WHERE email = %s"
            cursor.execute(query, (email,))
            result = cursor.fetchone()

            if result:
                lat = result['latitude']
                lng = result['longitude']
                
                if lat != last_lat or lng != last_lng:
                    print(f"[{time.strftime('%H:%M:%S')}] New Location: Lat {lat}, Lng {lng}")
                    last_lat, last_lng = lat, lng
                else:
                    print(f"[{time.strftime('%H:%M:%S')}] No change (Lat {lat}, Lng {lng})")
            else:
                print(f"User with email {email} not found.")
            
            time.sleep(5) # Check every 5 seconds

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    email = input("Enter technician email to track: ")
    check_technician_location(email)
