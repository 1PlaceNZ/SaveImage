cordova.commandProxy.add("SaveImage",{
    saveImageToGallery:function(successCallback,errorCallback,fileName) {
        var uri = new Windows.Foundation.Uri(fileName);
        Windows.Storage.StorageFile.getFileFromApplicationUriAsync(uri).done(
            function (fileToCopy) {
                Windows.Storage.KnownFolders.getFolderForUserAsync(null /* current user */, Windows.Storage.KnownFolderId.picturesLibrary)
                .then(
                    function (picturesLibrary) {

                         return fileToCopy.copyAsync(picturesLibrary, fileToCopy.name, Windows.Storage.NameCollisionOption.generateUniqueName);

                    }
                ).done(function (newFile) {
                        WinJS.log && WinJS.log("The file '" + fileToCopy.name + "' was copied and the new file was named '" + newFile.name + "'.", "sample", "status");
                        successCallback();
                    },
                    function (error) {
                        WinJS.log && WinJS.log(error, "saveImage copyAsync", "error");
                        errorCallback(error);
                    }
                )  

            },
            function (error) {
                WinJS.log && WinJS.log(error, "saveImage StorageFile", "error");
                errorCallback();
            }
        );
    }
});
