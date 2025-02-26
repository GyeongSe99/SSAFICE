# 빌드 이미지로 node:20 지정
FROM node:20-alpine AS build
# 컨테이너 내부 /app 디렉토리를 기준 실행
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사하여 의존성 설치
COPY package.json package-lock.json ./
RUN npm ci

# 나머지 소스 코드 복사 및 빌드
COPY . .
RUN npm run build && ls -la /app/dist

# 프로덕션 단계 : 경량화된 Nginx 이미지 사용
FROM nginx:1.21.4-alpine

# 빌드된 파일을 Nginx 서빙 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# 포트 80 노출
EXPOSE 80 443

# Nginx 시작
# docker-entrypoint.sh 스크립트 실행된 후 Nginx가 시작
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]