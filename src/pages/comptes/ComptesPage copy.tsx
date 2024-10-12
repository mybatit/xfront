import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export interface Account {
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

const ComptesPage = () => {
  const [comptes, setComptes] = useState<Account[]>([]);
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

    const fetchaccounts = async () => {
      try {
        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/accounts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.log("response: ", response);
          throw new Error("Failed to fetch comptes");
        }

        
        const data = await response.json();
        console.log("data: ", data);
        console.log("data.myaccounts: ", data.myaccounts);
        // console.log("data.$myaccounts: ", data.$myaccounts);

        if (data.myaccounts) {
          setComptes(data.myaccounts); // Update state with fetched data
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching comptes:", error);
        setLoading(false);
      }
    };

    fetchaccounts();
  }, [token]);


  console.log("Comptes :", comptes);

  return <div>ComptesPage</div>;
};

export default ComptesPage;

