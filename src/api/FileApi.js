import httpClient from "./http-client";

export default  {
    createFile (file) {
      return httpClient.post('/file', file)
    },

    getRootFile() {
        return httpClient.get("/file/root");
    },

    getChildrenFile(parentId) {
        return httpClient.get('/file?folderId=' + parentId);
    },

    deleteFile(id) {
        return httpClient.delete('/file/' + id)
    },

    downloadFileHandle (id) {
        return httpClient.get('/file/' + id, {
            responseType: "blob"
        })
    }
}