import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = null;
  const [appState, setAppState] = useState({ loading: false, data: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    setAppState({ loading: true });
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch data for resource");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAppState(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setAppState(false);
        setError(err.message);
      });
  }, [url]);

  return { appState, data, error };
};

export default useFetch;
