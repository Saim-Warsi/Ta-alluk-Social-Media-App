import { useEffect, useState } from "react";
import { dummyConnectionsData } from "../../assets/assets";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard.jsx";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/user/userSlice.js";
import api from "../api/axios.js";
import Loading from "../components/Loading.jsx";

const Discover = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        setUsers([]);
        setLoading(true);
        const { data } = await api.post(
          "/api/user/discover",
          { input },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );
        data.success ? setUsers(data.users) : toast.error(data.message);
        setLoading(false);
        setInput("");
      } catch (error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchUser(token));
    });
  }, []);
  
return (
  <div className='flex-1 min-h-screen bg-gray-50 overflow-y-auto ml-10 sm:ml-15 lg:ml-60 xl:ml-72'>
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8'>
      {/* Header */}
      <div className='mb-6 lg:mb-8'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
          Discover People
        </h1>
        <p className='text-gray-600 text-sm sm:text-base'>
          Connect with amazing people and grow your network
        </p>
      </div>

      {/* Search Bar */}
      <div className='mb-8'>
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
          <input
            type='text'
            placeholder="Find ta'alluks"
            className='w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className='absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hidden sm:block'>
            Press Enter
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className='flex flex-col items-center justify-center py-16'>
          <Loading />
        </div>
      )}

      {/* Users Grid */}
      {!loading && users.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      )}

      {/* Empty State - No Search Yet */}
      {!loading && users.length === 0 && input === '' && (
        <div className='flex flex-col items-center justify-center py-16 sm:py-20'>
          <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
            <Search className='w-10 h-10 sm:w-12 sm:h-12 text-gray-400' />
          </div>
          <h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-2'>
            Start Discovering
          </h3>
          <p className='text-gray-500 text-center max-w-md px-4'>
            Search for people by name, username, or interests to expand your network
          </p>
        </div>
      )}

      {/* Empty State - No Results */}
      {!loading && users.length === 0 && input !== '' && (
        <div className='flex flex-col items-center justify-center py-16 sm:py-20'>
          <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
            <Search className='w-10 h-10 sm:w-12 sm:h-12 text-gray-400' />
          </div>
          <h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-2'>
            No results found
          </h3>
          <p className='text-gray-500 text-center max-w-md px-4'>
            Try searching with different keywords or check your spelling
          </p>
        </div>
      )}
    </div>
  </div>
)
};

export default Discover;
