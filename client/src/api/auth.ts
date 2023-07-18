import axios from "axios";
import { LoginFormDTO, LoginResponseDTO, RegisterFormDTO, RegisterResponseDTO } from "../types/auth";


export const login = async (
  values: LoginFormDTO
): Promise<LoginResponseDTO> => {
  return (await axios.post("/auth/login", values)).data;
};

export const register = async (
  values: RegisterFormDTO
): Promise<RegisterResponseDTO> => {
  return (await axios.post("/auth/register", values)).data;
};
