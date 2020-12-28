(function ($) {

    $(document).ready(function(){
        $('form[name="analyze-url-form"] #analyze-website .elementor-button-icon').append('<i class="fa fa-spinner fa-pulse" ></i>');

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
                $('.modal-analyze-content').hide();
                $('.modal-result-error').find('p.error-code').text('Sorry we could not run UnusedCSS on this site!');
                $('.modal-result-error').toggleClass('error');                
                $('.modal-result-error').show();
            }
        }).done(function(response){
            $('form[name="analyze-url-form"] #analyze-website').removeClass('loading');
            clearInterval(timer);
            if(!response.error){

                if(response.data.stats.afterBytes === 0 || response.data.stats.beforeBytes === 0){
                    $('.modal-analyze-content').hide();
                    $('.modal-result-error').find('p.error-code').text('not supported by the analyzer!');
                    $('.modal-result-error').toggleClass('error');
                    if($('.modal-wrap').length){
                        $('.modal.analyze-loading').appendTo($('.modal-wrap'))
                    }
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
                $('.stats-figures .content span.titlebefore').text('CSS Before');
                $('.stats-figures .content span.titleafter').text('CSS After');
                $('.modal-result-content').find('span.valuebefore').text(response.data.stats.before);
                $('.modal-result-content span.valuebefore').css('color', '#F44336');
                $('.modal-result-content').find('span.valueafter').text(response.data.stats.after);
                $('.modal-result-content span.valueafter').css('color', '#4CAF50');
                $('.modal-result-content').show();

                if ($('.modal-wrap')[0]){
                    $('.input-wrap').css('display', 'none');
                    $('.modal-result-content .email p.text').html('Apply this performance enhancement to your wordpress website <a id="priceclass" href="#elementor-element-8b1d408">now</a>');
                    $('.modal-result-content .email a.close-modal').css('opacity', '60%');
                    
                } else {
                    $('.modal-content .stats .content img').css('display', 'none');
                    $('.modal-content .stats .content').css('display', 'none');   
                }
                
            }
            $('.modal.analyze-loading .modal-content p.status-text').text('Analyzing Completed');
            $('#analyze-loading-progress-bar').css('width','100%');
            
        });
    });

    $(document).on("click", "#priceclass", function(){
        var container = jQuery("html,body");
        var scrollTo = jQuery('.elementor-element-35ea714');
     
        $(container.animate({scrollTop: scrollTo.offset().top, scrollLeft: 0},300)); 
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
        //Before/After
        analyze_modal +=  '<div class="stats stats-figures">';
        analyze_modal += 	'<div class="content">';
        analyze_modal += 	'<div class="stats-figure before stat red">';
        analyze_modal += 		'<span class="title titlebefore"></span>';
        analyze_modal += 	'<div class="details">';
        analyze_modal += 		'<span class="value valuebefore"></span>';
        analyze_modal += 	'</div>';
        analyze_modal +=  '</div>';
        analyze_modal +=  '<div class="stats-img-wrap">';
        analyze_modal +=  '<img src="https://rapidload.io/wp-content/uploads/2020/12/arrow.svg" alt="">';
        analyze_modal +=  '</div>';
        analyze_modal +=  '<div class="stats-figure after stat green">';
        analyze_modal += 	'<span class="title titleafter"></span>';
        analyze_modal += 	'<div class="details">';
        analyze_modal += 	'<span class="value valueafter"></span>';
        analyze_modal += 	'</div>';
        analyze_modal +=  '</div>';
        analyze_modal +=  '</div>';
        analyze_modal +=  '</div>';
        //End
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

        if($('.modal-wrap').length){
            $('.modal-wrap').append(analyze_modal);
        }else{
            $('body').append(analyze_modal);
        }
        

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

        } );
    });

    console.log('home version 1.70');
})(jQuery);