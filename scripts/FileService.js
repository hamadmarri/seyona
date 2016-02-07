angular.module('phonertcdemo')
.factory('FileService', function () {

  var filename = "profile.txt";
  // var data = "";
  
  var service = {
    filename: filename,
    data: "",
    error: "",
    status: ""
  };


  service.write = function(s) {
    // Wait for device API libraries to load
    
         document.addEventListener("deviceready", onDeviceReady, false);

        // device APIs are available
        //
        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }

        function gotFS(fileSystem) {
            fileSystem.root.getFile(service.filename, {create: true, exclusive: false}, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            // fileEntry.remove(function() {});
            fileEntry.createWriter(gotFileWriter, fail);
        }

        function gotFileWriter(writer) {
            // writer.onwriteend = function(evt) {
            // };
            writer.truncate(0);
            writer.onwriteend = function(evt) {
              writer.write(s);
              writer.onwriteend = function(evt) {
                
              };
            };
            
        }

        function fail(error) {
            service.error = error.code;
        }
  };


  service.read = function() {
    // Wait for device API libraries to load
        //

        service.data = "";
        service.error = "";
        service.status = "reading";

        document.addEventListener("deviceready", onDeviceReady, false);


        

        // device APIs are available
        //
        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }

        function gotFS(fileSystem) {
           fileSystem.root.getFile(service.filename, null, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            fileEntry.file(gotFile, fail);
        }

        function gotFile(file){
            // readDataUrl(file);
            readAsText(file);
        }

        function readDataUrl(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
               //  $scope.result += " " + "Read as data URL";
               // $scope.result += " " + evt.target.result;
            };
            reader.readAsDataURL(file);
        }

        function readAsText(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                // alert("readAsText " + evt.target.result);
                service.data = evt.target.result;
                service.status = "done";
            };
            reader.readAsText(file);
        }

        function fail(evt) {
            service.error = evt.target.error.code;
        }
  };


  return service;

  });