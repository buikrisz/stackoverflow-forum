import { BASE_URL_USERS, DEFAULT_PARAMS_USERS } from "@/app/constants/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    fetch(`${BASE_URL_USERS}/${userId}?${DEFAULT_PARAMS_USERS}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(">>>", data);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  return (
    <div>
      <h1>User Profile Page</h1>
      <p>User ID: {userId}</p>
      {/* Display user-specific content here */}
    </div>
  );
};

export default UserProfile;
