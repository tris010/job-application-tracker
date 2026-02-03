from database import create_table, connect_db

def add_job(company, role, status):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO jobs (company, role, status) VALUES (?, ?, ?)",
        (company, role, status)
    )
    conn.commit()
    conn.close()

def view_jobs():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jobs")
    jobs = cursor.fetchall()
    conn.close()
    return jobs

def main():
    create_table()

    while True:
        print("\nJob Application Tracker")
        print("1. Add Job")
        print("2. View Jobs")
        print("3. Exit")

        choice = input("Enter choice: ")

        if choice == "1":
            company = input("Company Name: ")
            role = input("Job Role: ")
            status = input("Status (Applied/Interview/Offer): ")
            add_job(company, role, status)
            print("Job added successfully!")

        elif choice == "2":
            jobs = view_jobs()
            for job in jobs:
                print(job)

        elif choice == "3":
            break
        else:
            print("Invalid choice")

if __name__ == "__main__":
    main()
