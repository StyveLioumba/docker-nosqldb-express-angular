FROM cassandra:4.0
COPY ./cassandra/data.cql ./scripts/data.cql
#CMD [ "cqsh -f /scripts/data.cql" ]