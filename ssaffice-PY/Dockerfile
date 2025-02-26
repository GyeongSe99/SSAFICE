FROM python:3.9-alpine

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache \
    gcc \
    python3-dev \
    musl-dev \
    linux-headers \
    build-base \
    && rm -rf /var/cache/apk/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 9070

ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9070"]
