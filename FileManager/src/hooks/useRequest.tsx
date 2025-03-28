import axios from 'axios';

function useRequest() {
  const request = async (path: string, parameters: any) => {
    console.log(parameters);
    try {
      const response = await axios.post(`http://localhost:3000${path}`, parameters);
      return response;
    } catch (err: any) {
      return err;
    }
  };

  return {request};
}

export default useRequest;
