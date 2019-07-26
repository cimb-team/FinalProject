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

# User Routes

## Signup 
- route:
  - `POST /signup`
- request:
  - body:
    - `{ name: 'alvin' , email: 'alvin@mail.com', password: 'alvinaja', phonenumber: '082113741934' }`
- response:
  - `201`: `{ _id: ObjectId(''), name: 'alvin', email: 'alvin@mail.com', phonenumber: '082113741934', balance: 0 }`
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

## Get user info currently logged in
- route:
  - `GET /user`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ _id: ObjectId(''), name: 'alvin', email: 'alvin@mail.com', phonenumber: '082113741934', balance: 0 }`
    }`
- error:
  - `400 bad request`
```
Token is decoded via JWT to get UserId.
```

## Update Profile
- route:
  - `PATCH /updateprofile`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - body:
    - `{ name: 'alvinchristian' , email: 'alvian@mail.com', balance: 100000 }`
- response
  - `200`: `{ _id: ObjectId(''), name: 'alvinchristian', email: 'alvian@mail.com', phonenumber: '082113741934', balance: 100000 }`
    }`
- error:
  - `400 bad request`
```
Token is decoded via JWT to get UserId.
Update current user except phonenumber and password field
```

## Change Password
- route:
  - `PATCH /changepass`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - body:
    - `{ oldPassword: 'alvinaja', newPassword: 'alvindoang' }`
- response
  - `200`: `{ _id: ObjectId(''), name: 'alvinchristian', email: 'alvian@mail.com', phonenumber: '082113741934', balance: 100000 }`
    }`
- error:
  - `400 bad request`
```
Token is decoded via JWT to get UserId.
Update current user password with newPassword, if oldPassword same as in database
```

## Change Phone Number
- route:
  - `PATCH /changephonenumber`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - body:
    - `{ phonenumber: '08217472833' }`
- response
  - `200`: `{ _id: ObjectId(''), name: 'alvinchristian', email: 'alvian@mail.com', phonenumber: '082113741934', balance: 100000 }`
    }`
- error:
  - `400 bad request`
```
Token is decoded via JWT to get UserId.
Update current user password with newPassword, if oldPassword same as in database
```

## Bid History
- route:
  - `PATCH /user/history`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `[{
      bids: [{
        bidderId: ObjectId('User'),
        price: Number,
        dateIssued: Date,
      }],
      winnerId: ObjectId('User'),
      productId: ObjectId('Api')
    }]`
- error:
  - `400 bad request`
```
Token is decoded via JWT to get UserId.
Get current user bid history
```

## Topup Balance
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

# Product Routes

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

## Add Bid to Product
- route:
  - `PATCH /product/:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - body
    - `{ price }`
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
  - `401 not authorized`
```
- And perform update on database 'Bid' by push new bid to field 'bids' and 
```