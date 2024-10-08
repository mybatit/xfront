import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export interface VehiculesAvecReservations {
  id: number;
  name: string;
  description: string | null;
  parent: number;
  creator: number;
  pilot: number;
  code_objects_id: number;
  code_synchronisation_id: number;
  deleted_at: string | null;
  deleted: number;
  deleted_by: number;
  created_by: number | null;
  restored: number;
  restored_by: number;
  created_at: string;
  updated_at: string;
  pilot_name: string | null;
}

const VehiculesAvecReservations = () => {
    const [accounts, setAccounts] = useState<VehiculesAvecReservations[]>([]);
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
          `http://xapi.vengoreserve.com/api/view/accounts`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );

        if (!response.ok) {
          console.log("response " ,response);
          throw new Error("Failed to fetch accounts");
        }

        const data = await response.json();
        console.log("data :", data);
        if (data.accounts) {
          setAccounts(data.accounts); // Update state with fetched data
          // setError(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        // setError("Failed to load accounts. Please try again later.");
        setLoading(false);
      }
    };

    fetchaccounts();
  }, [token]);

  console.log("accounts :", accounts);

  return <div>VehiculesAvecReservationsPage</div>;
};

export default VehiculesAvecReservations