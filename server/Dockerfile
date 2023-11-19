FROM openjdk:11

# :star: 'ARG' 예약어를 통해 인자로 전달 받아야 한다.
ARG AWS_ACCESS_KEY \
    AWS_SECRET_ACCESS_KEY \
    EMAIL_SENDER \
    EMAIL_PASSWORD \
    MYSQL_PASSWORD \
    MYSQL_USERNAME


# :star: 'ENV' 예약어를 통해 전달받은 값을 실제 값과 매칭시켜야 한다.
ENV AWS_ACCESS_KEY=${AWS_ACCESS_KEY} \
    AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
    EMAIL_SENDER=${EMAIL_SENDER} \
    EMAIL_PASSWORD=${EMAIL_PASSWORD} \
    MYSQL_PASSWORD=${MYSQL_PASSWORD} \
    MYSQL_USERNAME=${MYSQL_USERNAME}

# (2) COPY에서 사용될 경로 변수
ARG JAR_FILE=/server/build/libs/*.jar

# (3) jar 빌드 파일을 도커 컨테이너로 복사
COPY ${JAR_FILE} app.jar

# (4) jar 파일 실행
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]