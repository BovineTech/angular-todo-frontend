import { AuthModel } from "./Auth.Model";

export const authState: AuthModel = {
  errormessage: "",
  user: {
    _id: "",
    username: "",
    email: "",
    password: "",
  },
  loading: false,
};
