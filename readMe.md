# DOCKER REDIS CASSANDRA EXPRESS ANGULAR

## How run
- run this command in root

```bash
docker-compose up --build
```

- Wait until all container start and in another shell go to cassandra container

```bash
docker exec -it dbCassandra sh
```
- init your database

```bash
cqlsh -f scripts/data.cql
```

Great ! now you can open your brower and go to localhost:80

