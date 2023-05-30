import "./result.css"
import { ResultsType } from "../../App"

interface Props{
    results : ResultsType
}
const Result : React.FC<Props> = ({results}) => {
    return <div className="result-container">
       <div className="results">
          <div>
             <span className ="result-topic-header">Ip Address</span>
             <p className="result-topic-result">{results.ipAddress}</p>
          </div>
          <div>
             <span className ="result-topic-header">Location</span>
             <p className="result-topic-result">{results.location}</p>
          </div>
          <div>
             <span className ="result-topic-header">Timezone</span>
             <p className="result-topic-result">{results.timezone}</p>
          </div>
          <div>
             <span className ="result-topic-header">ISP</span>
             <p className="result-topic-result">{results.isp}</p>
          </div>
       </div>
    </div>
}

export default Result