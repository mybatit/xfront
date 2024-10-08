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
        const requestBody = JSON.stringify({
          // Add the body content here
        });

        const response = await fetch(
          `http://xapi.vengoreserve.com/api/view/accounts`,
          {
            method: "GET", // Use POST if the server expects body data
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: requestBody, // Body for the request
          }
        );

        if (!response.ok) {
          console.log("response: ", response);
          throw new Error("Failed to fetch comptes");
        }

        const data = await response.json();
        console.log("data: ", data);
        if (data.accounts) {
          console.log("data.accounts: ", data.accounts);
          setComptes(data.accounts); // Update state with fetched data
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



// useEffect(() => {
//   setLoading(true);

//   const fetchaccounts = async () => {
//     try {
//       // Prepare query parameters if needed
//       const params = new URLSearchParams({
//         // Example parameters; replace with your actual parameters
//         param1: "value1",
//         param2: "value2",
//       }).toString();

//       const response = await fetch(
//         `http://xapi.vengoreserve.com/api/view/accounts?${params}`, // Append parameters to the URL
//         {
//           method: "GET", // Keep as GET
//           headers: {
//             "Content-Type": "application/json", // Usually not needed for GET requests
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         console.log("response: ", response);
//         throw new Error("Failed to fetch comptes");
//       }

//       const data = await response.json();
//       console.log("data: ", data);
//       if (data.accounts) {
//         console.log("data.accounts: ", data.accounts);
//         setComptes(data.accounts); // Update state with fetched data
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching comptes:", error);
//       setLoading(false);
//     }
//   };

//   fetchaccounts();
// }, [token]);




  // useEffect(() => {
  //   setLoading(true);
  
  //   const fetchaccounts = async () => {
  //     try {
  //       // Prepare query parameters
  //       const params = new URLSearchParams({
  //         // Replace with your actual parameters and values

  //       }).toString();
  
  //       const response = await fetch(
  //         `http://xapi.vengoreserve.com/api/view/accounts?${params}`, // Append query parameters to the URL
  //         {
  //           headers: {
  //             "Content-Type": "application/json", // Usually not required for GET requests
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  
  //       if (!response.ok) {
  //         console.log("response: ", response);
  //         throw new Error("Failed to fetch comptes");
  //       }
  
  //       const data = await response.json();
  //       console.log("data: ", data);
  //       if (data.accounts) {
  //         console.log("data.accounts: ", data.accounts);
  //         setComptes(data.accounts); // Update state with fetched data
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching comptes:", error);
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchaccounts();
  // }, [token]);