import { React, useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import {
  useAuthState,
  logout,
  useAuthDispatch,
} from "../../context/AuthContext/index";
import DocProfileForm from "../../components/Auth/docProfileForm";

const DocProfile = () => {
  const [user, setUser] = useState(null);
  const userDetails = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(async () => {
    const res = await getUser(userDetails.user.id);
    setUser(res.data);
  }, []);

  return <>{user != null && <DocProfileForm user={user} />}</>;
};

export default DocProfile;
