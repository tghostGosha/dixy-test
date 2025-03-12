import L from 'leaflet';
import jsonData from '/DixyGeo.json';
import 'leaflet-editable';

let currentPolygon = null;
let currentWarehouse = null;
let isEditing = false;
let originalPolygonCoordinates = [];
let map;
const polygonColor = '#47BDFD'
const createPolygonButton = document.querySelector('[data-create="create-poligon"]');


const mapFooterButtons = document.querySelector('.map-footer-buttons');
const cancelButton = document.querySelector('[data-save="cancel"]');
const cancelEditPolygon = () => {
    if (!currentPolygon) return;
    currentPolygon.disableEdit();
    currentPolygon.setLatLngs(originalPolygonCoordinates);
    toggleEditPolygon();
}
cancelButton.addEventListener('click', cancelEditPolygon);


export const savePolygon = async () => {
    console.log('handleSavePolygonClick')
    if (!currentPolygon) {
        console.error('No polygon to save.');
        return;
    }
    try {
        const polygonCoordinates = getCurrentPolygonCoordinates(); // Get the coordinates of the current polygon
        // const response = await axios.patch('/api/polygon', {
        //     coordinates: polygonCoordinates
        // });
        // console.log('Polygon data saved successfully:', response.data);
        toggleEditPolygon()
    } catch (error) {
        console.error('Failed to save polygon data:', error);
    }
}

export const toggleEditPolygon = () => {
    if (!currentPolygon) return;
    if (!isEditing) {
        originalPolygonCoordinates = getCurrentPolygonCoordinates();
        currentPolygon.enableEdit();
        mapFooterButtons.style.display = 'flex';
    } else {
        currentPolygon.disableEdit();
        mapFooterButtons.style.display = 'none';
    }
    isEditing = !isEditing;
}

export const initializeMap = async () => {
    try {
        // const response = await fetch('https://delivery.dixy.ru/sklad/id');
        // const jsonData2 = await response.json();
    } catch (err) {
        console.log(err);
    }
    map = L.map('map', {
        editable: true,
    }).setView([55.7558, 37.6173], 12);
    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '© OpenStreetMap Contributors',
        })
        .addTo(map);
    const attributionControl = document.querySelector('.leaflet-control-attribution');

    if (attributionControl) {
        attributionControl.remove();
    }

    console.log(jsonData);
    const customIcon = L.icon({
        // iconUrl: './img/svgicons/map-marker.svg',
        iconUrl: './img/map-marker.svg',

        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    jsonData.warehouses.forEach((w) => {
        const marker = L.marker([w.latitude, w.longitude], {
            icon: customIcon
        }).addTo(map);
        // const marker = L.marker([w.latitude, w.longitude]).addTo(map);

        marker.on('click', () => {
            handleMarkerClick(marker, map, w);
        });


        // const marker = L.marker([w.latitude, w.longitude], {
        //     icon: L.divIcon({
        //         className: 'custom-marker',
        //         html: `
        //     <div class="marker-content">
        //         <div class="marker-column left">
        //             <div class="marker-name">${w.name}</div>
        //         </div>
        //         <div class="marker-column right">
        //             <div class="marker-name">${w.name}</div>
        //         </div>
        //     </div>
        // `,
        //         iconSize: [200, 80],    // Adjust size as needed
        //         iconAnchor: [100, 80],  // Center bottom point as anchor
        //         popupAnchor: [0, -80]   // Popup position above the marker
        //     })
        // }).addTo(map);
        // marker.on('click', () => {
        //     handleMarkerClick(marker, map, w);
        // });
    })
}
const createWarehousePolygon = () => {
    console.log('createWarehousePolygon')
    if (currentWarehouse.polygon && currentWarehouse.polygon.length > 0) {
        console.log('Polygon already exists for the selected warehouse.');
        return
    }
    const lat = parseFloat(currentWarehouse.latitude);
    const lon = parseFloat(currentWarehouse.longitude);
    const defaultPolygonCoordinates = [
        [lat + 0.001, lon + 0.001],
        [lat + 0.001, lon - 0.001],
        [lat - 0.001, lon - 0.001],
        [lat - 0.001, lon + 0.001],
    ];
    currentPolygon = L.polygon(defaultPolygonCoordinates, {
        color: polygonColor,
        weight: 2,
        fillOpacity: 0.4,
        editable: true,
    }).addTo(map);
    currentWarehouse.polygon = defaultPolygonCoordinates.map(coord => ({
        lat: coord[0],
        lon: coord[1],
    }));
    currentPolygon.enableEdit();
    currentPolygon.on('editable:vertex:new', e => handleNodeAdd(e));
    toggleEditPolygon()
};

createPolygonButton.addEventListener('click', createWarehousePolygon);

const showPolygonDeletionConfirmation = () => {
    const confirmModal = document.createElement('div');
    confirmModal.classList.add('confirm-modal');
    confirmModal.innerHTML = `
        <div class="modal-content">
            <p>Вы уверены, что хотите удалить полигон?</p>
            <button id="confirm_delete" class="confirm-button">Да</button>
            <button id="cancel_delete" class="cancel-button">Нет</button>
        </div>
    `;

    document.body.appendChild(confirmModal);

    document.getElementById('confirm_delete').addEventListener('click', function () {
        if (currentPolygon) {
            currentPolygon.remove();
            currentPolygon = null;
        }
        alert('Полигон успешно удалён');
        document.body.removeChild(confirmModal);
    });
    document.getElementById('cancel_delete').addEventListener('click', function () {
        document.body.removeChild(confirmModal);
    });
};
const deletePolygonButton = document.getElementById('delete_polygon')
const updateDeleteButtonState = () => {
    if (currentPolygon) {
        deletePolygonButton.disabled = false; // Enable the delete button
    } else {
        deletePolygonButton.disabled = true; // Disable the delete button
    }
};
deletePolygonButton.addEventListener('click', () => showPolygonDeletionConfirmation());
const handleNodeAdd = e => {
    const coordinatesCount = currentPolygon.getLatLngs()[0].length;
    if (coordinatesCount > 100) {
        alert('A polygon must have max 100 nodes');
        currentPolygon.editor.reset();
    }
};
const handleMarkerClick = (marker, map, warehouse) => {
    if (currentPolygon) {
        map.removeLayer(currentPolygon);
        currentPolygon = null;
    }
    currentWarehouse = warehouse;
    if (warehouse.polygon && warehouse.polygon.length > 0) {
        currentPolygon = addPolygonToMap(warehouse, map);
        currentPolygon.on('editable:vertex:new', e => handleNodeAdd(e));
    } else if (warehouse.radius) {
        const center = [warehouse.latitude, warehouse.longitude];
        const radiusInMeters = parseFloat(warehouse.radius) * 1000; // Convert radius from km to meters

        currentPolygon = L.circle(center, {
            radius: radiusInMeters,
            color: polygonColor,
            weight: 2,
            fillOpacity: 0.2,
        }).addTo(map);

        console.log(`Circle drawn with radius ${warehouse.radius} km for warehouse:`, warehouse.name);
    } else {
        console.log(`No polygon or radius specified for warehouse: ${warehouse.name}`);
        createPolygonButton.classList.remove('disabled');
    }
    updateDeleteButtonState();
    map.setView([warehouse.latitude, warehouse.longitude], 16);
};

const addPolygonToMap = (warehouse, map) => {
    const polygonCoordinates = warehouse.polygon.map(p => [p.lat, p.lon]);
    const addedPolygon = L.polygon(polygonCoordinates, {
        color: polygonColor,
        fillOpacity: 0.3
    }).addTo(map);
    return addedPolygon;
};
const getCurrentPolygonCoordinates = () => {
    const coordinates = currentPolygon.getLatLngs()[0].map(latLng => ({
        lat: latLng.lat,
        lon: latLng.lng
    }));
    return coordinates;
};
