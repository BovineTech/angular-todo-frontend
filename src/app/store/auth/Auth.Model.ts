import { User } from "../../model/User";

export interface AuthModel {
  user: User,
  errormessage: string,
  loading: boolean,
}