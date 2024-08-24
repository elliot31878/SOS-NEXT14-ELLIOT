export interface Doctor {
  createdAt: string;
  title: string;
  avatar: string;
  subtitle: string;
  id: string;
}

export interface DoctorsState {
  loading: boolean;
  doctors: Doctor[];
  error: string | null;
}

export interface FetchDoctorsResponse {
  data: Doctor[];
}
