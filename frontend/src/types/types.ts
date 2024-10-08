export type RegisterInputDataType = {
  username: string;
  email: string;
  password: string;
};

export type LoginInputDataType = {
  email: string;
  password: string;
};

export type UserInfoType = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user" | "";
};

export type ProtectedRouteToHomeProps = {
  children: React.ReactNode;
};

export type ProtectedRouteToUserHomeProps = {
  children: React.ReactNode;
};

export type ProtectedRouteToAdminHomeProps = {
  children: React.ReactNode;
};
