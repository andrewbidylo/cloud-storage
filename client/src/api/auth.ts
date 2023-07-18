import axios from "axios";
import { LoginFormDTO, LoginResponseDTO } from "../types/auth";


export const login = async (
  values: LoginFormDTO
): Promise<LoginResponseDTO> => {
  return (await axios.post("/auth/login", values)).data;
};

