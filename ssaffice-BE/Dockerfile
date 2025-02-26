# 빌드 스테이지
FROM gradle:7.6.1-jdk17 AS build

# 컨테이너 내부 /app 디렉토리를 기준 실행
WORKDIR /app

# 빌드 캐시를 위해 의존성 관련 파일만 먼저 복사
COPY build.gradle settings.gradle ./
COPY gradle ./gradle

# 의존성 다운로드
RUN gradle dependencies --no-daemon

# 소스 코드 복사
COPY src ./src

# 애플리케이션 빌드
RUN gradle clean build -x test --no-daemon

# 빌드된 JAR 파일 이름 변경
RUN mv /app/build/libs/ssaffice-*-SNAPSHOT.jar /app/app.jar

# 실행 스테이지
FROM openjdk:17-jdk-slim

# 컨테이너 내부 /app 디렉토리 기준
WORKDIR /app

# 빌드 스테이지에서 생성된 jar 파일 복사
COPY --from=build /app/app.jar ./app.jar

EXPOSE 9090

# jar 실행
ENTRYPOINT ["java", "-jar", "app.jar"]