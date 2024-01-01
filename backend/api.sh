#!/bin/bash

echo " "

token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZTJhMDMwMTMtMDMxOC00NTlkLTgzMDItNjI3OGNjMjUwOTk4IiwiaWF0IjoxNzAzMDMzODg2LCJleHAiOjE3MzQ1OTE0ODZ9.b4CdKRgZCTc5EmlLrraxyUhjRzxy0nu7iV57_rHvdik"

token2="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczNjExNjktOTRiOC00NjgwLTkyMjktMWI4YmM5ODVjYTQ3IiwiaWF0IjoxNzAzMDc5MzYzLCJleHAiOjE3MzQ2MzY5NjN9.bPnBcfE8zYDHxOgGgp8-KXzFIMU1RnmP5xFVBE3FHDk"

tokenl="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMDk3Y2I4ZmEtMWU1OC00MTBmLWJkODQtNjVhNGU2N2U3MmNhIiwiaWF0IjoxNzAzMjczMzY3LCJleHAiOjE3MzQ4MzA5Njd9.x4Q8kmNat3CWv5v3qikSGcAUtjr_7gGcr1AAO4-71hU"

adminToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODE5ZjJhYTUtYTZhYi0xMWVlLThhMjktMDI0MmFjMTMwMDAyIiwiaWF0IjoxNzA0MDQ1OTAyLCJleHAiOjE3MzU2MDM1MDJ9.EaK8kYtBgUIfVY9ZwmpJTMDclffLQR4hlFX_BqgCBbc"

normalUserToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTE1YjNkNDAtYzBkZC00NTQ3LTlkYWMtYTJlMDhhODg3Yjc1IiwiaWF0IjoxNzAzODk3NjgwLCJleHAiOjE3MzU0NTUyODB9.k4X1GUgYQ2W9_S-B4soEMcHq4e_jv2LilDmjGQidOHA"

baseURL="http://172.22.0.2:5000"
game="${baseURL}/game"
user="/user"

listAllGames="${baseURL}${game}"
createUser="${baseURL}/auth/create"
verifyUser="${baseURL}/auth/verify"

login="${baseURL}/auth/login"

addGameURL="${baseURL}/game/save"
pathLoginAdminUser="${baseURL}/auth/admin"

gameid="d1e6ff54-9883-11ee-a09a-0242ac170002"

# User paths
users="${baseURL}/user"
getAllUsers="${users}/all"
removeOneUser="${users}/delete"

function removeGame() {
  curl \
    -X DELETE "${game}/remove" \
    -H "Content-Type: application/json" \
#    -H "Authorization: Bearer ${tokenl}" \
    -d '{ "gameId": "4dbb77b3-9871-11ee-a09a-0242ac170002" }'
}

function userAddOneGame() {
  curl \
    -X POST "${addGameURL}" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${tokenl}" \
    -d '{ "gameId": "d1e72924-9883-11ee-a09a-0242ac170002" }'
}

function listAllGame() {
  curl \
    -X GET "${game}" \
    -s \
    -H "Content-Type: application/json" 
}

function verifyUserF() {
  curl -s \
    -X GET "${verifyUser}" \
    -H "Authorization: Bearer ${tokenl}"
}

function loginFunction() {
  curl \
    -s \
    -X POST "${login}" \
    -H "Content-Type: application/json" \
    -d '{ "userName": "lauta123" }'
}

function crearUsuario(){
  curl \
    -s \
    -X POST "${baseURL}/auth/create" \
    -H "Content-Type: application/json" \
    -d '{ "firtName": "Lautaro", "lastName": "Diaz",  "userName": "lauta1" }'
}

function loginUserAdmin() {
  curl -X GET "${pathLoginAdminUser}" \
    -H "Authorization: Bearer ${adminToken}"
}

getAllUsersF() {
  curl -X GET "${getAllUsers}" \
    -H "Authorization: Bearer ${adminToken}"
}

removeOneuserF() {
  curl -s -X DELETE "${removeOneUser}" \
    -H "Authorization: Bearer ${adminToken}" \
    -H "Content-Type: application/json" \
    -d '{ "userId": "0ac33da6-a77d-11ee-919c-0242ac130002" }'
}

# User
#getAllUsersF
removeOneuserF

#verifyUserF | json_pp
#loginFunction | json_pp
#crearUsuario | json_pp
#loginUserAdmin | json_pp

# Games
#listAllGame
#userAddOneGame
#removeGame | json_pp
