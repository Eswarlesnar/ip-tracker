import React, { useEffect, useState  , useReducer} from 'react'
import { MapContainer  } from 'react-leaflet/MapContainer'
import {TileLayer} from "react-leaflet/TileLayer"
import {Marker} from "react-leaflet/Marker"
import axios from "axios"
import { ResultsType } from '../../App'
import "./map.css"


interface Props {
   ipAddress : string | null
   handleResults : (payload : ResultsType) => void
}


const Map : React.FC<Props> = ({ipAddress , handleResults} ) => {
   const [location , setLocation]  = useState<[number , number] | undefined>()
   const [loading , setLoading]  = useState(true)
   const [apiError , setApiError] = useState(false)
   const getLocation = async () => {
      setApiError(false)
      setLoading(true)
      const apiKey = import.meta.env.VITE_APP_API_KEY
      let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`
      if(ipAddress){
         url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
      }
      try{
         const response = await axios.get(url)
         const {data} = response
         const tempResult : any = {}
         tempResult.isp = data.isp 
         tempResult.ipAddress = data.ip
         tempResult.location = `${data.location.city}/${data.location.country}`
         tempResult.timezone = data.location.timezone
         handleResults(tempResult)
         console.log(data)
         const [lat , lng] = [data.location.lat , data.location.lng]
         setLocation([lat , lng])
         setLoading(false)
         

      }catch(err:any){
         setLoading(false)
         setApiError(true)
         handleResults({
            ipAddress : "" , 
            isp : "" , 
            timezone : "" , 
            location : ""
         })
         console.log(err.message)
      }
   }
   useEffect(() => {
      setTimeout(function () {
         window.dispatchEvent(new Event('resize'));
         getLocation()
     }, 1000);
   } , [ipAddress])
   return ( 
         loading === true ? <p className='center-bigger'>Loading..</p> : apiError ? <p className='center-bigger'>Failed to fetch</p> : <MapContainer center = {location} zoom = {9}>
         <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         />
         <Marker position = {location? location : [50,30]}/>
         {/* <MapChild /> */}
      </MapContainer>
      
   )
} 


// const MapChild: React.FC = () => {
//    const map = useMap()
   
//    return <div id = "map"></div>
// }

export default Map