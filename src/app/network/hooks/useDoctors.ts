import { useQuery } from "@tanstack/react-query";
import apiClient from "../axios";

export const DOCTOR_KEY = "DOCTOR_KEY";

const fetchDoctors = async () => {
  const { data } = await apiClient.get("dockters");
  return data;
};

export const useDoctors = () => {
  return useQuery({ queryKey: [DOCTOR_KEY], queryFn: fetchDoctors });
};
