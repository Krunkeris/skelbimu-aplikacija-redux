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
