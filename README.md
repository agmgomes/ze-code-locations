
# Partner Locator API

This project is a backend [challenge](https://github.com/ab-inbev-ze-company/ze-code-challenges/blob/master/backend.md) solution that provides a service to manage and locate delivery partners. The service uses MongoDB for geospatial queries, enabling quick location-based searches, and is built with NestJS.

## Prerequisites
- [Node.js](https://nodejs.org)
- [NestJS CLI](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker and Docker Compose](https://www.docker.com/)

## Features

- __Create new partners__: Add new partners with details like name, unique document, address and delivery coverage area.
- __Find partner by id__: Retrieve a partner's information using a unique ID.
- __Locate nearest partner__: Find the closest partner based on user-provived location within the coverage area.

## Getting Started

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/agmgomes/ze-code-location.git
    cd ze-code-locations
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Environment Setup

**Create a `.env` file** in the project root with the following environment variables:

```plaintext
  MONGO_URI=mongodb://admin:password@localhost:27017/
  MONGO_DB_NAME=zecode-locations-db
```

### Database Setup

#### Option 1: Using Docker Compose

 **Start MongoDB using Docker Compose:**

```bash
  cd docker
  docker-compose up -d
```

   This will start a MongoDB instance wich the API will connect to for data storage and retrieval.

#### Option 2: Using Your Own MongoDB Setup

If you already have MongoDB installed locally or are using a managed MongoDB, ensure MongoDB is running, and update your `.env` file to point your MongoDB URI.

```plaintext
  MONGODB_URI=mongodb://<your-mongodb-host>:<port>
  DB_NAME=delivery_partners
```

### Running the API locally
Go to project directory and start the server:
```bash
  npm run start
```

Or if you want populate initially the MongoDB collection with some data:
```bash
  npm run start:dev:populate
```

## API Reference

### Get partner by ID

```http
  GET /partners/id/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of partner to fetch |

#### Responses
- **200 OK**
    - Return the partner's details including:
        - `id`: unique identifier of the partner.
        - `tradingName`: Name of the partner's bussiness.
        - `ownerName`: Owner's name.
        - `document`: Unique partner document identifier.
        - `coverageArea`: Geographical area covered (MultiPolygon).
        - `address`: Partner's location point (longitude and latitude).

- **400 Not Found**
    - Partner with the specified ID does not exist.

  
### Get nearest partner by location

```http
  GET /partners/nearest?longitude=${longitude}&latitude=${latitude}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `longitude`      | `string` | **Required**. Longitude of the current location|
| `latitude`| `number`| **Required**. Latitude of the current location|

#### Responses
- **200 OK**
    - Returns the nearest partner that covers the specified location, including details like `id`, `tradingName`, `ownerName` and `address`.
- **404 Not Found**
  - Indicates no partner is found in the specified location or coverage area.

### Create new partner

```http
  POST /partners/create
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tradingName`| `string` | **Required**. Name under wich the partner trades |
| `ownerName`| `string`| **Required**. Name of the owner of the partner|
| `document` | `string`| **Required**. Unique document identifier for the partner|
| `coverageArea`| `object`|**Required**. Area covered by the partner, in GeoJSON format (MultiPolygon)|
| `address`| `object`| **Required**. Exact location of the partner, in GeoJSON format (Point)|

##### **Example Request Body**
  ```json
  {
    "tradingName": "Hoje Tem",
    "ownerName": "Zé Artolas",
    "document": "123456",
    "coverageArea": {
      "type": "MultiPolygon",
      "coordinates": [
				[
                    [
                        [-8.653230456534658, 40.95800322497854],
                        [-8.653341500261632, 40.95799424007032],
                        [-8.653325636871415, 40.957788784827954],
                        [-8.653276460364111, 40.95778938382392],
                        [-8.653218558992904, 40.957809150682266],
                        [-8.653230456534658, 40.95800322497854]
                    ]
                ]
			] 
    },
    "address": {
      "type": "Point",
      "coordinates": [
          -8.653214593145321,
          40.95799124510043
        ]
    }
  }
```
#### Responses
- **201 Created**
    - Returns the created partner object.

- **400 Bad Request**
    - Returned if validation failed (e.g., missing required fields or duplicated document).

## LICENSE
This project is licensed under the MIT License.
