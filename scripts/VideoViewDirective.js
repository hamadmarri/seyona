angular.module('phonertcdemo')
  .directive('videoView', function ($rootScope, $timeout) {

      var footer = document.getElementById("foot");
      var width = min(window.innerWidth, window.innerHeight) - footer.offsetHeight;

      var style = "width:" + width + "px;height:" + width +"px;background-color: #000;" +
          "margin-top:" + marginTop() + "px; margin-right: auto;margin-left: auto;z-index: -999 !important;";


      function min(a, b) {
        
        if (a < b) {
          return a;
        } else {
          return b;
        }
      }

      function marginTop() {
        alert((window.innerHeight - footer.offsetHeight - width) / 2);
        return (window.innerHeight - footer.offsetHeight - width) / 2;
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
              position: [240, 240],
              size: [50, 50]
              // position: [x, y],
              // size: [width, height]
            }
          });
        }

        $timeout(updatePosition, 500);
        $rootScope.$on('videoView.updatePosition', updatePosition);
      }
    }
  });