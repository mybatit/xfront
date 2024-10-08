

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Privilige {
  id: number;
  created_at: string; // Date in ISO format
  updated_at: string; // Date in ISO format
  name: string;
  description: string | null;
  account_id: number;
  created_by: number;
  code_objects_id: number;
  code_synchronisation_id: number;
  deleted_at: string | null; // Date in ISO format or null
  deleted: number; // 0 or 1 to represent false/true
  deleted_by: number | null;
  restored_at: string | null; // Date in ISO format or null
  restored: number; // 0 or 1 to represent false/true
  restored_by: number | null;
  account_name: string;
}


const PriviligesPage = () => {
    const [privileges, setPriviliges] = useState<Privilige[]>([]);
  // // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [decodedToken, setDecodedToken] = useState(null);
  const [token, settoken] = useState(""); // Add loading state

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        settoken(token);
        // Deserialize the JWT token
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Set user information based on decoded token
        // console.log("Decoded Token:", decodedToken);
        setDecodedToken(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle token decoding errors (e.g., invalid token)
        localStorage.removeItem("token"); // Clear invalid token
      }
    } else {
      navigate("/login");
    }
    setLoading(false); // Set loading to false after checking token
  }, [navigate]);
  // console.log(token);
  console.log(decodedToken);
  console.log(loading);

  useEffect(() => {
    setLoading(true);
    // setError(null);

    const fetchaccounts = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/privileges`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );

        if (!response.ok) {
          console.log("response " ,response);
          throw new Error("Failed to fetch privileges");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.privileges) {
          setPriviliges(data.privileges); // Update state with fetched data
          // setError(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching privileges:", error);
        // setError("Failed to load privileges. Please try again later.");
        setLoading(false);
      }
    };

    fetchaccounts();
  }, [token]);

  console.log("privileges :", privileges);

  return <div>PriviligesPage</div>;
};

export default PriviligesPage