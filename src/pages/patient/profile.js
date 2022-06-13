import { React, useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import {
  useAuthState,
  logout,
  useAuthDispatch,
} from "../../context/AuthContext/index";
import ProfileForm from "../../components/Auth/profileForm";

const Profile = () => {
  const [user, setUser] = useState(null);
  const userDetails = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(async () => {
    const res = await getUser(userDetails.user.id);
    setUser(res.data);
  }, []);

  return (
    <>
      {user != null && <ProfileForm user={user} />}
      {user == null ? <>Internal Server Error</> : <></>}
    </>
  );
};

export default Profile;
