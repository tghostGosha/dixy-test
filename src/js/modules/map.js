import L from 'leaflet';
import jsonData from '/DixyGeo.json';
import 'leaflet-editable';
import 'leaflet/dist/leaflet.css'
import {getStoreDetail, getStoresMap, updateStore} from "../axios/warehouse";
import {string} from "i/lib/util";

let currentPolygon = null;
let currentRadius = null;
let currentWarehouse = null;
let isEditing = false;
let originalPolygonCoordinates = [];
let map;
let warehouseID;
let storeId
const polygonColor = '#47BDFD'
const polygonRadiusColor = '#f2f5ba'
const createPolygonButton = document.querySelector('[data-create="create-poligon"]');
let newPolygon = null;

const mapFooterButtons = document.querySelector('.map-footer-buttons');
const cancelButton = document.querySelector('[data-save="cancel"]');
const cancelEditPolygon = () => {
  if (!currentPolygon) return;
  currentPolygon.disableEdit();
  currentPolygon.setLatLngs(originalPolygonCoordinates);
  toggleEditPolygon();
}
cancelButton.addEventListener('click', cancelEditPolygon);



export const savePolygon = async (id) => {
  console.log(currentPolygon, 'currentPolygon savePolygon')
  if (!currentPolygon) {
    return;
  }
  if(newPolygon) {
    const polygonCoordinates = getCurrentPolygonCoordinates();
    newPolygon.polygon = JSON.stringify(polygonCoordinates);
    updateStore(newPolygon, newPolygon.id)
    toggleEditPolygon()
    isEditing =false
    newPolygon= null
    map.removeLayer(currentRadius);
  }
  try {
    const polygonCoordinates = getCurrentPolygonCoordinates(); // Get the coordinates of the current polygon
    currentWarehouse.polygon = JSON.stringify(polygonCoordinates)
    updateStore(currentWarehouse, id)
    toggleEditPolygon()
    isEditing =false
    map.removeLayer(currentRadius);

  } catch (error) {
    // console.error('Failed to save polygon data:', error);
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
//======Редактирование полигона====///
const editButton = document.querySelector('[data-edit="polygon"]');
const saveButton = document.querySelector('[data-save="save-polygon"]');

editButton.addEventListener('click', toggleEditPolygon)
saveButton.addEventListener('click', () => savePolygon(warehouseID))


export const initializeMap = async (id) => {

  const dataStores = await getStoresMap()
  storeId = dataStores.data.filter(x => x.id === id);
  newPolygon=storeId[0]
  map = new L.Map('map', {
    editable: true,
    preferCanvas: !L.Browser.svg && !L.Browser.vml
  }).setView([storeId[0].latitude, storeId[0].longitude], 16);

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

  const customIcon = L.icon({
    iconUrl: '/assets/img/map-marker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });


  dataStores.data.forEach((w) => {
    const marker = L.marker([w.latitude, w.longitude], {
      icon: customIcon,
      warehouseId: w.id
    }).addTo(map);

    marker.on('click', () => {
      try {
        handleMarkerClick(marker, map, w);
      } catch (e) {
        console.log(e)
      }

    });
  })


  //===========рисуем радиус у выбранного магазина при инициализации карты
  if (storeId[0].polygon && storeId[0].polygon.length > 0) {
    editButton.disabled = false
    currentPolygon = addPolygonToMap(storeId[0], map);
    currentPolygon.on('editable:vertex:new', e => handleNodeAdd(e));

  } else if (storeId[0].radius && !storeId[0].polygon) {
    const center = [storeId[0].latitude, storeId[0].longitude];
    const radiusInMeters = parseFloat(storeId[0].radius) * 1000; // Convert radius from km to meters

    currentRadius = L.circle(center, {
      radius: radiusInMeters,
      color: polygonRadiusColor,
      weight: 2,
      fillOpacity: 0.3,
    }).addTo(map);
  }


}
export const unInitializeMap = () => {
  map.remove()
  deletePolygonButton.disabled = true
  if (currentPolygon) {
    currentPolygon.remove();
    currentPolygon = undefined;
  }
}
const createWarehousePolygon = () => {

  if (currentWarehouse.polygon && currentWarehouse.polygon.length > 0) {
    // console.log('Polygon already exists for the selected warehouse.');
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
  confirmModal.classList.add('confirm-modal', 'action-modal');

  confirmModal.innerHTML = `
    <div class="modalActive">
      <div class="modalWindow" >
        <div class="modal-text">
          <h4>Удалить полигон?</h4>
          <p>Вы уверены, что хотите удалить полигон?</p>
        </div>
        <div class="button__wrapper">
          <button id="cancel_delete" class="secondary__button">Отмена</button>
          <button id="confirm_delete" class="primary__button">OK</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(confirmModal);

  document.getElementById('confirm_delete').addEventListener('click', function () {
    if (currentPolygon) {
      map.removeLayer(currentPolygon);
      // currentPolygon.remove();
      currentPolygon = null;
      currentRadius =null
      currentWarehouse.polygon = JSON.stringify(currentPolygon)
      // удаление полигона
      updateStore(currentWarehouse, warehouseID)
      isEditing =false
    }
    document.body.removeChild(confirmModal);
  });

  document.getElementById('cancel_delete').addEventListener('click', function () {
    document.body.removeChild(confirmModal);
  });
  confirmModal.addEventListener("click", function (event) {
    if (event.target === confirmModal) {
      confirmModal.style.display = "none";
    }
  });
};

const deletePolygonButton = document.getElementById('delete_polygon')

const updateDeleteButtonState = () => {
  deletePolygonButton.disabled = !currentPolygon && false;
};

deletePolygonButton.addEventListener('click', () => showPolygonDeletionConfirmation());

const handleNodeAdd = e => {
  const coordinatesCount = currentPolygon.getLatLngs()[0].length;
  if (coordinatesCount > 100) {
    alert('A polygon must have max 100 nodes');
    currentPolygon.editor.reset();
  }
};

const handleMarkerClick = async (marker, map, warehouse) => {

  if (currentPolygon) {
    map.removeLayer(currentPolygon);
    currentPolygon = null;
  }
  if (currentRadius) {
    map.removeLayer(currentRadius);
    currentRadius = null;
  }

  const storeData= await getStoreDetail(warehouse.id)
  warehouse.polygon=storeData.data.polygon
  warehouseID = warehouse.id
  currentWarehouse = warehouse;
  console.log(warehouse, 'склад')
  // console.log(warehouse.polygon, 'warehouse')
  // if (typeof warehouse.polygon === 'string') {
  //   warehouse.polygon = JSON.parse(warehouse.polygon);
  //   console.log(warehouse.polygon, 'after parse')
  //
  // }
  // currentRadius = currentWarehouse.radius
  if (warehouse.polygon && warehouse.polygon.length > 0) {
    editButton.disabled = false
    currentPolygon = addPolygonToMap(warehouse, map);
    currentPolygon.on('editable:vertex:new', e => handleNodeAdd(e));
  } else if (warehouse.radius && !warehouse.polygon) {
    const center = [warehouse.latitude, warehouse.longitude];
    const radiusInMeters = parseFloat(warehouse.radius) * 1000; // Convert radius from km to meters

    currentRadius = L.circle(center, {
      radius: radiusInMeters,
      color: polygonRadiusColor,
      weight: 2,
      fillOpacity: 0.3,
    }).addTo(map);
    createPolygonButton.classList.remove('disabled');
    editButton.disabled = true
    // console.log(`Circle drawn with radius ${warehouse.radius} km for warehouse:`, warehouse.name);
  } else {
    // console.log(`No polygon or radius specified for warehouse: ${warehouse.name}`);
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
