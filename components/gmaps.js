

// The latitude and longitude of your business / place
var position1 = [51.5285097, -0.0923402]; // 186 City Rd, London EC1V 2NT
var position2 = [51.5182121, -0.0917254]; // 1 Fore Street, London, UK
var position3 = [40.7039934,-74.0133265]; // 85 Broad Sreet, New York, NY 10018, USA
var position4 = [39.7525339,-105.0053551]; // 1550 Wewatta St, Denver, CO 80202, USA
var position5 = [53.3305221, -6.2281275]; // Alexandra House, Ballsbridge Business Park, Ballsbridge Park, Merrion Rd, Dublin Southside, Dublin 4, Ireland


// LONDON 1
function showGoogleMaps() {

    var latLng = new google.maps.LatLng(position1[0], position1[1]);


    var mapOptions = {
        zoom: 18, // initialize zoom level - the max value is 21
        streetViewControl: true, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latLng
    };

    map = new google.maps.Map(document.getElementById('googlemaps'),
        mapOptions);


    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps);

//////////////// LONDON 2

function showGoogleMaps2() {

    var latLng2 = new google.maps.LatLng(position2[0], position2[1]);


    var mapOptions2 = {
        zoom: 18, // initialize zoom level - the max value is 21
        streetViewControl: true, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latLng2
    };

    map2 = new google.maps.Map(document.getElementById('googlemapsldn2'),
        mapOptions2);


    // Show the default red marker at the location
    marker2 = new google.maps.Marker({
        position: latLng2,
        map: map2,
        draggable: false,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps2);

//////////////// NYC

function showGoogleMaps3() {

    var latLng = new google.maps.LatLng(position3[0], position3[1]);


    var mapOptions = {
        zoom: 18, // initialize zoom level - the max value is 21
        streetViewControl: true, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latLng
    };

    map = new google.maps.Map(document.getElementById('googlemapsnyc'),
        mapOptions);


    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps3);

//////////////// DENVER

function showGoogleMaps4() {

    var latLng = new google.maps.LatLng(position4[0], position4[1]);


    var mapOptions = {
        zoom: 18, // initialize zoom level - the max value is 21
        streetViewControl: true, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latLng
    };

    map = new google.maps.Map(document.getElementById('googlemapsden'),
        mapOptions);


    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps4);

//////////////// DUBLIN

function showGoogleMaps5() {

    var latLng = new google.maps.LatLng(position5[0], position5[1]);


    var mapOptions = {
        zoom: 18, // initialize zoom level - the max value is 21
        streetViewControl: true, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latLng
    };

    map = new google.maps.Map(document.getElementById('googlemapsdub'),
        mapOptions);


    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps5);
