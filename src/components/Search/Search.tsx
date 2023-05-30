import "./search.css"
import { Dispatch, SetStateAction, useState } from "react"
import buttonIcon from "../../assets/icon-arrow.svg"

interface Props {
    handleIpChange : (payload : string) => void
}



const Search:React.FC<Props> = ({handleIpChange}) => {
    const [userInput , setUserInput] = useState<string>("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!userInput){
            return
        }
        console.log(userInput)
        handleIpChange(userInput)
        setUserInput("")
        //setip here from parent compoent 
        //set userinput to empty string
    }
    return <div className="search-container">
        <h2 className="heading">Ip Address Tracker</h2>
        <form className="form" onSubmit = {handleSubmit}>
            <input 
              value={userInput} 
              onChange = {e => setUserInput(e.currentTarget.value)} 
              placeholder="Search for any Ip address"/>
            <button type = "submit">
                <img src = {buttonIcon}  alt = "search"/>
            </button>
        </form>
    </div>
}

export default Search