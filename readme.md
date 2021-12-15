# Books Directory
This project provide books directory RESTful api, for performing CRUD operations on books.

Every request must follow pattern `https://<url to page>/api/<resource>`

## Book 
Every book has atleast following attributes
- _id
- title
- author
- pages
- price

Querying books require authentication read [User](#user) for more details.

### Get all Books
> Requires Authentication
A `GET` request to `/api/books` return all books.

### Get one Book
> Requires Authentication
A `GET` request to `/api/books/:bookId` return all books.

where a `bookId` must be provided as path parameter.

eg: `/api/books/61b8d895d19066065c8384bc`


### Create a Book
> Requires Admin Authentication
A `POST` request to `/api/books/` with JSON payload as body containing following attributes
- title
- author
- pages
- price

eg:
```
{
	"titile": "Book title",
	"author": "Author name",
	"pages": 99,
	"price": 100
}
```


### Update a Book
> Requires Admin Authentication
A `PUT` request to `/api/books/:bookId` with JSON payload as body containing following attributes
- title
- author
- pages
- price

eg:
```
{
	"titile": "Book title",
	"author": "Author name",
	"pages": 99,
	"price": 100
}
```
where a `bookId` must be provided as path parameter.

eg: `/api/books/61b8d895d19066065c8384bc`


### Update a Book
> Requires Admin Authentication
A `DELETE` request to `/api/books/:bookId` will delete corresponding book.
where a `bookId` must be provided as path parameter.

eg: `/api/books/61b8d895d19066065c8384bc`


## User
Every user has following parameters.
- _id
- email
- password

### Create a User
A `POST` request to `/api/user/` with JSON payload as body containing following attributes
- email
- password
will create a new user.

eg:
```
{
	"email": "johndoe@email.com",
	"password": "veryStrongPassword",
}
```
It will return a JWT as a header "x-auth-token". Send this token with every request that requires authentication as a header "x-auth-token".

### Authenticate a User
A `POST` request to `/api/user/auth` with JSON payload as body containing following attributes
- email
- password

eg:
```
{
	"email": "johndoe@email.com",
	"password": "veryStrongPassword",
}
```
It will return a JWT as a header "x-auth-token". Send this token with every request that requires authentication as a header "x-auth-token".

#### Development information
It requires 2 environment variables.
- DBLink: mongoDB database link with username and password
- JWTPrivateKey: For signing JWT tokens.