import { useEffect, useState } from "react";
import { token } from "../config";


// Custom Hook: useFetchData
// Fetches data from the given URL and manages loading and error states
const useFetchData = url => {

  // State variables for storing fetched data, loading status, and errors
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Making the API request with authorization header
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        //console.log(url, res)
        const result = await res.json();
        //console.log(result);
        if (!res.ok) {
          throw new Error(result.message);
        }

        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
