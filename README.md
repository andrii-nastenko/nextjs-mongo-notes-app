# Notes App

## Description:

Full-stack app. Built with Next.js, Node.js and MongoDB (REST API)

## Technologies Used:

- NextJS
- ReactJS
- NodeJS
- MongoDB
- HTML
- SCSS

# API

## API ADDRESS:

https://create-text-notes.herokuapp.com

## Create note:

- Path: /api/notes
- Method: POST
- Request body example (JSON):

```JSON
{
  "title": "new note",
  "description": "some text"
}
```

title - required, unique, max length: 30 <br/>
description: max length: 250

- Response (successful): <br/>

  status code: 201 <br/>
  response body example:

```JSON
{
  "success": true,
  "data": {
    "title": "new note",
    "description": "some text",
    "_id": "61f864fb08c6bd299e6f382e"
  }
}
```

## Update note:

- Path: /api/notes/{note_id}
- Method: PUT
- Request body example (JSON):

```json
{
  "title": "new note",
  "description": "some text"
}
```

title - required, unique, max length: 30 <br />
description: max length: 250

- Response (successful): <br />
  status code: 201 <br />
  response body example:

```JSON
{
  "success": true,
  "data": {
    "title": "new note",
    "description": "some text",
    "_id": "61f864fb08c6bd299e6f382e"
  }
}
```

## GET NOTE

- Path: /api/notes/{note_id}
- Method: GET

- Response (successful): <br/>

  status code: 200 <br/>
  response body example:

```JSON
{
  "success": true,
  "data": {
    "title": "new note",
    "description": "some text",
    "_id": "61f864fb08c6bd299e6f382e"
  }
}
```

## GET NOTES

- Path: /api/notes
- Method: GET
- Optional query params example: <br/>
  /notes?page=3&size=5 <br/>
  (default: page = 1, size = 10)

- Response (successful): <br/>
  status code: 200 <br/>
  response body example:

```JSON
{
  "success": true,
  "data": {
    "notes": [
      {
        "_id": "61f864fb08c6bd299e6f382e",
        "title": "qwerty",
        "description": "hello"
      },
      {
        "_id": "61f86aed83f5f570cd3911ad",
        "title": "test",
        "description": "12345"
      }
    ],
    "totalCount": 2
  }
}
```

## DELETE NOTE

- Path: /api/notes/{note_id}
- Method: DELETE

- Response (successful): <br/>

  status code: 200 <br/>
  response body example:

```JSON
{
  "success": true,
  "data": {}
}
```
