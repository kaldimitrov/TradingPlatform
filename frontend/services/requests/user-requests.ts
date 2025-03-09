import { LoginRequest } from "@/models/login-request.model";
import httpService from "../http.service";
import { RegisterRequest } from "@/models/register-request.model";
import { toast } from "react-toastify";

export function login(data: LoginRequest) {
  return httpService.post("/auth/login", data).then((response) => {
    localStorage.setItem("token", response.data.token);
    toast.success("Login successful");
    return response;
  });
}

export function register(data: RegisterRequest) {
  return httpService.post("/auth/register", data).then((response) => {
    localStorage.setItem("token", response.data.token);
    toast.success("Registration successful");
    return response;
  });
}
