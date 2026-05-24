from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = "postgresql://neondb_owner:npg_...@ep-empty-star-ap7602qc-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require"

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")