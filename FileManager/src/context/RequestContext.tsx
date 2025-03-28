import { createContext, useContext, ReactNode} from "react"
import axios from 'axios'

const RequestContext = createContext(null);
export const useRequest = () => useContext(RequestContext);

interface RequestProviderProps {
    children: ReactNode;
}

function RequestProvider({children} : RequestProviderProps){
    const request = (path: string, parameters: any) => {
        axios.post(path, parameters)
          .then(function (response) {
            return response
          })
          .catch(function (error) {
            console.log(error);
        });
    } 
    
    return(
        <RequestContext.Provider value={null}>
            {children}
        </RequestContext.Provider>
    )
}
export default RequestProvider;