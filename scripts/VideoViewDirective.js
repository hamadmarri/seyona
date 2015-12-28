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

    return {
      restrict: 'E',
      template: '<div class="video-container"></div>',
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