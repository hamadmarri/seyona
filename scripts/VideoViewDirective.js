angular.module('phonertcdemo')
  .directive('videoView', function ($rootScope, $timeout) {

    // var width, height, x, y;

    // x = y = 10;


    // alert(window.innerWidth + " " + window.innerWidth);

    // if (window.innerWidth >= 1024) {
    //   width = height = 300;
    // } else if (window.innerWidth < 1024 && window.innerWidth >= 667) {
    //   width = height = 100;
    // } else {
    //   width = height = 50;
    // }

    var width = window.innerWidth - 20;

    var style = "width:" + width + "px;height:" + width +"px;background-color: #000;margin-bottom: 20px;" +
        "margin-right: auto;margin-left: auto;margin-top: 20px;z-index: -999 !important;";

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