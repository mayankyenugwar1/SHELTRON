# SHELTRON Backend
FROM python:3.12-slim AS backend

WORKDIR /app
COPY backend/app ./app
RUN pip install --no-cache-dir fastapi uvicorn pydantic numpy pandas

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
