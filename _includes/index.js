function initMap() {
    var mapElem = document.getElementById('map');
    var locationStr = mapElem.getAttribute('data-location');
    var sp = locationStr.split(',');
    var latlng = { lat: parseFloat(sp[0]), lng: parseFloat(sp[1]) };

    var map = new google.maps.Map(mapElem, {
        center: latlng,
        zoom: 16
    });

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: 'I\'m currently here!'
    });

    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center); 
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    var mapElem = document.getElementById('map');
    var locationStr = mapElem.getAttribute('data-location');
    var sp = locationStr.split(',');
    var latlng = { lat: parseFloat(sp[0]), lng: parseFloat(sp[1]) };

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
        var json = JSON.parse(this.responseText);

        if (json.status == "OK") {
            document.getElementById('clock').setAttribute('style', 'display: block;');

            var minuteHand = document.getElementById('minute-hand'), 
            hourHand = document.getElementById('hour-hand'),
            clockDisplay = document.getElementById('clock-time'),
            offset = json.rawOffset + json.dstOffset;

            var updateClock = function() {
                var date = new Date(),
                utc = date.getTime() + (date.getTimezoneOffset() * 60000),
                offsetDate = new Date(utc + 1000 * offset),
                hours = offsetDate.getHours(),
                minutes = offsetDate.getMinutes();

                /* -90 because of the initial rotation */
                var minuteAngle = -90 + minutes * 6,
                hourAngle = -90 + hours * 30 + (minutes / 2);

                hourHand.setAttribute('style', 'transform: rotate(' + hourAngle + 'deg);');
                minuteHand.setAttribute('style', 'transform: rotate(' + minuteAngle + 'deg);');

                var hours12 = hours % 12, minutes12 = minutes;
                if (hours12 == 0) 
                    hours12 = 12;

                if (hours12 < 10)
                    hours12 = "0" + hours12;

                if (minutes12 < 10)
                    minutes12 = "0" + minutes12;

                clockDisplay.innerHTML = hours12 + ":" + minutes12 + " " + (hours < 12 ? "AM" : "PM");
            }

            updateClock();
            window.setInterval(updateClock, 30000);
        }
    });

    var timestamp = Math.floor(Date.now() / 1000);
    xhr.open("GET", "https://maps.googleapis.com/maps/api/timezone/json?location=" + latlng.lat + "," + latlng.lng + "&timestamp=" + timestamp);
    xhr.send();
});
