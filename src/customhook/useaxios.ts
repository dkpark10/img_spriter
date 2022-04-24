import { useState, useEffect, useRef } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isEqual } from 'lodash';

axios.defaults.baseURL = 'http://localhost:8080';

const useAxios = ({ url, method, data }: AxiosRequestConfig) => {

  const [response, setResponse] = useState<AxiosResponse>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const prevData = useRef();

  useEffect(() => {

    if (data && isEqual(data, prevData.current) === true) {
      return; 
    }
    prevData.current = data;

    const fetchData = async () => {
      try {
        const result = await axios.request({
          url,
          method,
          data
        });
        setResponse(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, data]);

  return [response, loading];
}

export default useAxios;