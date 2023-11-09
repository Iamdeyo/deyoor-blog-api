# Blog API Documentation

Welcome to the Blog API documentation. This API allows you to interact with blog posts.

## Base URL

-   Base URL: `https://ethical-hettie-dtech.koyeb.app/`

## Authentication

To access the API, you need to include an API key in the request header.

```http
  Authorization: Bearer TOKEN
```

## Endpoints

1.  Register User
    URL: /api/auth/register
    Method: POST
    Description: Creates a new user account.

    # Request

    ```json
    {
        "username": "Deyo",
        "password": "DeyoTech"
    }
    ```

    # Response

    Status Code: 200 OK
    Response Format: JSON

    ```json
    {
        "message": "User created successfully",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YTk1NWFkNmFiOGVjMTNkMiIsInVzZXJuYW1lIjoiRGV5byIsImlhdCI6MTY5NjE4NjA3NywiZXhwIjoxNjk2NzkwODc3fQ.G1qHpz6Se2WoLvcymyEip1vy0PkaLh9qMZWK6O8Veh4"
        },
        "errors": null
    }
    ```

2.  login User
    URL: /api/auth/login
    Method: POST
    Description: Login a user account.

    # Request

    ```json
    {
        "username": "Deyo",
        "password": "DeyoTech"
    }
    ```

    # Response

    Status Code: 200 OK
    Response Format: JSON

    ```json
    {
        "message": "User created successfully",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.OGVjMTNkMiIsInVzZXJuYW1lIjoiRGV5byIsImlhdCI6MTY5NjE4NjA3NywiZXhwIjoxNjk2NzkwODc3fQ.G1qHpz6Se2WoLvcymyEip1vy0PkaLh9qMZWK6O8Veh4"
        },
        "errors": null
    }
    ```

3.  Get User details
    URL: /api/auth/me
    Method: GET
    Description: Retrieves the currently logged-in user's information.
    Authentication: Required

    # Request

    No request parameters are required.

    # Response

    Status Code: 200 OK
    Response Format: JSON

    ```json
    {
        "message": "User created successfully",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTliZWRjYTk1NWFkNmFiOGVjMTNkMiIsInVzZXJuYW1lIjoiRGV5byIsImlhdCI6MTY5NjE4NjA3NywiZXhwIjoxNjk2NzkwODc3fQ.G1qHpz6Se2WoLvcymyEip1vy0PkaLh9qMZWK6O8Veh4"
        },
        "errors": null
    }
    ```

4.  List All Blog Posts
    URL: /api/posts
    Method: GET
    Description: Retrieves a list of all blog posts.

    # Request

    query parameters
    tag="blog" optional => Retrieves list all blog posts with tag

    # Response

    Status Code: 200 OK
    Response Format: JSON

    ```json
    {
        "message": "All posts found",
        "data": [
            {
                "id": "6519bfb2a955ad6ab8ec13d4",
                "image": null,
                "title": "My First Post",
                "slug": "my-first-post-1696186287298",
                "tags": ["post", "blog"],
                "content": "This is the content of my first post",
                "createdAt": "2023-10-01T18:51:27.305Z",
                "updatedAt": "2023-10-01T18:51:27.305Z",
                "authorId": "6519bedca955ad6ab8ec13d2"
            }
        ],
        "errors": null
    }
    ```

5.  Get A Blog Posts
    URL: /api/post
    Method: GET
    Description: Retrieves a blog post using the id.

    # Request

    URL Parameters:
    postId (required) - The unique identifier of the blog post.

    # Response

    Status Code: 200 OK
    Response Format: JSON

          ```json
          {
            "message": "All posts found",
            "data": {
                "id": "6519bfb2a955ad6ab8ec13d4",
                "image": null,
                "title": "My First Post",
                "slug": "my-first-post-1696186287298",
                "tags": ["post", "blog"],
                "content": "This is the content of my first post",
                "createdAt": "2023-10-01T18:51:27.305Z",
                "updatedAt": "2023-10-01T18:51:27.305Z",
                "authorId": "6519bedca955ad6ab8ec13d2"
              },
            "errors": null
          }
          ```

6.  Get A Blog Posts
    URL: /api/post
    Method: GET
    Description: Retrieves a blog post using the id.

    # Request

    URL Parameters:
    postId (required) - The unique identifier of the blog post.

    # Response

    Status Code: 200 OK
    Response Format: JSON

          ```json
          {
            "message": "All posts found",
            "data": {
                "id": "6519bfb2a955ad6ab8ec13d4",
                "image": null,
                "title": "My First Post",
                "slug": "my-first-post-1696186287298",
                "tags": ["post", "blog"],
                "content": "This is the content of my first post",
                "createdAt": "2023-10-01T18:51:27.305Z",
                "updatedAt": "2023-10-01T18:51:27.305Z",
                "authorId": "6519bedca955ad6ab8ec13d2"
              },
            "errors": null
          }
          ```

7.  Delete A Blog Posts
    URL: /api/post
    Method: DELETE
    Description: Delete a blog post using the id.
    Authentication: Required

    # Request

    URL Parameters:
    postId (required) - The unique identifier of the blog post.

    # Response

    Status Code: 200 OK
    Response Format: JSON

          ```json
          {
            "message": "post deleted sucessfully",
            "data": null,
            "errors": null
          }
          ```

8.  Create Post
    URL: /api/post
    Method: POST
    Description: Create a blog post.
    Authentication: Required

        # Request

          ```json
          {
            "title": "My Second Post",
            "content": "This is the content of my second post",
            "tags": ["post", "blog"],
            "image": <FILE> "optional",
          }
          ```

        # Response

        Status Code: 200 OK
        Response Format: JSON

            ```json
            {

              "message": "post created sucessfully",
              "data": {
              "id": "6519c96fa955ad6ab8ec13d6",
              "image": null,
              "title": "My Second Post",
              "slug": "my-second-post-1696188780172",
              "tags": [
              "post",
              "blog"
              ],
              "content": "This is the content of my second post",
              "createdAt": "2023-10-01T19:33:00.180Z",
              "updatedAt": "2023-10-01T19:33:00.180Z",
              "authorId": "6519bedca955ad6ab8ec13d2"
              },
              "errors": null
            }
            ```

9.  Edit Post
    URL: /api/post
    Method: PATCH
    Description: edit a blog post.
    Authentication: Required

        # Request

          ```json
          {
            "title": "My Second Post",
            "content": "This is the content of my second post",
            "tags": ["post", "blog"],
            "image": <FILE> "optional",
          }
          ```

        # Response

        Status Code: 200 OK
        Response Format: JSON

            ```json
            {

              "message": "post updated sucessfully",
              "data": {
              "id": "6519c96fa955ad6ab8ec13d6",
              "image": null,
              "title": "My Second Post",
              "slug": "my-second-post-1696188780172",
              "tags": [
              "post",
              "blog"
              ],
              "content": "This is the content of my second post",
              "createdAt": "2023-10-01T19:33:00.180Z",
              "updatedAt": "2023-10-01T19:33:00.180Z",
              "authorId": "6519bedca955ad6ab8ec13d2"
              },
              "errors": null
            }
            ```
