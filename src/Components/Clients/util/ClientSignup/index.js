import { AuthAxios } from "../../../../helper/CookieRequest";
import {
  successToastify,
  errorToastify,
} from "../../../../Common/react_toastify/toastify";

export const handleSubmit = async ({
  e,
  firstName,
  lastName,
  email,
  password,
  url,
  history,
}) => {
  e.preventDefault();
  let data = { firstName, lastName, email, password };

  await AuthAxios.post(`${url}`, data, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      successToastify(res.data.message);
      history.push("/login");
    })
    .catch((err) =>
      err.toString().toLowerCase().includes("network")
        ? errorToastify("network break down. please try later.")
        : err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};
