import httpClient from "./http-client";

export default  {
    createFolder (folder, folderId) {
        return httpClient.post('/folder', {
            name: folder.name,
            _parentId: folderId ? folderId : null,
        })
    },

    getRootFolder() {
        return httpClient.get("/folder/root");
    },

    getChildrenFolder(folderId){
        return httpClient.get("/folder/" + folderId)
    },

    deleteFolder (id) {
        return httpClient.delete('/folder/' + id)
    }
}