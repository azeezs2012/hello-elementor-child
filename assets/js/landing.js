(function ($) {

    $(document).ready(function(){

        var conversion_rate = [];

        conversion_rate[0] = ['-','20','58','100','233','400','900','2900'];
        conversion_rate[1] = ['20','-','32','67','178','317','733','2400'];
        conversion_rate[2] = ['58','32','-','27','111','217','533','1800'];
        conversion_rate[3] = ['100','67','27','-','67','150','400','1400'];
        conversion_rate[4] = ['233','178','111','67','-','50','200','800'];
        conversion_rate[5] = ['400','31','217','150','50','-','100','500'];
        conversion_rate[6] = ['900','733','533','400','200','100','-','200'];
        conversion_rate[7] = ['2900','2400','1800','1400','800','500','200','-'];

        var new_conversion_rate = [];
        new_conversion_rate[0] = '-';
        new_conversion_rate[1] = '25';
        new_conversion_rate[2] = '75';
        new_conversion_rate[3] = '100';
        new_conversion_rate[4] = '125';
        new_conversion_rate[5] = '150';
        new_conversion_rate[6] = '175';
        new_conversion_rate[7] = '200';

        var conversion_rate_ = [
            {
                from : 0,
                to : 0.8,
                conversion_rate : '3'
            },
            {
                from : 0.8,
                to : 1.5,
                conversion_rate : '2.5'
            },
            {
                from : 1.5,
                to : 2.0,
                conversion_rate : '1.9'
            },
            {
                from : 2.0,
                to : 2.5,
                conversion_rate : '1.5'
            },
            {
                from : 2.5,
                to : 3.5,
                conversion_rate : '0.9'
            },
            {
                from : 3.5,
                to : 4.6,
                conversion_rate : '0.6'
            },
            {
                from : 4.6,
                to : 9,
                conversion_rate : '0.3'
            },
            {
                from : 9,
                to : 999999999999999999999999999999999999999999,
                conversion_rate : '0.1'
            },
        ];

        $('.test-site-content.test-site-result .elementor-row .elementor-column:nth(1) .elementor-widget-wrap').append('<div class="loading-spinner-container"><span class="close-error-btn">X</span><div class="loading-spinner"><span class="loading-spinner"><i class="fa fa-spinner fa-pulse" ></i><i class="fas fa-times"></i></span></div><div class="loading-test-text"><span class="loading-title">Hang on, running test</span><span class="almost-done">We\'re almost done...</span></div></div>');
        
        $('.loading-spinner-container .close-error-btn').click(function(){
            $('.test-site-content.test-site-form').toggleClass('show');
            $('.test-site-content.test-site-result').toggleClass('show');
            if($('.loading-spinner-container').hasClass('error')){
                $('.loading-spinner-container').removeClass('error')
            }
        });

        function isUrlValid(url) {
            return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
        }

        function extractHostname(url) {
            var hostname;
            //find & remove protocol (http, ftp, etc.) and get hostname

            if (url.indexOf("//") > -1) {
                hostname = url.split('/')[2];
            }
            else {
                hostname = url.split('/')[0];
            }

            //find & remove port number
            hostname = hostname.split(':')[0];
            //find & remove "?"
            hostname = hostname.split('?')[0];

            return hostname;
        }

        $('form[name="analyze-url-form"] #test-site').click(function(e){
            e.preventDefault();

            var $url = $('form[name="analyze-url-form"] #form-field-field_website_url');

            if($url.val() === undefined || $url.val().toString() === ''){
                return;
            }

            var url = '';

            if ($url.val().toString().indexOf('http://') !== 0 && $url.val().toString().indexOf('https://') !== 0){
                url = 'http://'
            }

            $url.val(url + $url.val());

            if(!isUrlValid($url.val())){
                return;
            }

            if($('.loading-spinner-container').hasClass('error')){
                $('.loading-spinner-container').removeClass('error')
            }
            $('.loading-spinner-container .loading-test-text span:nth(0)').text('Hang on, running test');
            $('.loading-spinner-container .loading-test-text span:nth(1)').text('We\'re almost done...');

            $('.test-site-content.test-site-form').toggleClass('show');
            $('.test-site-content.test-site-result').toggleClass('show');

            /*$.ajax({
                "url": "https://app.unusedcss.io/api/v1/screen",
                "headers" :{
                    'Authorization' : "Bearer 0f4697bdc3394947ba29603971cbe1fd",
                },
                "method": "GET",
                "data": {
                    "url" : $url.val()
                }
            }).done(function(response){
                $('.test-site-result .test-resuts .result-image img').attr('src','https://app.unusedcss.io/api/v1/screen?url=' + $url.val());
            });*/

            $.ajax({
                "url": "https://app.unusedcss.io/api/v1/preview",
                "headers" :{
                    'Authorization' : "Bearer 0f4697bdc3394947ba29603971cbe1fd",
                },
                "method": "POST",
                "data": {
                    "url" : $url.val()
                },
                error: function(xhr, status, error)
                {
                    if(xhr.responseJSON.errors && xhr.responseJSON.errors.length){
                        var error = xhr.responseJSON.errors[0];
                        $('.loading-spinner-container').toggleClass('error');
                        //$('.loading-spinner-container .loading-test-text span.loading-title').text('Error : ' + error.code);
                        $('.loading-spinner-container .loading-test-text span.loading-title').text('Sorry we could not run UnusedCSS on this site!');
                        $('.loading-spinner-container .loading-test-text span.almost-done').text('Results not found');
                        /*setTimeout(function(){
                            $('.test-site-content.test-site-form').toggleClass('show');
                            $('.test-site-content.test-site-result').toggleClass('show');
                        },3000);*/
                    }
                }
            }).done(function(response){
                if(!response.error){

                    if(response.data.stats.afterBytes === 0 || response.data.stats.beforeBytes === 0){
                        $('.loading-spinner-container').toggleClass('error');
                        $('.loading-spinner-container .loading-test-text span.loading-title').text('Sorry we could not run UnusedCSS on this site!');
                        $('.loading-spinner-container .loading-test-text span.almost-done').text('Results not found');
                        return;
                    }

                    var avg_speed = 0.001649232;

                    var pageSize = 3 * 1024 * 1024;

                    var downloadTimeBefore = avg_speed * pageSize / 1000;
                    var downloadTimeAfter = avg_speed * (pageSize - response.data.stats.beforeBytes + response.data.stats.afterBytes) / 1000;

                    var loadTime = ((downloadTimeBefore-downloadTimeAfter) / downloadTimeBefore) * 100;

                    var before_index = 0;
                    var after_index = 0;
                    var _conversion_rate = '';

                    $.each(conversion_rate_, function(index, value){
                        //console.log('before-from',index,value.from,value.to);
                        if(downloadTimeBefore > value.from && downloadTimeAfter < value.to){
                            before_index = index;
                        }
                    });

                    $.each(conversion_rate_, function(index, value){
                        //console.log('after-from',index,value.from,value.to);
                        if(downloadTimeAfter > value.from && downloadTimeAfter < value.to){
                            after_index = index;
                            _conversion_rate = value.conversion_rate;
                        }
                    });
                    if(before_index===after_index && after_index !== 0){
                        after_index = after_index - 1;
                    }

                    // _conversion_rate = (loadTime + (loadTime / 2)) * 12;
                    // _conversion_rate = (Number(response.data.stats.reduction) + (Number(response.data.stats.reduction) / 2)) * 12;

                    /*console.log('avg_speed',avg_speed)
                    console.log('pageSize',pageSize)
                    console.log('downloadTimeBefore',downloadTimeBefore)
                    console.log('downloadTimeAfter',downloadTimeAfter)
                    console.log('loadTime',loadTime)
                    console.log('before_index',before_index)
                    console.log('after_index',after_index)
                    console.log('_conversion_rate',_conversion_rate)*/

                    var output_result = '<div class="test-resuts">';
                    output_result +=        '<span class="result-close-btn">X</span>';
                    output_result +=        '<div class="result-image">';
                    output_result +=            '<div class="image"><img src="//image.thum.io/get/width/600/crop/600/';
                    output_result +=                $url.val();
                    output_result +=                '" alt=""></div>';
                    output_result +=            '<div class="site-url"><span class="site-url">';
                    output_result +=            extractHostname($url.val());
                    output_result +=            '</span></div>';
                    output_result +=        '</div>';
                    output_result +=        '<div class="result-stats">';
                    output_result +=            '<div class="result-stat"><span class="value">';
                    output_result +=            loadTime;
                    //output_result +=            response.data.stats.reduction;
                    output_result +=            '</span><span class="label">Faster Load Times</span></div>';
                    output_result +=            '<div class="result-stat"><span class="value">';
                    output_result +=            (loadTime > 6 ? conversion_rate[before_index][after_index] : 0);
                    output_result +=            '</span><span class="label">Increase in Conversion Rate</span></div>';
                    output_result +=            '<div class="result-stat"><span class="value">';
                    output_result +=            response.data.stats.reductionSize;
                    output_result +=            '</span><span class="label">Reduced with Compression</span></div>';
                    output_result +=        '</div>';
                    output_result +=    '</div>';

                    $('.test-site-content.test-site-result .elementor-row .elementor-column:nth(1) .elementor-widget-wrap .loading-spinner-container').toggle();
                    $('.test-site-content.test-site-result .elementor-row .elementor-column:nth(1) .elementor-widget-wrap .test-resuts').remove();
                    $('.test-site-content.test-site-result .elementor-row .elementor-column:nth(1) .elementor-widget-wrap').append(output_result);

                    $('.test-site-result .test-resuts .result-close-btn').click(function(){
                        $('.test-site-content.test-site-form').toggleClass('show');
                        $('.test-site-content.test-site-result').toggleClass('show');
                        $('.test-site-content.test-site-result .elementor-row .elementor-column:nth(1) .elementor-widget-wrap .loading-spinner-container').toggle();
                        $('.test-site-content.test-site-result .elementor-row .elementor-column:nth(1) .elementor-widget-wrap .test-resuts').remove();
                    });

                    $('.test-site-result .test-resuts .result-stats .result-stat span.value').each(function(){
                        if(!isNaN($(this).text())){
                            $(this).prop('Counter', 0).animate({
                                Counter: $(this).text()
                            }, {
                                duration: 500,
                                easing: 'swing',
                                step: function (now) {
                                    var count = this.Counter;
                                    if(count < 10){
                                        count = count.toFixed(1)
                                    }else{
                                        count = count.toFixed(0)
                                    }
                                    $(this).text(count + '%');
                                }
                            });
                        }
                    });
                }
            });

        });

        var touch_start = null;
        var touch_end = null;
        var origin = null;

        var $flexViewPort = $('.toggle-carousel-images .slide-contents-wrap');
        var $contentWrap = $('.toggle-carousel-images .slide-contents-wrap .slide-contents');
        var content = '.slide-content';

        $contentWrap.find(content).css('max-width',$('.toggle-carousel-images .slide-contents-wrap').width());

        $(window).resize(function () {
            $contentWrap.find(content).css('max-width',$('.toggle-carousel-images .slide-contents-wrap').width());
        });

        /*$flexViewPort.on('touchstart',function(e){
            touch_start = e.originalEvent.touches[0].clientX;
            origin = $contentWrap.position().left;
        });

        $flexViewPort.on('touchend',function(e){
            var width = $contentWrap.find(content).outerWidth();
            var child_count = $contentWrap.find(content).length;
            if(touch_start > touch_end){ //swipe left
                var left = origin - width;
                var maxLeft = (child_count-1) * width * - 1;
                if(left < maxLeft){
                    left = maxLeft;
                }
                $contentWrap.css('transform','translate3d('+ left +'px,0px,0px)');
                $contentWrap.css('transition-duration','0.5s');
                if($('#toggle-carousel-toggler').prop('checked')){
                    $('#toggle-carousel-toggler').trigger('click');
                }
            }else{ // swipe right
                var left = origin + width;
                var maxRight = (child_count - 1) * width;
                if(left > 0){
                    left = 0;
                }
                $contentWrap.css('transform','translate3d('+ left +'px,0px,0px)');
                $contentWrap.css('transition-duration','0.5s');
                if($('#toggle-carousel-toggler').prop('checked')){
                    $('#toggle-carousel-toggler').trigger('click');
                }
            }
            $contentWrap.find(content).removeClass('show');
            setTimeout(function(){
                $.each($contentWrap.find(content), function(index, value){
                    console.log($(value).position().left);
                    if($(value).position().left == 0){
                        $(value).addClass('show');
                    }
                })
            },600);
        });

        $flexViewPort.on('touchmove',function(e){
            touch_end = e.originalEvent.touches[0].clientX;
            var diff = touch_start - touch_end;
            var left = null;
            if(touch_start > touch_end){
                left = origin - diff;
            }else{
                left = origin - diff;
            }
            $contentWrap.css('transform','translate3d('+ left +'px,0px,0px)');
            $contentWrap.css('transition-duration','0.0s');
        });*/

        if ( $.isFunction($.fn.twentytwenty) ) {

            $(".tt-custom-image-slider").twentytwenty({
                default_offset_pct: 0.0,
                orientation: 'horizontal',
                no_overlay: true,
                //move_with_handle_only: true,
                click_to_move: true
            });

        }

        $('.tt-custom-image-slider').on("touchmove", function(){
            var $toggler = $('#toggle-carousel-toggler');
            var width = ($('.toggle-carousel-images .twentytwenty-wrapper').width() / 2)

            if(!$(this).find('.twentytwenty-handle').length){
                return;
            }
            var left = $(this).find('.twentytwenty-handle').position().left
            if(width > left){
                $toggler.prop('checked', true);
                $toggler.trigger('click');
            }else{
                $toggler.prop('checked', false);
                $toggler.trigger('click');
            }
        });

        $('.tt-custom-image-slider').on("mousemove", function(){
            var $toggler = $('#toggle-carousel-toggler');
            var width = ($('.toggle-carousel-images .twentytwenty-wrapper').width() / 2)

            if(!$(this).find('.twentytwenty-handle').length){
                return;
            }
            var left = $(this).find('.twentytwenty-handle').position().left
            if(width > left){
                $toggler.prop('checked', true);
                $toggler.trigger('click');
            }else{
                $toggler.prop('checked', false);
                $toggler.trigger('click');
            }
        });

        $( document ).on( 'elementor/popup/show', () => {
            $(".subscribe-yes a").click(function(e){
                e.preventDefault();
                 $(".subscribe-guide-1").hide();
                 $(".subscribe-guide-2").show();
            });
    
            $(".subscribe-no a").click(function(e){
                e.preventDefault();
                $("#elementor-popup-modal-2540").hide();
                $("#elementor-popup-modal-2580").hide();
            });
            $( document ).on('submit_success', function(){
                $(".five-h1").hide();
                $(".content-1").hide();
                $(".subscribe-guide-2").hide();
                $(".allset-1").show();
                $(".close-1").show();
            });

            $("#close-3").click(function(e){
                e.preventDefault();
                $("#elementor-popup-modal-2540").hide();
                $("#elementor-popup-modal-2580").hide();
            });
           
        } ); 
    });    

    console.log('landing version 1.16');
})(jQuery);