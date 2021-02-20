import { AuthAxios } from "../../../../helper/CookieRequest";
import { errorToastify } from "../../../../Common/react_toastify/toastify";
const { REACT_APP_ENDPOINT } = process.env;
export const fetchCommentById = async ({ postId, setState }) => {
  await AuthAxios.get(`${REACT_APP_ENDPOINT}/admin/get_single_post/${postId}`, {
    "Content-Type": "application/json",
    withCredentials: true,
  })
    .then((res) => {
      console.log("res", res.data.posterName);
      setState((data) => ({
        ...data,
        specifiedPost: res.data.data,
        specifiedPostCommentPoster: res.data.posterName,
      }));
    })
    .catch((err) =>
      err.response === undefined
        ? false
        : errorToastify(err.response.data.message)
    );
};