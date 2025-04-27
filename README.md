<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Item API Spec

## Create Item

**Endpoint** : POST `/item`

**Request Body** :

```json
{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone",
  "price": 25000000,
  "quantity": 10,
  "categoryId": 1,
  "supplierId": 1,
  "createdBy": 1
}
```

**Response Body**

```json
{
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone",
    "price": 25000000,
    "quantity": 10,
    "categoryId": 1,
    "supplierId": 1,
    "createdBy": 1
  }
}
```

## Get Item By Id

**Endpoint** : GET `/item/:id`
**Respones Body**

```json
{
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone",
    "price": 25000000,
    "quantity": 10,
    "categoryId": 1,
    "supplierId": 1,
    "createdBy": 1
  }
}
```

## Get All Item

**Endpoint** : GET `/item`

**Response Body**

```json
{
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "description": "Latest iPhone",
      "price": 25000000,
      "quantity": 10,
      "categoryId": 1,
      "supplierId": 1,
      "createdBy": 1
    },
    {
      "id": 2,
      "name": "MacBook Pro",
      "description": "Powerful laptop",
      "price": 35000000,
      "quantity": 5,
      "categoryId": 1,
      "supplierId": 2,
      "createdBy": 2
    }
  ]
}
```

## Update Item

**Endpoint** : PATCH `/item/:id`
**Request Body**

```json
{
  "name": "iPhone 15 Pro Max",
  "description": "Latest iPhone Pro Max",
  "price": 27000000,
  "quantity": 15,
  "categoryId": 1,
  "supplierId": 1
}
```

**Response Body**

```json
{
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "description": "Latest iPhone Pro Max",
    "price": 27000000,
    "quantity": 15,
    "categoryId": 1,
    "supplierId": 1,
    "createdBy": 1
  }
}
```

## Delete item

**Endpoint**: DELETE /item/:id
**Response Body**

```json
{
  "data": true
}
```

## Get Supplier Summary

**Endpoint:** GET /item/summary/supplier
**Response Body**

```json
{
  "data": [
    {
      "supplierId": 1,
      "supplierName": "Supplier A",
      "totalItems": 25
    },
    {
      "supplierId": 2,
      "supplierName": "Supplier B",
      "totalItems": 10
    }
  ]
}
```

## Get Category Summary

**Endpoint:** GET /item/summary/category
**Response Body**

```json
{
  "data": [
    {
      "categoryId": 1,
      "categoryName": "Electronics",
      "totalItems": 35
    },
    {
      "categoryId": 2,
      "categoryName": "Clothing",
      "totalItems": 15
    }
  ]
}
```

# Category API Spec

## Create Category

**Endpoint**: `POST /category`

**Request Body**:

```json
{
  "name": "Electronics",
  "description": "Kategori barang-barang elektronik"
}
```

**Response Body**

```json
{
  "data": {
    "id": 1,
    "name": "Electronics",
    "description": "Kategori barang-barang elektronik"
  }
}
```

## Get Category By ID

**Endpoint**: `POST /category/:id`

```json
{
  "data": {
    "id": 1,
    "name": "Electronics",
    "description": "Kategori barang-barang elektronik"
  }
}
```

## Get All Categories

**Endpoint:** GET /category

**Response Body**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Kategori barang-barang elektronik"
    },
    {
      "id": 2,
      "name": "Fashion",
      "description": "Kategori pakaian dan aksesoris"
    }
  ]
}
```

## Delete Categories

**Endpoint:** DELETE /category/:id

**Response Body**

```json
{
  "data": true
}
```

# Supplier API Spec

## Create Supplier

**Endpoint** : POST `/suppliers`

**Request Body**:

```json
{
  "name": "Supplier A",
  "contactInfo": "supplierA@example.com"
}
```

**Response Body**

```json
{
  "data": {
    "id": 1,
    "name": "Supplier A",
    "contactInfo": "supplierA@example.com"
  }
}
```

## Get Supplier By ID

**Endpoint :** GET /suppliers/:id
**Response Body**

```json
{
  "data": {
    "id": 1,
    "name": "Supplier A",
    "contactInfo": "supplierA@example.com"
  }
}
```

## Get All Supplier

**Endpoint :** GET /suppliers
**Response Body**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Supplier A",
      "contactInfo": "supplierA@example.com"
    },
    {
      "id": 2,
      "name": "Supplier B",
      "contactInfo": "supplierB@example.com"
    }
  ]
}
```
