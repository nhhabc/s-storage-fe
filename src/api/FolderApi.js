import httpClient from "./http-client";

export default  {
    getRootFolder() {
        return httpClient.get("/folder/root");
    }
}