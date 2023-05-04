import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [flights, setFlights] = useState([]);
  console.log(`flights`, flights);
  useEffect(() => {
    // Fetch data from openSkyApi
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opensky-network.org/api/flights/all?begin=1517227200&end=1517230800"
        );
        setFlights(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   getProfile();
  // }, [session]);

  // async function getProfile() {
  //   try {
  //     setLoading(true);

  //     let { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`username, website, avatar_url`)
  //       .eq("id", user.id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       setUsername(data.username);
  //       setWebsite(data.website);
  //       setAvatarUrl(data.avatar_url);
  //     }
  //   } catch (error) {
  //     alert("Error loading user data!");
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function updateProfile({ username, website, avatar_url }) {
  //   try {
  //     setLoading(true);

  //     const updates = {
  //       id: user.id,
  //       username,
  //       website,
  //       avatar_url,
  //       updated_at: new Date().toISOString(),
  //     };

  //     let { error } = await supabase.from("profiles").upsert(updates);
  //     if (error) throw error;
  //     alert("Profile updated!");
  //   } catch (error) {
  //     alert("Error updating the data!");
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <div>
      <h2>Flights</h2>
      <table>
        <thead>
          <tr>
            <th>Airport</th>
            <th>Time</th>
            <th>Arriving</th>
            <th>Departing</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.estDepartureAirport}</td>
              <td>{new Date(flight.lastSeen).toLocaleString()}</td>
              <td>{flight.arrivalAirportCandidatesCount}</td>
              <td>{flight.departureAirportCandidatesCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // <div className="form-widget">
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input id="email" type="text" value={session.user.email} disabled />
    //   </div>
    //   <div>
    //     <label htmlFor="username">Username</label>
    //     <input
    //       id="username"
    //       type="text"
    //       value={username || ''}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="website">Website</label>
    //     <input
    //       id="website"
    //       type="url"
    //       value={website || ''}
    //       onChange={(e) => setWebsite(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <button
    //       className="button primary block"
    //       onClick={() => updateProfile({ username, website, avatar_url })}
    //       disabled={loading}
    //     >
    //       {loading ? 'Loading ...' : 'Update'}
    //     </button>
    //   </div>

    //   <div>
    //     <button className="button block" onClick={() => supabase.auth.signOut()}>
    //       Sign Out
    //     </button>
    //   </div>
    // </div>
  );
}
