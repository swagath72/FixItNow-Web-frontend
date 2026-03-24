import sqlalchemy
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://root:@localhost/fixitnow")
try:
    with engine.connect() as conn:
        res = conn.execute(sqlalchemy.text("SELECT email, role FROM app_users WHERE role LIKE 'admin%'"))
        admins = res.fetchall()
        if not admins:
            print("No admin users found in app_users table.")
        else:
            print("Admin Users Found:")
            for admin in admins:
                print(f"Email: {admin[0]}, Role: {admin[1]}")
except Exception as e:
    print(f"Error: {e}")
