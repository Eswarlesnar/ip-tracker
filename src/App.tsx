
import { useState } from 'react'
import './App.css'
import Map from './components/Map/Map'
import Search from './components/Search/Search'
import Result from './components/Results/Result'


export interface ResultsType {
   "ipAddress" : string , 
   "location" : string , 
   "timezone" : string  , 
   "isp" : string
}

function App() {
  const [ipAddress , setIpAddress] = useState<string | null>(null)
  // const handleIpChange = (event :React.ChangeEvent<HTMLInputElement>)=>{
  //    setIpAddress(event.currentTarget.value)
  // } 
  const [results , setResults ] =useState<ResultsType>({
    ipAddress : "", 
    location : "" , 
    timezone : "" , 
    isp : ""
  })
  const handleIpChange = (payload : string) => {
     setIpAddress(payload)
  }

  const handleResults = (payload : ResultsType) => {
    setResults(payload)
  }
  return (
    <div className='main-container'>
      <Search handleIpChange = {handleIpChange}/>
      <Map ipAddress = {ipAddress} handleResults = {setResults}/>
      <Result results = {results}/>
    </div>
  )
}

export default App
