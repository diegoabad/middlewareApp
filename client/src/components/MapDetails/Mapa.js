import React, { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getCompanyDetails } from "../../redux/actions";
import "./index.css"
import {
  GoogleMap,
  useLoadScript,
  Marker,

} from "@react-google-maps/api";


import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";


const libraries = ["places"];
const mapContainerStyle = {
  height: "60vh",
  width: "38vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};



export default function Mapa() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyDetails(id))
  }, [dispatch]);

  const companies = useSelector(state => state.details)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCpn70ZJEIvFYTsUyxArbhmtFJXoNgtgo",
    libraries
  });

  //createLocationMarkers();
  console.log('nombre ' + companies.name)
  console.log('lat ' + companies.latitude)
  console.log('lng ' + companies.longitude)
  let la
  let lo
  if (companies.latitude) {
    la = Number(companies.latitude)
    lo = Number(companies.longitude)
  } else {
    la = -34.13091
    lo = -63.38324
  }

  const center = {
    lat: la,
    lng: lo,
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="">
      <div className="card">
        <div className="card-title">
          <h4 className="display-6">
            Empresas{" "}
            <i className="bi bi-people-fill"></i>
          </h4>
        </div>
        <div className="card-body">
          <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={6}
            center={center}
            options={options}

            onLoad={onMapLoad}
          >

            {id && id === companies._id ? (
              <Marker
                key={`${companies.latitude}-${companies.longitude}`}
                position={{ lat: Number(companies.latitude), lng: Number(companies.longitude) }}

                icon={{
                  url: `/company.svg`,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ) : null


            }

          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
