(function ($) {

    $(document).ready(function () {
        console.log('player js v 1.41');
        const player = new Plyr('#landing-video video.elementor-video', {
        });
        
        var vidStarted = false;
        var vidPaused = false;
        

        var title = $('#landing-video').data('title');
        
        player.on('playing', event => {
         if (!vidStarted) {
              gtag('event', 'video_play', {
               'event_category': 'Videos',
               'event_label': title
            });
            vidStarted = true;

         }

        });

        player.on('pause', function () {
         console.log("video paused");
         vidPaused = true;
        });
        
        player.on('timeupdate', event => {
         const instance = event.detail.plyr;
         var track_level_1 =  player.duration * 10 /100 ;
         var track_level_1_end = track_level_1 + 0.2;
         var track_level_2 =  player.duration * 25 /100;
         var track_level_2_end = track_level_2 + 0.2;
         var track_level_3 =  player.duration * 50 /100;
         var track_level_3_end = track_level_3 + 0.2;
         var track_level_4 =  player.duration * 75 /100;
         var track_level_4_end = track_level_4 + 0.2;
         var track_level_5 =  player.duration * 100 /100;
         var track_level_5_end = track_level_5 + 0.2;
        
         /* Viewed 10% */
         if(  instance.currentTime >= track_level_1 && instance.currentTime < track_level_1_end ){
            gtag('event', 'watched_10', {
               'event_category': 'Videos',
               'event_label': title
            });
        
         }
        
         /* Viewed 25% */
         if(  instance.currentTime >= track_level_2 && instance.currentTime < track_level_2_end ){
            gtag('event', 'watched_25', {
               'event_category': 'Videos',
               'event_label': title
            });
         }
        
         /* Viewed 50% */
         if(  instance.currentTime >= track_level_3 && instance.currentTime < track_level_3_end ){
            gtag('event', 'watched_50', {
               'event_category': 'Videos',
               'event_label': title
            });
         }
        
         /* Viewed 75% */
         if(  instance.currentTime >= track_level_4 && instance.currentTime < track_level_4_end ){
            gtag('event', 'watched_75', {
               'event_category': 'Videos',
               'event_label': title
            });
         }
        
         /* Viewed 100% */
         if(  instance.currentTime >= track_level_5 && instance.currentTime < track_level_5_end ){
            gtag('event', 'watched_full_video', {
               'event_category': 'Videos',
               'event_label': title
            });
         }
        },false);

   var exitIntent = false;

   $(window).scroll(function() {
			
      wH = $(window).height(),
      wS = $(this).scrollTop();
      dH = $(document).height();
      
      if($(window).width() < 992){
         if((dH/2) < wS && $(window).width() < 992){
            if (!exitIntent){  
               if (vidPaused === true || !vidStarted){
                     elementorProFrontend.modules.popup.showPopup( { id: 2580 } );
                     exitIntent=true;
               }
            }
          }
      }
     });
    });

})(jQuery);