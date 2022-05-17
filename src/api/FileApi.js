import httpClient from "./http-client";

export default  {
    getRootFile() {
        return httpClient.get("/file/root");
    }
}