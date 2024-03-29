import React, { useEffect, useState } from "react";

import PreviewUser from "../AdminComponents/PreviewUsers";
import { AuthAxios } from "../../helper/CookieRequest";
import { errorToastify } from "../../Common/react_toastify/toastify";

const ClientPreviewpage = ({ match }) => {
  const { REACT_APP_ENDPOINT } = process.env;

  const [UserData, setUserData] = useState([]);
  const { userId } = match.params;

  useEffect(() => {
    const fetchSingleUser = async () => {
      await AuthAxios.get(
        `${REACT_APP_ENDPOINT}/admin/get_one_client/${userId}`,
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((err) =>
          err.toString().toLowerCase().includes("network")
            ? errorToastify("network error. please try later")
            : err.response === undefined
            ? false
            : errorToastify(err.response.data.message)
        );
    };
    fetchSingleUser();
    return [fetchSingleUser];
  }, [REACT_APP_ENDPOINT, match, userId]);
  return (
    <div>
      <PreviewUser userData={UserData} />
    </div>
  );
};

export default ClientPreviewpage;
