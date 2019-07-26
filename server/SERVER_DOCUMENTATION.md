## USER AUTH
1. post "/signup"
2. post "/signin"
3. get "/user"

## TOP UP
1. patch "/topup"

## PRODUCT CRUD
1. post "/product/"
2. get "/product/user"
3. get "/product/:id"
4. get "/product"
5. delete "/product/:id"

## Documentation
DEPLOY: http://link-deploy.com/
## Signup 
- route:
  - `POST /signup`
- request:
  - body:
    - `{ name: 'alvin' , email: 'alvin@mail.com', password: 'alvinaja', phonenumber: '082113741934' }`
- response:
  - `201`: `{ _id: ObjectId(''), name: 'alvin', email: 'alvin@mail.com', balance: 0 }`
- error:
  - `Validation Error`
```
- Email is unique, so it is not allowed to have same email in database.
- Password is hashed with bcryptjs.
```

## Signin
- route:
  - `POST /signin`
- request:
  - body
    - `{ email: 'alvin@mail.com', password: 'alvinaja' }`
- response:
  - `200`: `{ token: '...'}`
- error:
  - `404 not found`
```
Token is generated from JWT package.
```

## Create Product
- route:
  - `POST /product`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - body
    - `{ title, images, category, details, initialPrice, currentPrice }`
- response
  - `201`: `{
        _id,
        userId,
        title,
        images,
        category,
        details,
        initialPrice,
        currentPrice,
        createdAt,
        updatedAt,
    }`
- error:
  - `Validation Error`
```
- Token is decoded via JWT to get userId.
- Multer is used to convert form data into object, then it is uploaded to google cloud storage.
```

## All Products
- route:
  - `GET /product`
- request
  - headers
    - `{ token }`
- response
  - `200`: `[{
        _id,
        userId,
        title,
        images,
        category,
        details,
        initialPrice,
        currentPrice,
        createdAt,
        updatedAt,
    }]`
- error:
  - `500 internal server error`
```
- Token is decoded via JWT to get userId.
```

## My Products
- route:
  - `GET /product/user`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `[{
        _id,
        userId,
        title,
        images,
        category,
        details,
        initialPrice,
        currentPrice,
        createdAt,
        updatedAt,
    }]`
- error:
  - `500 internal server error`
```
- Token is decoded via JWT to get userId.
- Query is used to find specific userId.
```

## Detail Product
- route:
  - `GET /product/:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{
        _id,
        userId,
        title,
        images,
        category,
        details,
        initialPrice,
        currentPrice,
        createdAt,
        updatedAt,
    }`
- error:
  - `500 internal server error`
```
- Token is decoded via JWT to get userId.
- Get product detail by id
```

## Update Product
- route:
  - `PATCH /product/:id`
- request
  - headers
    - `{ token, access }`
  - decoded
    - `{ id: _id }`
  - body
    - `{ name, quantity, price, description, image, category }`
- response
  - `200`: `{
        _id,
        name,
        quantity,
        price,
        description,
        image,
        category,
        created_at,
        UserId
    }`
- error:
  - `401 not authorized`
```
- User can not update Product that does not belongs to his/her (except changing a product quantity when adding to cart with access), it is authorized in middleware.
- Multer is used to convert form data into object, then it is uploaded to google cloud storage.
```

## Delete Product
- route:
  - `DELETE /product/:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ "n" : 1, "ok": 1, "deletedCount": 1 }`
- error:
  - `401 not authorized`
```
User can not delete Product that does not belongs to his/her, it is authorized in middleware.
```

## Add Product to Cart
- route:
  - `PATCH /cart/:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId(''), name:, 'alvin', email: 'alvin@mail.com', password: 'HashedPassword', mondey: 0, cart: [ { _id, name, quantity, price, description, image, category, created_at, UserId } ], history: []`
    }`
- error:
  - `401 not authorized`
```
- Token is decoded via JWT to get UserId.
- User can only update Product to his/her cart.
```
## Delete Product in Cart
- route:
  - `PATCH /cart/remove/:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId('') }`
- error:
  - `401 not authorized`
```
- Token is decoded via JWT to get UserId.
- User can only delete Product from his/her cart.
```
## Clear Cart
- route:
  - `PATCH /cart/`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId(''), name: 'alvin', email: 'alvin@mail.com', password: 'HashedPassword', money: 0, cart: [], history: [ { _id, name, quantity, price, description, image, category, created_at, UserId } ]`
    }`
- error:
  - `401 not authorized`
```
- Token is decoded via JWT to get UserId.
- User can only clear Product from his/her cart.
```
## Read Product
- route:
  - `GET /cart`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId(''), name: 'alvin', email: 'alvin@mail.com', password: 'HashedPassword', money: 0, cart: [ { _id, name, quantity, price, description, image, category, created_at, UserId } ], history: []`
    }`
- error:
  - `500 internal server error`
```
- Token is decoded via JWT to get UserId.
- User can only read Product from his/her cart.
```
## Topup 
- route:
  - `POST /topup`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId(''), name: 'alvin', email: 'alvin@mail.com', password: 'HashedPassword', money: 1000, cart: [ { _id, name, quantity, price, description, image, category, created_at, UserId } ], history: []`
    }`
- error:
  - `400 bad request`
```
Token is decoded via JWT to get UserId.
```
