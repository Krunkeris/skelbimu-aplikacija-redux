import { ProtectedRouteToUserHomeProps } from "../types/types";
import { useGetAccesToUserHomeMutation } from "../api/protectedRouteApi";
import { useEffect } from "react";

export const ProtectedRouteToUserHome = ({
  children,
}: ProtectedRouteToUserHomeProps) => {
  const [getAccesToUserHome, { isLoading, isError, error }] =
    useGetAccesToUserHomeMutation();

  useEffect(() => {
    const handleGetAccesToUserHome = async () => {
      try {
        const response = await getAccesToUserHome({}).unwrap();
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    handleGetAccesToUserHome();
  }, [getAccesToUserHome]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>
        Error accessing home: {(error as any).data.message || "Unknown error"}
      </p>
    );
  }

  return <>{children}</>;
};
