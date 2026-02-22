import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./auth";
import axios from "axios";

// Mock axios
jest.mock("axios", () => ({
  defaults: {
    headers: {
      common: {},
    },
  },
}));

// A test component to consume the context
const TestComponent = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <div data-testid="auth-user">{auth.user ? auth.user.name : "null"}</div>
      <div data-testid="auth-token">{auth.token || "empty"}</div>
      <button
        data-testid="login-btn"
        onClick={() => setAuth({ user: { name: "Test User" }, token: "test-token" })}
      >
        Login
      </button>
    </div>
  );
};

describe("Auth Context", () => {
  beforeEach(() => {
    // Clear localStorage and axios headers before each test
    localStorage.clear();
    axios.defaults.headers.common["Authorization"] = undefined;
    jest.clearAllMocks();
  });

  it("provides default auth state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-user")).toHaveTextContent("null");
    expect(screen.getByTestId("auth-token")).toHaveTextContent("empty");
  });

  it("loads auth data from localStorage on mount", () => {
    const mockAuthData = {
      user: { name: "Saved User" },
      token: "saved-token",
    };
    localStorage.setItem("auth", JSON.stringify(mockAuthData));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-user")).toHaveTextContent("Saved User");
    expect(screen.getByTestId("auth-token")).toHaveTextContent("saved-token");
  });

  it("updates auth state and axios headers", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-user")).toHaveTextContent("null");

    act(() => {
      screen.getByTestId("login-btn").click();
    });

    expect(screen.getByTestId("auth-user")).toHaveTextContent("Test User");
    expect(screen.getByTestId("auth-token")).toHaveTextContent("test-token");
    
    // Check if axios default header is updated
    expect(axios.defaults.headers.common["Authorization"]).toBe("test-token");
  });
});
