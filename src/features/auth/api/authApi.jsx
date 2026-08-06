// import { api } from "../../../config/api";

// export const loginUserApi = async (credentials) => {
//   try {
//     let res = await api.post("/auth/login", credentials);
//     localStorage.setItem("accessToken", res.data.accessToken);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const hydrateUserApi = async () => {
//   let token = localStorage.getItem("accessToken");

//   try {
//     let res = await api.get("/auth/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     console.log(res);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
