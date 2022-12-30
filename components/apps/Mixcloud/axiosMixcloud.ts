import axios from "axios";

const axiosMixcloud = axios.create({
  baseURL: "https://widget.mixcloud.com",
  headers: {
    "Cache-Control": "no-cache",
    Expires: "0",
    Pragma: "no-cache",
  },
});

export default axiosMixcloud;
