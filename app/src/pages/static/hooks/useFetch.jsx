import {useState, useEffect } from 'react';


function useFetch (url,options,dependencies=[]) {
  const baseUrl = url
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const get = async (url) => {
    try {
      setLoading(true);
      const res = await fetch(baseUrl + url,options);
      const json = await res.json();
      setResponse(json);
      return json
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  const post = async (url,data) => {
    try {
      setLoading(true);
      ("================================================ url",url)
      const res = await fetch(baseUrl + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await res.json();
      setResponse(json);
      return json
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }


  return { get, post, response, loading, error };
}





  export default useFetch;