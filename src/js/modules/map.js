import L from 'leaflet';
// import jsonData from '/DixyGeo.json';
import 'leaflet-editable';
import 'leaflet/dist/leaflet.css'
import {getStoreDetail, getStoresMap, updateStore} from "../axios/warehouse";
// import {string} from "i/lib/util";

let currentPolygon = '';
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

  if (!currentPolygon) {
    return;
  }
  // try {
  //   if(newPolygon) {
  //
  //     const polygonCoordinates = getCurrentPolygonCoordinates();
  //     newPolygon.polygon = JSON.stringify(polygonCoordinates);
  //     console.log( newPolygon.polygon, 'newPolygon')
  //     updateStore(newPolygon, newPolygon.id)
  //     map.removeLayer(currentRadius);
  //     toggleEditPolygon()
  //     isEditing =false
  //     newPolygon= null
  //
  //   }
  // } catch (e) {
  //   console.log(e)
  // }

  try {
    const polygonCoordinates = getCurrentPolygonCoordinates(); // Get the coordinates of the current polygon
    currentWarehouse.polygon = JSON.stringify(polygonCoordinates)
    console.log(currentWarehouse.polygon, 'currentPolygon')
    updateStore(currentWarehouse, id)
    if (currentRadius) {
      map.removeLayer(currentRadius);
    }
    toggleEditPolygon()
    editButton.disabled = false
    deletePolygonButton.disabled = false
  } catch (error) {

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
  // newPolygon=storeId[0]
  currentWarehouse = storeId[0]
  warehouseID = currentWarehouse.id
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


  for (let w of dataStores.data) {
    const marker = L.marker([w.latitude, w.longitude], {
      icon: customIcon,
      warehouseId: w.id,
      title: w.xml_id
    }).addTo(map);

    marker.on('click', () => {
      try {
        handleMarkerClick(marker, map, w);
      } catch (e) {
        console.log(e)
      }

    });
    // marker.bindPopup(`${w.xml_id}`).openPopup();
  }
  console.log(currentWarehouse, 'currentWarehouse')
  // const activeStore = L.marker([currentWarehouse.latitude, currentWarehouse.longitude], {icon: customIcon,
  //   warehouseId: currentWarehouse.id}).addTo(map);
  // activeStore.bindPopup(`${currentWarehouse.xml_id}`).openPopup();

  // dataStores.data.forEach((w) => {
  //   const marker = L.marker([w.latitude, w.longitude], {
  //     icon: customIcon,
  //     warehouseId: w.id,
  //
  //   }).addTo(map);
  //
  //   marker.on('click', () => {
  //     try {
  //       handleMarkerClick(marker, map, w);
  //     } catch (e) {
  //       console.log(e)
  //     }
  //
  //   });
  //   marker.bindPopup(`${w.xml_id}`).openPopup();
  // })


  //===========рисуем радиус у выбранного магазина при инициализации карты
  if (storeId[0].polygon && storeId[0].polygon.length > 0) {
    editButton.disabled = false
    deletePolygonButton.disabled = false
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
    createPolygonButton.classList.remove('disabled');
    editButton.disabled = true

  }


}

export const unInitializeMap = () => {
  map.remove()
  mapFooterButtons.style.display = 'none';
  isEditing = false
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

  if (currentRadius) {
    //==если задаем полигон, то убираем слой радиуса
    map.removeLayer(currentRadius);
  }
  createPolygonButton.classList.add('disabled');
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
      currentPolygon = '';
      currentWarehouse.polygon = JSON.stringify(currentPolygon)
      // удаление полигона
      updateStore(currentWarehouse, warehouseID)
      isEditing = false
      currentWarehouse.polygon = null

      // при удалении полигона рисуем радиус
      const center = [currentWarehouse.latitude, currentWarehouse.longitude];
      const radiusInMeters = parseFloat(currentWarehouse.radius) * 1000; // Convert radius from km to meters

      currentRadius = L.circle(center, {
        radius: radiusInMeters,
        color: polygonRadiusColor,
        weight: 2,
        fillOpacity: 0.3,
      }).addTo(map);

      createPolygonButton.classList.remove('disabled');
      deletePolygonButton.disabled = true
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
    currentPolygon = '';
  }
  if (currentRadius) {
    map.removeLayer(currentRadius);
    currentRadius = null;
  }

  const storeData = await getStoreDetail(warehouse.id)
  warehouse.polygon = storeData.data.polygon
  warehouseID = warehouse.id
  currentWarehouse = warehouse;
  mapFooterButtons.style.display = 'none';
  isEditing = false


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
