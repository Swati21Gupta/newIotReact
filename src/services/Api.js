import superagent from 'superagent';
import io from 'socket.io-client';

const BASE_URL = 'http://139.59.95.113:8080/';
const SOCKET = io('http://139.59.95.113:8080/',{transports: ['websocket']});
// const authToken = 'JWT '+localStorage.token;
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyIsInR5cGUiOiJhY2Nlc3MifQ.eyJ1c2VySWQiOjEsImFjY291bnRJZCI6MSwiaWF0IjoxNTEzOTM2NDMzLCJleHAiOjE1MTY1Mjg0MzMsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6ImFmNmYwYTAxLTdhZWQtNDJiNi04NTc0LTRkZjY0OWM1NjI2NSJ9.jTidF2uVYFhE-Fm3xJ7TJIeL_wFcVS-Is4OQM7f4ewM';

const JWTauthToken = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyIsInR5cGUiOiJhY2Nlc3MifQ.eyJ1c2VySWQiOjIsImFjY291bnRJZCI6MSwiaWF0IjoxNTA2NDIyMTIwLCJleHAiOjE1MDY1MDg1MjAsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyJ9.bR5Xd6RArC5E9RJUEeYLm0f3ELztmAECGb4zfzC09kw';
function scoreCardData(date) {
    return superagent.get(BASE_URL+"i-route")
                     .set({'authorization':authToken})
					 .query({criteria:{requestType:"order", plannedDeliveryDate: date}})
}

function magicWandService(date) {
  console.log("date",date)
    return superagent.get(BASE_URL+"i-route")
                     .set({'authorization': JWTauthToken})
					 .query({criteria:{requestType: "route", plannedDeliveryDate: date, algoName: "SA"}})
}

function lockedRouteService(data) {
  console.log("data in service", data)
    return superagent.patch(BASE_URL+"orders")
                     .set({'authorization': authToken})
                     .send({type: data.type, algo: data.algo, orderId: data.orderId, routeId: data.routeId, problemId: data.problemId})
}
//@ Vehicle master API
function importVehicles(file) {
  console.log("data in service", file)
    return superagent.post(BASE_URL+"vehicles")
                     .set({'authorization': authToken})
                     .set('Content-Type', 'application/x-www-form-urlencoded')
                     .send({'file': file})
}
function vehiclesData(queryObj) {
    return superagent.get(BASE_URL+"vehicles")
                     .set({'authorization':authToken})
                     .query(queryObj)
}
function deleteVehicle(vehicleId) {
    return superagent.delete(BASE_URL+"vehicles")
                     .set({'authorization':authToken})
                     .query({vehicleId:vehicleId})
}
//@ order master API
function importOrders(file) {
  console.log("data in service", file)
    return superagent.post(BASE_URL+"orders")
                     .set({'authorization': authToken})
                     .set('Content-Type', 'application/x-www-form-urlencoded')
                     .send({'file': file})
}
function getOrdersData(queryObj) {
    return superagent.get(BASE_URL+"orders")
                     .set({'authorization':authToken})
                     .query(queryObj)
}
function deleteOrder(orderId) {
    return superagent.delete(BASE_URL+"orders")
                     .set({'authorization':authToken})
                     .query({orderId:orderId})
}
//@ locations master API
function importLocations(file) {
  console.log("data in service", file)
    return superagent.post(BASE_URL+"location")
                     .set({'authorization': authToken})
                     .set('Content-Type', 'application/x-www-form-urlencoded')
                     .send({'file': file})
}
function getLocationsData(queryObj) {
    return superagent.get(BASE_URL+"location")
                     .set({'authorization':authToken})
                     .query(queryObj)
}
function deleteLocation(serviceLocationId) {
    return superagent.delete(BASE_URL+"location")
                     .set({'authorization':authToken})
                     .query({serviceLocationId:serviceLocationId})
}
//@ drivers master API
function importDrivers(file) {
  console.log("data in service", file)
    return superagent.post(BASE_URL+"drivers")
                     .set({'authorization': authToken})
                     .set('Content-Type', 'application/x-www-form-urlencoded')
                     .send({'file': file})
}
function getDriversData(queryObj) {
    return superagent.get(BASE_URL+"driver")
                     .set({'authorization':authToken})
                     .query(queryObj)
}
function deleteDriver(driverId) {
    return superagent.delete(BASE_URL+"drivers")
                     .set({'authorization':authToken})
                     .query({driverId:driverId})
}
//@ region master API
function importRegions(file) {
  console.log("data in service", file)
    return superagent.post(BASE_URL+"region")
                     .set({'authorization': authToken})
                     .set('Content-Type', 'application/x-www-form-urlencoded')
                     .send({'file': file})
}
function getRegionsData(queryObj) {
    return superagent.get(BASE_URL+"region")
                     .set({'authorization':authToken})
                     .query(queryObj)
}
function deleteRegion(regionId) {
    return superagent.delete(BASE_URL+"region")
                     .set({'authorization':authToken})
                     .query({regionId:regionId})
}
export {BASE_URL,authToken, scoreCardData, magicWandService, lockedRouteService, importVehicles,vehiclesData,deleteVehicle,importOrders,getOrdersData,deleteOrder,importLocations, getLocationsData, deleteLocation, importDrivers, getDriversData, deleteDriver,importRegions, getRegionsData, deleteRegion, SOCKET}
