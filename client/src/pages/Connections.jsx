// import {
//   MessageSquare,
//   Users,
//   UserPlus,
//   UserCheck,
//   UserRoundPen,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// // import {
// //   dummyConnectionsData as connections,
// //   dummyFollowersData as followers,
// //   dummyFollowingData as following,
// //   dummyPendingConnectionsData as pendingConnections,
// // } from "../../assets/assets";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { fetchConnections } from "../features/connections/connectionSlice";
// import { toast } from 'react-hot-toast'
// import api from '../api/axios.js'

// const Connections = () => {
//   const navigate = useNavigate();
//   const { getToken } = useAuth();
//   const dispatch = useDispatch();
//   const [currentTab, setCurrentTab] = useState('Followers')
//   const {connections, pendingConnections, followers, following} = useSelector((state)=>state.connections)
//   const dataArray = [
//     { label: "Followers", value: followers, icon: Users },
//     { label: "Following", value: following, icon: UserCheck },
//     { label: "Pending", value: pendingConnections, icon: UserRoundPen },
//     { label: "Connections", value: connections, icon: UserPlus },
//   ];

//   const handleUnfollow = async (userId) => {
//     try {
//       const { data } = await api.post('/api/user/unfollow', {id: userId}, { 
//         headers: {Authorization: `Bearer ${await getToken()}`}
//       })
//       if(data.success){
//         toast.success(data.message)
//         dispatch(fetchConnections(await getToken()))
//       } else{
//         toast(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const acceptConnection = async (userId) => {
//     try {
//       const { data } = await api.post('/api/user/accept', {id: userId}, { 
//         headers: {Authorization: `Bearer ${await getToken()}`}
//       })
//       if(data.success){
//         toast.success(data.message)
//         dispatch(fetchConnections(await getToken()))
//       } else{
//         toast(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(()=>{
//     getToken().then((token)=>{
//       dispatch(fetchConnections(token))
//     })
//   })
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-6xl mx-auto p-6">
//         {/* titles */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">Ta'alluks</h1>
//           <p className="text-slate-600">
//             Manage your connection and discover new Ta'alluks
//           </p>
//         </div>
//         {/* Counts */}
//         <div className="mb-8 flex flex-wrap gap-6">
//           {dataArray.map((item, index) => (
//             <div
//               className="flex flex-col items-center justify-center gap-1 border h-20 w-40 border-gray-200 bg-white shadow rounded-md"
//               key={index}
//             >
//               <b>{item.value.length}</b>
//               <p className="text-slate-600">{item.label}</p>
//             </div>
//           ))}
//         </div>
//           {/* tabs */}
//           <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm">
//               {dataArray.map((tab)=>(
//                 <button onClick={()=>setCurrentTab(tab.label)} key={tab.label} className={`cursor-pointer flex items-center px-3 py-1 text-sm rounded-md transition-colors
//                 ${currentTab === tab.label ? 'bg-white font-medium text-black' : 'text-gray-500 hover:text-black'}
//                 `}>
//                   <tab.icon className="w-4 h-4" />
//                   <span className="ml-1">{tab.label}</span>
//                   {tab.count !== undefined && (
//                     <span
//                     className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
//                     >{tab.count}</span>
//                   )}
//                 </button>
//               ))}
//           </div>
//           {/* Connections */}
//           <div className="flex flex-wrap gap-6 mt-6">
//               {dataArray.find((item)=>item.label === currentTab).value.map((user)=>(
//                   <div className="w-full max-w-88 flex gap-5 p-6 bg-white shadow rounded-md" key={user._id}>
//                     <img src={user.profile_picture} className="rounded-full w-12 h-12 shadow-md mx-auto" alt="" />
//                     <div className="flex-1">
//                       <p className="font-medium text-slate-700">{user.full_name}</p>
//                       <p className="text-slate-500">@{user.username}</p>
//                       <p className="text-sm text-gray-600">@{user.bio.slice(0,30)}...</p>
//                       <div className="flex max-sm:flex-col gap-2 mt-4">
//                         {
//                           <button onClick={()=> navigate(`/profile/${user._id}`)}
//                            className="w-full p-2 text-sm rounded-full bg-yellow-500 hover:bg-amber-500 active:scale-95 transition text-white cursor-pointer">
//                             View Profile
//                           </button>
//                         }
//                         {
//                           currentTab === 'Following' && (
//                             <button onClick={()=> handleUnfollow(user._id)} className="w-full p-2 text-sm rounded-full bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition-all cursor-pointer">
//                                 Unfollow
//                             </button>
//                           )
//                         }
//                         {
//                           currentTab === 'Pending' && (
//                             <button onClick={()=> acceptConnection(user._id)} className="w-full p-2 text-sm rounded-full bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition-all cursor-pointer">
//                                 Accept
//                             </button>
//                           )
//                         }
//                         {
//                           currentTab === 'Connections' && (
//                             <button onClick={()=> navigate(`/messages/${user._id}`)} className="w-full p-2 text-sm rounded-full bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1">
//                               <MessageSquare className="w-4 h-4" />
//                                 Message
//                             </button>
//                           )
//                         }
//                       </div>
//                     </div>
//                   </div>
//               ))}
//           </div>
//       </div>
//     </div>
//   );
// };

// export default Connections;


import {
  MessageSquare,
  Users,
  UserPlus,
  UserCheck,
  Edit,
  Search,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { fetchConnections } from "../features/connections/connectionSlice";
import { toast } from 'react-hot-toast';
import api from '../api/axios.js';

const Connections = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('Followers');
  const [searchQuery, setSearchQuery] = useState('');
  const { connections, pendingConnections, followers, following } = useSelector((state) => state.connections);
  
  const dataArray = [
    { label: "Followers", value: followers, icon: Users, color: "blue" },
    { label: "Following", value: following, icon: UserCheck, color: "green" },
    { label: "Pending", value: pendingConnections, icon: Edit, color: "amber" },
    { label: "Connections", value: connections, icon: UserPlus, color: "purple" },
  ];

  const handleUnfollow = async (userId) => {
    try {
      const { data } = await api.post('/api/user/unfollow', { id: userId }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        toast.success(data.message);
        dispatch(fetchConnections(await getToken()));
      } else {
        toast(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const acceptConnection = async (userId) => {
    try {
      const { data } = await api.post('/api/user/accept', { id: userId }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        toast.success(data.message);
        dispatch(fetchConnections(await getToken()));
      } else {
        toast(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchConnections(token));
    });
  }, []);

  const currentData = dataArray.find((item) => item.label === currentTab)?.value || [];
  
  const filteredData = currentData.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.full_name.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower) ||
      user.bio.toLowerCase().includes(searchLower)
    );
  });

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-8 lg:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Ta'allukat
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Manage your connections and discover new Ta'alluks
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {dataArray.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                onClick={() => setCurrentTab(item.label)}
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105
                  rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-xl
                 ${currentTab === item.label ? 'bg-gray-200' : 'text-slate-900'}
                `}
                key={index}
              >
                <div className="flex flex-col items-start gap-2">
                  <div className={`p-2 rounded-lg `}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6`} />
                  </div>
                  <div>
                    <p className={`text-2xl sm:text-3xl font-bold ${currentTab === item.label ? 'text-slate-600' : 'text-slate-900'}`}>
                      {item.value.length}
                    </p>
                    <p className={`text-xs sm:text-sm font-medium ${currentTab === item.label ? 'text-slate-600' : 'text-slate-600'}`}>
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, username, or bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            {currentTab} {filteredData.length > 0 && `(${filteredData.length})`}
          </h2>
        </div>

        {/* Users Grid */}
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <div className="bg-slate-100 rounded-full p-6 sm:p-8 mb-4">
              {(() => {
                const Icon = dataArray.find((item) => item.label === currentTab)?.icon || Users;
                return <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400" />;
              })()}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
              {searchQuery ? 'No results found' : `No ${currentTab.toLowerCase()} yet`}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base text-center max-w-md px-4">
              {searchQuery 
                ? 'Try adjusting your search terms'
                : `When you have ${currentTab.toLowerCase()}, they'll appear here`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredData.map((user) => (
              <div
                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-amber-200"
                key={user._id}
              >
                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  {/* User Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={user.profile_picture}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-amber-200 transition-all"
                        alt={user.full_name}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 text-base sm:text-lg truncate group-hover:text-amber-600 transition-colors">
                        {user.full_name}
                      </h3>
                      <p className="text-slate-500 text-sm truncate">@{user.username}</p>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1 line-clamp-2">
                        {user.bio.slice(0, 60)}{user.bio.length > 60 ? '...' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => navigate(`/profile/${user._id}`)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white active:scale-95 transition-all shadow-sm hover:shadow-md"
                    >
                      View Profile
                    </button>
                    
                    {currentTab === 'Following' && (
                      <button
                        onClick={() => handleUnfollow(user._id)}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
                      >
                        Unfollow
                      </button>
                    )}
                    
                    {currentTab === 'Pending' && (
                      <button
                        onClick={() => acceptConnection(user._id)}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-green-500 hover:bg-green-600 text-white active:scale-95 transition-all shadow-sm"
                      >
                        Accept
                      </button>
                    )}
                    
                    {currentTab === 'Connections' && (
                      <button
                        onClick={() => navigate(`/messages/${user._id}`)}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;