angular.module('phonertcdemo')
  .directive('videoView', function ($rootScope, $timeout) {

      var footer = document.getElementById("foot");
      var width = min(window.innerWidth, window.innerHeight) - 44; // footer.clientHeight; //offsetHeight;


      
      var style = "width:" + width + "px;height:" + width +"px;background-color: #000; top: 0px;" +
          "margin-top:" + marginTop() + "px; margin-right: auto;margin-left: auto;z-index: -999 !important;";


      var selftWidth = width / 5.5;
      var selfY = marginTop();
      var selfX = getSelfX();

      // var selfBorder = "background-color:red; position: absolute; top:" + (selfY - 10)
      //       + "; left:" + (selfX - 10) + "; width:" + selftWidth 
      //       + "px; height:" + selftWidth + "px;z-index:999";

    
      function min(a, b) {
        
        if (a < b) {
          return a;
        } else {
          return b;
        }
      }

      function marginTop() {
        // alert((window.innerHeight - 44 - width) / 2);
        return (window.innerHeight - 44 - width) / 2;
      }


      function getSelfX() {
        // alert(min(window.innerWidth, window.innerHeight) - footer.offsetHeight - selftWidth);
        return min(window.innerWidth, window.innerHeight) - 44 - selftWidth - 5;
      }


    return {
      restrict: 'E',
      template: '<div style="' + style + '"></div>',  // class="video-container"
      replace: true,
      link: function (scope, element, attrs) {
        function updatePosition() {
          cordova.plugins.phonertc.setVideoView({
            container: element[0],
            local: { 
              position: [selfX, 5], // [240, 240],
              size: [selftWidth, selftWidth] // [50, 50]
            }
          });
        }

        $timeout(updatePosition, 500);
        $rootScope.$on('videoView.updatePosition', updatePosition);
      }
    }
  });