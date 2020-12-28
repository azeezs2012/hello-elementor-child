(function ($) {
    $(document).ready(function () {

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


        $('form[name="analyze-url-form"] #analyze-website .elementor-button-icon').append('<i class="fa fa-spinner fa-pulse" ></i>')

        $('.test-site-content.test-site-result .elementor-row .elementor-column:nth(1) .elementor-widget-wrap').append('<div class="loading-spinner-container"><span class="close-error-btn">X</span><div class="loading-spinner"><span class="loading-spinner"><i class="fa fa-spinner fa-pulse" ></i><i class="fas fa-times"></i></span></div><div class="loading-test-text"><span class="loading-title">Hang on, running test</span><span class="almost-done">We\'re almost done...</span></div></div>');

        $('.loading-spinner-container .close-error-btn').click(function(){
            $('.test-site-content.test-site-form').toggleClass('show');
            $('.test-site-content.test-site-result').toggleClass('show');
            if($('.loading-spinner-container').hasClass('error')){
                $('.loading-spinner-container').removeClass('error')
            }
        });

        function analyze_loading_modal_handle(open){
            if(open){
                !$('.modal.analyze-loading').hasClass('open') && $('.modal.analyze-loading').addClass('open');
                !$('body').hasClass('modal-analyze-loading-open') && $('body').addClass('modal-analyze-loading-open');
                $('#analyze-loading-progress-bar').css('width','0%');
                $('.modal.analyze-loading .modal-content p.status-text').text('Sending Request');
            }else{
                $('.modal.analyze-loading').removeClass('open');
                $('body').removeClass('modal-analyze-loading-open');
            }
        }

        function isUrlValid(url) {
            return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
        }

        function interval_timer(){
            var progres_container_width = $('#analyze-loading-progress').width();
            var progres_bar_width = $('#analyze-loading-progress-bar').width();
            var percentage = (progres_bar_width/progres_container_width * 100);
            if(percentage <= 97){
                percentage += 1;
                $('#analyze-loading-progress-bar').css('width', percentage + '%');
            }
        }

        var timer = null;

        function resetModalAnalyzeContent(){
            $('.modal.analyze-loading .modal-content p.status-text').text('Sending Request');
            $('#analyze-loading-progress-bar').css('width', '0%');
            $('.modal-analyze-content').show();
            if($('.modal-result-content').hasClass('error')){
                $('.modal-result-content').removeClass('error');
            }
            $('.modal-result-content').hide();
            $('.modal-result-error').hide();
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

        $('form[name="analyze-url-form"] #analyze-website').click(function(e){
            e.preventDefault();
            var $url = $('form[name="analyze-url-form"] #form-field-field_website_url');

            if($url.val() === undefined || $url.val().toString() === ''){
                return;
            }

            var url = '';

            if ($url.val().toString().indexOf('http://') != 0 && $url.val().toString().indexOf('https://') != 0){
                url = 'http://'
            }

            $url.val(url + $url.val());

            if($('form[name="analyze-url-form"] #analyze-website').hasClass('loading')){
                return;
            }

            if(!isUrlValid($url.val())){
                return;
            }

            $('form[name="analyze-url-form"] #analyze-website').addClass('loading');
            $('.modal.analyze-loading .modal-content span.site-url').text(extractHostname($url.val()));

            resetModalAnalyzeContent();
            analyze_loading_modal_handle(true);

            setTimeout(function(){
                $('.modal.analyze-loading .modal-content p.status-text').text('Fetching page source...');
                $('#analyze-loading-progress-bar').css('width','25%');
            },500);
            setTimeout(function(){
                $('.modal.analyze-loading .modal-content p.status-text').text('Analayzing source...');
                $('#analyze-loading-progress-bar').css('width','50%');
            },1000);
            setTimeout(function(){
                $('.modal.analyze-loading .modal-content p.status-text').text('Removing UnusedCSS...');
                $('#analyze-loading-progress-bar').css('width','75%');
                timer = setInterval(interval_timer, 500);
            },1500);

            $('.modal.analyze-loading .modal-content img.screen-snap-shot').attr('src', "//image.thum.io/get/width/600/crop/800/" + $url.val());

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
                    $('form[name="analyze-url-form"] #analyze-website').removeClass('loading');
                    clearInterval(timer);
                    if(xhr.responseJSON.errors.length) {
                        $('.modal-analyze-content').hide();
                        var error = xhr.responseJSON.errors[0];
                        //$('.modal-result-content').find('p.error-code').text(error.code);
                        $('.modal-result-error').find('p.error-code').text('Sorry we could not run UnusedCSS on this site!');
                        $('.modal-result-error').toggleClass('error');
                        $('.modal-result-error').show();
                    }
                }
            }).done(function(response){
                $('form[name="analyze-url-form"] #analyze-website').removeClass('loading');
                clearInterval(timer);
                if(!response.error){

                    if(response.data.stats.afterBytes === 0 || response.data.stats.beforeBytes === 0){
                        $('.modal-analyze-content').hide();
                        $('.modal-result-error').find('p.error-code').text('not supported by the analyzer!');
                        $('.modal-result-error').toggleClass('error');
                        $('.modal-result-error').show();
                        return;
                    }

                    $('.modal-analyze-content').hide();
                    $('.modal-result-error').hide();

                    $('.modal-result-content').find('span.stat-value').text(response.data.stats.reduction + '%');
                    $('.modal-result-content').find('span.stat-url-text').text(extractHostname($url.val()));

                    if(response.data.using.indexOf("wordpress") !== -1){
                        $('a.stat-get-start').show();
                    }else{
                        $('a.stat-get-start').hide();
                    }

                    if(response.data.using.indexOf("rapidload") !== -1){
                        $('.result-stats .stats span.stat-text').text('Already Optimized');
                        $('.result-stats .stats span.stat-value').css('font-size', '50px');
                    }else{
                        $('.result-stats .stats span.stat-text').text('Slashed CSS size by');
                        $('.result-stats .stats span.stat-value').css('font-size', '75px');
                    }

                    $('.modal-result-content').data('preview_data', response.data);
                    $('.modal-result-content').show();
                }
                $('.modal.analyze-loading .modal-content p.status-text').text('Analyzing Completed');
                $('#analyze-loading-progress-bar').css('width','100%');
            });
        });

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

        var analyze_modal = '<div class="modal analyze-loading">';
        analyze_modal +=        '<div class="modal-content">';
        analyze_modal +=            '<div class="modal-header">';
        analyze_modal +=                '<img class="analyze-logo" src="https://rapidload.io/wp-content/uploads/2020/11/rapidload.io_-1.svg" alt="">';
        analyze_modal +=                '<span></span>';
        analyze_modal +=            '</div>';
        analyze_modal +=            '<div class="modal-analyze-content">';
        analyze_modal +=                '<h4>Analyzing <span class="site-url"></span>...</h4>';
        analyze_modal +=                 '<p  class="status-text">Sending Request</p>';
        analyze_modal +=                 '<div id="analyze-loading-progress">';
        analyze_modal +=                     '<div id="analyze-loading-progress-bar">';
        analyze_modal +=                      '</div>';
        analyze_modal +=                 '</div>';
        analyze_modal +=             '</div>';
        analyze_modal +=             '<div class="modal-result-content" style="display:none">';
        analyze_modal +=                 '<div class="result">';
        analyze_modal +=                    '<div class="result-screen-shot result-body">';
        analyze_modal +=                        '<img class="screen-snap-shot" src="" alt="">';
        analyze_modal +=                    '</div>';
        analyze_modal +=                    '<div class="result-wrap">';
        analyze_modal +=                        '<div class="result-stats result-body">';
        analyze_modal +=                            '<div class="stats"><span class="stat-text">Slashed CSS Size By</span><span class="stat-value"></span></div>';
        analyze_modal +=                            '<div class="stats-url"><span class="stat-url-text">';
        analyze_modal +=                            '';
        analyze_modal +=                            '</span>';
        analyze_modal +=                            '<div>';
        analyze_modal +=                                '<a class="stat-get-start" href="/pricing">Get Started</a>';
        analyze_modal +=                            '</div>';
        analyze_modal +=                            '</div>';
        analyze_modal +=                        '</div>';
        analyze_modal +=                        '<div class="email">';
        analyze_modal +=                            '<div class="input-wrap">';
        analyze_modal +=                                '<input type="email" name="email" placeholder="Enter your email" id="email">';
        analyze_modal +=                                '<a class="send-email" href="">Send</a>';
        analyze_modal +=                            '<img class="arrow-line" src="https://rapidload.io/wp-content/uploads/2020/12/drawn-2.svg" alt="">';
        analyze_modal +=                            '</div>';
        analyze_modal +=                            '<p class="text">Enter your email and subscribe with to receive the full stats</p>';
        analyze_modal +=                            '<a class="close-modal" href="#">No Thanks</a>';
        analyze_modal +=                        '</div>';
        analyze_modal +=                    '</div>';
        analyze_modal +=                '</div>';
        analyze_modal +=             '</div>';
        analyze_modal +=             '<div class="modal-result-error" style="display:none">';
        analyze_modal +=                '<div class="error">';
        analyze_modal +=                    '<div class="error-icon">';
        analyze_modal +=                        '<span><i class="fas fa-times"></i></span>';
        analyze_modal +=                    '</div>';
        analyze_modal +=                    '<div class="error-message">';
        analyze_modal +=                        '<p class="error-code">';
        analyze_modal +=                        '</p>';
        analyze_modal +=                        '<p class="error-description">Results not Found';
        analyze_modal +=                        '</p>';
        analyze_modal +=                    '</div>';
        analyze_modal +=                '</div>';
        analyze_modal +=                '<div class="error-back">';
        analyze_modal +=                    '<a href="#" class="close-modal">Go back to home page</a>';
        analyze_modal +=                '</div>';
        analyze_modal +=             '</div>';
        analyze_modal +=        '</div>';
        analyze_modal +=    '</div>';

        $('body').append(analyze_modal);

        $('.modal.analyze-loading a.send-email').click(function(e){
            e.preventDefault();
            var email = $('.modal-result-content .result #email').val();
            /*$.ajax({
                url : ajax.url,
                type : 'post',
                data: {
                    action:'send_stat_email',
                    email: email,
                    preview_data : JSON.stringify($('.modal-result-content').data('preview_data'))
                },
            }).done(function(response){
                
            });*/
            $.ajax({
                url : "https://app.unusedcss.io/api/v1/internal/contact",
                type : 'post',
                data: {
                    name: null,
                    last_name: null,
                    email: email,
                    tag : 'site-preview'
                },
            }).done(function(response){
                
            });
        });

        $('.modal.analyze-loading a.close-modal').click(function(e){
            e.preventDefault();
            analyze_loading_modal_handle(false);
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

        

        console.log('child js version:1.6');
    });
})(jQuery);