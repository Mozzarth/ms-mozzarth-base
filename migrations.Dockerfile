FROM openjdk:8-jre

WORKDIR /flyway

ENV FLYWAY_VERSION 5.2.4

RUN curl -L https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/${FLYWAY_VERSION}/flyway-commandline-${FLYWAY_VERSION}.tar.gz -o flyway-commandline-${FLYWAY_VERSION}.tar.gz \
  && tar -xzf flyway-commandline-${FLYWAY_VERSION}.tar.gz --strip-components=1 \
  && rm flyway-commandline-${FLYWAY_VERSION}.tar.gz

COPY ./migrations /flyway/sql

CMD sh -c "./flyway -url='jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true'   -schemas=${DB_NAME}  -user=${DB_USER} -password=${DB_PASSWORD} migrate"
