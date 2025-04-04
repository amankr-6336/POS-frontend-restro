import { useState } from "react";

export const useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (params) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await apiFunction(params);
      setData(response);
      return { success: true, data: response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { execute, data, error, loading };
};





