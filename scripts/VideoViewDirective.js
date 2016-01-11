angular.module('phonertcdemo')
  .directive('videoView', function ($rootScope, $timeout) {

      var footer = document.getElementById("foot");
      var isPortrate = (window.innerWidth == min(window.innerWidth, window.innerHeight));

      // var width = min(window.innerWidth, window.innerHeight) - 44; // footer.clientHeight; //offsetHeight;

      var width = getWidth();

      
      var style = "width:" + width + "px;height:" + width +"px;background-color: #000; top: 0px;" +
          "margin-top:" + marginTop() + "px; margin-right: auto;margin-left: auto;z-index: -999 !important;";



      // function style() {
      //   return  "width:" + width + "px;height:" + width 
      //     + "px;background-color: #000; margin-left:" + marginLeft() + "px; display: fixed;";
      // } 


      var selftWidth = width / 5.5;
      // var selfY = marginTop();
      var selfX = getSelfX();

      // var selfBorder = "background-color:red; position: absolute; top:" + (selfY - 10)
      //       + "; left:" + (selfX - 10) + "; width:" + selftWidth 
      //       + "px; height:" + selftWidth + "px;z-index:999";


      function getWidth() {
        if (isPortrate) {
          return (window.innerHeight - 44) * 0.61;
        } else {
          return window.innerHeight - 44;
        }
      }
    
      function min(a, b) {
        
        if (a < b) {
          return a;
        } else {
          return b;
        }
      }

      function marginLeft() {
        if(isPortrate) {
          return (window.innerWidth - width) / 2;  
        } else {
          return 0;
        }
        
      }

      function marginTop() {
        // alert((window.innerHeight - 44 - width) / 2);
        return (window.innerHeight - 44 - width) / 2;
        // return 0;
      }


      function getSelfX() {

        if (isPortrate) {
          return ((window.innerHeight - 44) * 0.61) - selftWidth - 6;
        } else {
          return window.innerHeight - 44 - selftWidth - 5;
        }

        // alert(min(window.innerWidth, window.innerHeight) - footer.offsetHeight - selftWidth);
        return min(window.innerWidth, window.innerHeight) - 44 ;
        // return window.innerWidth - selftWidth - 5 - marginLeft();
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