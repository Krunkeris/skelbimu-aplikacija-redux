import { useLogoutMutation } from "../api/authApi";
import { AppDispatch, RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "../features/userInfoSlice";
import { useNavigate } from "react-router-dom";

export const LogoutComponent = () => {
  //redux
  const dispatch = useDispatch<AppDispatch>();

  const [logout, { isLoading, isError, error }] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout({}).unwrap();
      navigate("/login");
      localStorage.clear();
      dispatch(clearUserInfo());
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      {isError && (
        <div className="text-danger mt-2">
          Logout failed: {(error as any).data.message}
        </div>
      )}
    </div>
  );
};
