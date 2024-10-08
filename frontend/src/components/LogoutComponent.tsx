import { useLogoutMutation } from "../api/authApi";

export const LogoutComponent = () => {
  const [logout, { isLoading, isError, error }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
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
