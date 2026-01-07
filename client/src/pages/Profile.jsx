import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dummyPostsData, dummyUserData } from "../../assets/assets";
import Loading from "../components/Loading";
import { CirclePlus } from "lucide-react";
import UserProfileInfo from "../components/UserProfileInfo";
import PostCard from "../components/PostCard";
import moment from "moment";
import ProfileModal from "../components/ProfileModal";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.value);
  const { getToken } = useAuth();
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async (profileId) => {
    const token = await getToken();
    try {
      const { data } = await api.post(
        `/api/user/profiles`,
        { profileId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setUser(data.profile);
        setPosts(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchUser(profileId);
    } else {
      fetchUser(currentUser._id);
    }
  }, [profileId, currentUser]);

  return user ? (
    <div className="relative h-full overflow-y-scroll bg-gray-50 p-6 ml-8 sm:ml-15 lg:ml-60 xl:ml-72">
      <div className="max-w-3xl mx-auto">
        {/* profile card */}
        <div className="bg-white rounded-2xl shadow overflow-hidden ">
          {/* cover photo */}
          <div className="h-40 md:h-56 bg-yellow-500 ">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt="cover photo"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {/* UserInfo */}
          <UserProfileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>
            {/* Create Post Button */}
<button 
  onClick={() => navigate('/create-post')}
  className="mt-6 w-full max-w-md mx-auto flex items-center justify-center gap-2 px-6 py-3 border text-amber-500 hover:text-white hover:bg-amber-400 hover:font-semibold border-amber-400 rounded-full font-medium transition active:scale-95"
>
  <CirclePlus className="w-5 h-5" />
  Create Post
</button>
        {/* Tabs */}
        <div className="mt-6">
          <div className="bg-white rounded-full shadow p-1 flex max-w-md mx-auto ">
            {["posts", "media", "likes"].map((tab) => (
              <button
                onClick={() => setActiveTab(tab)}
                key={tab}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "bg-yellow-500 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>


          {/* Posts */}
          {activeTab === "posts" && (
            <div className="mt-6 flex flex-col items-center gap-6 ">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {/* media */}
          {activeTab === "media" && (
            <div className="flex flex-wrap mt-6 max-w-6xl ">
              {posts
                .filter((post) => post.image_urls.length > 0)
                .map((post) => (
                  <>
                    {post.image_urls.map((img, index) => (
                      <Link
                        target="_blank"
                        to={img}
                        key={index}
                        className="relative group"
                      >
                        <img
                          src={img}
                          key={index}
                          className="w-64 aspect-video object-cover"
                          alt=""
                        />
                        <p className="absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-lg bg-yellow-500/40 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                          {moment(post.createdAt).fromNow()}
                        </p>
                      </Link>
                    ))}
                  </>
                ))}
            </div>
          )}
        </div>
      </div>
      {/* Edit Profile Modal */}

      {showEdit && <ProfileModal setShowEdit={setShowEdit} />}
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
