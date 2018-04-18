import React, { Component } from 'react';
import {H} from "./../HereMapVariable"
import {magicWandData} from './MagicWandData';

var map;
var mapContainer;
var platform;
var behavior;
var ui;
var markerMap;
var routeColor;
var routeColor2;
var routeMarkersMap;
var routeParams;
var routeRequestParams = [];
var routeLine;
var startPoint;
var endPoint;
var container = '';
//Create the svg mark-up
// var styleMap = {background: '#fff',
//     position: 'absolute',
//     bottom: '.5em',
//     padding: '0 1.2em 0 0',
//     borderRadius: '.2em',
//     marginRight: '-1em',
//     right: 0,
//     color:'#000000',
//     fontSize: '14px',
//     width: '150px',
//     padding: '10px',
//     fontWeight: 300,
//     lineHeight: '27px'
// }
var svgMarkupRect = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
  '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
  'text-anchor="middle" fill="${STROKE}" >U</text></svg>';


class MapComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
		// this.loadDefaultMap()
    this.initRouteMaps();
		//this.addMarker(this.props.stopLat)
   
    this.showUnassignedOrdersLocOnMap(this.props.stopLat)
    // console.log("showRoutesOnMap",magicWstopLatandData.data[0].routeSolutionInfo[0])
    // this.showRoutesOnMap(this.props.routeLatLng);
  }
  componentWillReceiveProps(nextProps) {
    console.log("yupe i am in if")
    //this.removeUnassignedOrdersLocFromMap(this.props.stopLat);
    if (nextProps.isShowRoutes && nextProps.isMagicWand) {
      console.log("stopLatLng",nextProps.stopLat,"this.props.stopLat",this.props.stopLat)
      this.removeUnassignedOrdersLocFromMap(this.props.stopLat);
      this.removeAssignedOrdersLocFromMap();
      console.log("routeLatLng",nextProps.routeLatLng)
      this.showRoutesOnMap(nextProps.routeLatLng);
    }
  }

  initRouteMaps = () => {
  	// set up containers for the map  + panel
  	mapContainer = this.refs.maps,
  	//Step 1: initialize communication with the platform
  	platform = new H.service.Platform({
  	  app_id: 'Al5tgaPr5g8HtPsaZBNn',
  	  app_code: 'WvD8NKncfWAtlJ2RgsDmEg',
  	  useCIT: true,
  	  useHTTPS: true
  	});
  	var defaultLayers = platform.createDefaultLayers();
  	//Step 2: initialize a map - this map is centered over Berlin
  	map = new H.Map(mapContainer,
  	  defaultLayers.normal.map,{
      // center: {lat:25.123091, lng:55.21082},
      center: {lat:25.123091 , lng:55.21082 },
      // zoom: 13
      zoom: 13
  	});
  	//Step 3: make the map interactive
  	// MapEvents enables the event system
  	// Behavior implements default isnteractions for pan/zoom (also on mobile touch environments)
  	behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  	// Create the default UI components
  	ui = H.ui.UI.createDefault(map, defaultLayers);
  }

  loadDefaultMap = () => {

    var platform = new H.service.Platform({
		// 'app_id': 'o5HCoO8n10C0uaygGbVR',
		// 'app_code': 'FWOiaUCYVfglvEqXWNDbKQ'
    'app_id': 'Al5tgaPr5g8HtPsaZBNn',
    'app_code': 'WvD8NKncfWAtlJ2RgsDmEg'
    });

    var maptypes = platform.createDefaultLayers();
		map = new H.Map(
					this.refs.maps,
					maptypes.normal.map,
					{
					  zoom : 13 ,
					  center : {
								lat:25.123091 , lng:55.21082 
						  }
					});

    // var mapEvents = ;
		var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
	}

  addMarker = (points) => {

	let marker =[];

        for(let j=0; j<(points.length); j++) {

          var svgMarkupNumber = '<svg width="24" height="24" ' +
          'xmlns="http://www.w3.org/2000/svg">' +
          '<rect stroke="white" fill="${FILL}" x="1" y="1" width="22" ' +
          'height="22" /><text x="12" y="18" font-size="10pt" ' +
          'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
          'fill="#ffffff">'+"U"+'</text></svg>';

          var iconNumber = new H.map.Icon(svgMarkupNumber.replace('${FILL}', "red"))

          marker.push(new H.map.Marker(points[j],{icon : iconNumber}));
		  		map.addObject(marker[j]);
        }
  }

  createMarkerIcon = (fillColor, strokeColor, lat, lng) => {
    var mIcon = new H.map.Icon( svgMarkupRect.replace('${FILL}', fillColor ).replace('${STROKE}',
          strokeColor));

    var routeMarker = new H.map.Marker({lat: lat, lng: lng },{icon: mIcon});

    return routeMarker;
  }

  showUnassignedOrdersLocOnMap = (order=[]) =>
  {

    var grouping = [];
    markerMap = new Map();
    // add 'tap' event listener, that opens info bubble, to the group
    map.addEventListener('tap', function (evt) {
      // event target is the marker itself, group is a parent event target
      // for all objects that it contains
      var previousBubbles = ui.getBubbles();

      previousBubbles.forEach(function(bubs) {
        ui.removeBubble(bubs);
      });

      var bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
        // read custom data
        content: evt.target.getData()
      });
      // show info bubble
      ui.addBubble(bubble);
    }, false);

    order.forEach((info, index) => {
      
      var locMarker = this.createMarkerIcon('red', 'white', info.locations.lat, info.locations.lng);
      markerMap.set(index, locMarker)
      locMarker.setData(

        '<div><div> Order : 1'+
        '<div> Items : '+info.lineItems.length+
        '<div> Size 1 - '+info.size1+
        '<div> Size 2 - '+info.size2+
        '<div> Size 3 - '+info.size3+'</div></div>'
      );
      map.addObject(locMarker);
      //map.removeObject(locMarker);
    })
  }

  removeUnassignedOrdersLocFromMap = (latlng) => {
		if(latlng !== undefined && latlng.length !==0 ){
			markerMap.forEach(function(value, key)
			{
				map.removeObject(value);
			});
		}
	}

  buildSVGMarkup = (type, fillColor, strokeColor, character, lat, lng) => {
  	if (type == '1') {
  			//Create the svg mark-up
  	var svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
  	  '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
  	  '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
  	  'text-anchor="middle" fill="${STROKE}" >${CHARACTER}</text></svg>';

  	}else {
  	//Create the svg mark-up
  	var svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
    	  '<circle stroke="black" fill="${FILL}" x="50" y="50" r="40"/>' +
  	  '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
  	  'text-anchor="middle" fill="${STROKE}" >${CHARACTER}</text></svg>';
  	}

  	//Create map icon
  	var mapIcon = new H.map.Icon( svgMarkup.replace('${FILL}', fillColor ).replace('${STROKE}',
  				strokeColor).replace('${CHARACTER}', character));

  	//Create map marker
  	var mapMarker = new H.map.Marker({lat: lat, lng: lng },{icon: mapIcon});

  	return mapMarker;
  }

  //************************* UNASSIGNED ORDERS DONE *****************************
  //*************************  ASSIGNED ORDERS START *****************************
  removeAssignedOrdersLocFromMap = () => {
  	var a = (typeof(routeMarkersMap) === 'undefined' )?0:1;
  	if(a===1)
  	{
  		routeMarkersMap.forEach(function(value, key)
  		{
  			// console.log('ROUTE DATA Length--', value)
  			map.removeObject(value);
  		});
  	}
  }

  addRouteShapeToMap = (route) => {
  	//console.log(route,"checkingggg")
    var lineString = new H.geo.LineString(),
      routeShape = route.shape,
      polyline;

    routeShape.forEach(function(point) {
      var parts = point.split(',');
      lineString.pushLatLngAlt(parts[0], parts[1]);
    });
    //console.log(routeColor2[Math.random()*6|0],'uuuuuuuuuuuuuuu')
    routeLine = new H.map.Polyline(lineString, {
      style: {
        lineWidth: 3,
        strokeColor: routeColor2
      },
    });

    // Retrieve the mapped positions of the requested waypoints:
    //console.log(routeParams,'=====')
    if(container)
  	{
  		map.removeObject(container)
  	}

    container = new H.map.Group({
      objects: [routeLine]
    });

    // Add the polyline to the map
    map.addObject(container)
    // And zoom to its bounding rectangle
    map.setViewBounds(container.getBounds());
  }

  onSuccess = (result) => {

  	console.log('ROUTE RESULT-', result)
  	var route = result.response?result.response.route[0]:'';
    if(route)
  	 this.addRouteShapeToMap(route);
  	//addMarker(route)
  }
  onError = (error) => {
    alert('Error Routing');
  }
  calculateRoutingForMap(routeData) {
  	var router = platform.getRoutingService();
  	routeParams = {
        mode: 'fastest;truck',
        representrouteIdation: 'display',
        routeattributes : 'waypoints,summary,shape,legs',
        maneuverattributes: 'direction,action',
   	};

  	var stops = routeData.stops
  	// Create waypoints for all the stops
  	stops.forEach((d, i) => {
  		routeParams["waypoint"+ i ] = d.lat + "," + d.lng
  		//waypoints["waypoint"+ i ] = d.lat + "," + d.lng
  	})
  	routeRequestParams.push(routeParams)
  	// console.log( 'ROUTE PARAMS -', routeParams )
  	router.calculateRoute(
  	    	routeParams,
  	    	this.onSuccess,
  	    	this.onError
  	  	);
  }

  showRoutesOnMap = (routeData) => {
  	routeColor = ['red','orange','yellow','green','blue','purple'];
  	// routeColor2 = routeColor[Math.random()*6|0]
    routeColor2 = routeData.rowColor===undefined ? '' : routeData.rowColor
  	routeMarkersMap = new Map()

  	var stops = routeData.stops
  	//console.log('ROUTE DATA Length--', stops)

  	routeMarkersMap.forEach(function(value, key)
  	{
  		console.log(value,'OOOO');
  		//map.removeObject(value);
  	});
  	stops.forEach((stop, index) => {
  		//Add Markers Stops on Routes - DEPOT and SERVICELOCATIONS
  		var assinedLocMarker;
  		if (stop.locationType == 'DEPOT') {
  			assinedLocMarker = this.buildSVGMarkup('0', 'blue', 'white', 'D', stop.lat, stop.lng)
  		} else {
  			assinedLocMarker = this.buildSVGMarkup('1', routeColor2, 'white', stop.sequence, stop.lat, stop.lng)
  		}

  		routeMarkersMap.set(index, assinedLocMarker)

  		assinedLocMarker.setData(
        '<div style={styleMap}><a href=\'http://#\' >'+stop.sequence+'</a>' +
        '</div><div class="font-size1"> Location : '+stop.stopName+
        '</div><div class="font-size1"> Orders : '+stop.orders.length+
  			'</div><div class="font-size1"> Location Type :'+stop.locationType+'</div>');

  		//Add the marker to the route
  		map.addObject(assinedLocMarker);

  		//Store the markers reference on route to be removed later
  		//routeMarkersMap.set( routeData.routeId + '-'+ index, assinedLocMarker)
  	})
  	//Calculate Routes
  	this.calculateRoutingForMap(routeData)
  }

  render() {

	return (
		<div ref={"maps"} className="gmap" ></div>
    );
  }
}
export default MapComponent
