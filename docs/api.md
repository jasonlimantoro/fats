# API

# Authentication

## Login

To login the user

- url: `/api/auth/login`

- method: `GET`

- body

```
{
    "username": "string",
    "password": "string",
    "domain": "student" | "admin"
}
```

### Successful Response

- Code: `200 OK`
- Content

```
{
    "id": 2,
    "token": "{JWT_TOKEN}"
}
```

### Error Response

- Condition: if one of the field is missing
- Code: `400 BAD REQUEST`
- Content

```
{
    username: [
        "This field is required"
    ]
}
```

# Admin

## List Attendance

- url : `api/attendances/`
- method: `GET`
- headers

```
{
  "Authentication": "Bearer {JWT_TOKEN}"
}
```

## Successful Response

- Code: `200 OK`

```
{
    Attendances[]
}
```
