import React, { useState } from "react";
import { RegisterInputDataType } from "../types/types";
import { useRegisterMutation } from "../api/authApi";

export const RegisterForm = () => {
  const [registerInputData, setRegisterInputData] =
    useState<RegisterInputDataType>({
      username: "",
      email: "",
      password: "",
    });

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInputData({
      ...registerInputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await register(registerInputData).unwrap();
      localStorage.setItem("user", JSON.stringify(response));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="form shadow p-4 rounded"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-center mb-4">Register</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label" hidden>
          Username
        </label>
        <input
          type="text"
          name="username"
          className="form-control"
          id="username"
          placeholder="Enter your username"
          required
          value={registerInputData.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label" hidden>
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          required
          value={registerInputData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label" hidden>
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          required
          value={registerInputData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {isLoading ? "Registering..." : "Submit"}
      </button>
      {isError && (
        <p className="text-danger mt-2">
          {(error as any).data.message || "Registration failed"}
        </p>
      )}
    </form>
  );
};
