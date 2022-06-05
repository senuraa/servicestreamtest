import {useEffect, useState} from "react";

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<any | undefined>(undefined)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchApi = () => {
      setLoading(true)
      fetch(url)
          .then(response => response.json())
          .then(data => setResponse(data))
          .catch(error => setError(error))
          .finally(() => setLoading(false))
    }
    fetchApi()
  }, [url]);


  return { loading, response, error }

}
