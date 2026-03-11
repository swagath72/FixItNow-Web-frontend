import sqlalchemy
from sqlalchemy import create_engine
import sys

engine = create_engine("mysql+pymysql://root:@localhost/fixitnow")
with engine.connect() as conn:
    res = conn.execute(sqlalchemy.text("SELECT * FROM bookings WHERE customer_email='ch@gmail.com'"))
    bookings = res.fetchall()
    print("BOOKINGS:", bookings)

    res = conn.execute(sqlalchemy.text("SELECT * FROM app_users WHERE email='ch@gmail.com'"))
    user = res.fetchall()
    print("USER:", user)

    res = conn.execute(sqlalchemy.text("SELECT * FROM customer_profiles"))
    profiles = res.fetchall()
    print("PROFILES:", profiles)
