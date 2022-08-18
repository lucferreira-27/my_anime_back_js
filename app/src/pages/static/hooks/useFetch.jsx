import {useState, useEffect } from 'react';
const useFetch = (url,options) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setLoading(true);
      fetch(url,options)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, [url]);
  
    return {
      data,
      loading,
      error,
    };
  }
  export default useFetch;