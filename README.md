# Restaurant Control Plane – Bootstrap API

## Base URL
http://localhost:3000/

## Bootstrap API

### 1. Default Bootstrap (WEB client)
```bash
curl http://localhost:3000/bootstrap
```

### 2. Bootstrap for POS Client
```bash
curl -H "X-Client-Type: POS" http://localhost:3000/bootstrap
```

### 3. Bootstrap for KIOSK Client
```bash
curl -H "X-Client-Type: KIOSK" http://localhost:3000/bootstrap
```

### 4. Bootstrap for DELIVERY Client
```bash
curl -H "X-Client-Type: DELIVERY" http://localhost:3000/bootstrap
```

###  Any other client
Defaults to WEB


## Client Management APIs

### Get all clients
```bash
curl http://localhost:3000/clients
```

### Get Client by ID
```bash
curl http://localhost:3000/clients/client_kiosk_1
```

### Create Client
```bash
curl -X POST http://localhost:3000/clients \
-H "Content-Type: application/json" \
-d '{
  "id":"client_test_1",
  "type":"WEB",
  "status":"ACTIVE",
  "apis":["STORE"],
  "features":[],
  "capabilities":{},
  "devices":[],
  "meta":{
    "createdAt":"2026-01-10T00:00:00Z",
    "updatedAt":"2026-01-10T00:00:00Z"
  }
}'

```

### Update Client
```bash
curl -X PUT http://localhost:3000/clients/client_test_1 \
-H "Content-Type: application/json" \
-d '{
  "status":"DISABLED"
}'
```

### Delete Client
```bash
curl -X DELETE http://localhost:3000/clients/client_test_1

```
