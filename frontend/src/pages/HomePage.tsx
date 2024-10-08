import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../features/userInfoSlice";
import { LogoutComponent } from "../components/LogoutComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const navigate = useNavigate();

  useEffect(() => {
    const handleDirectToHome = async () => {
      try {
        if (userInfo.role === "admin") {
          navigate("/adminHome");
        } else if (userInfo.role === "user") {
          navigate("/userHome");
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleDirectToHome();
  }, [userInfo]);

  return (
    <div>
      <div>Home</div>
      <LogoutComponent />
    </div>
  );
};
