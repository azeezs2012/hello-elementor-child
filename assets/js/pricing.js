(function ($) {

    $(document).ready(function () {

        var urlParams = new URLSearchParams(window.location.search);

        if(urlParams.has('coupon')){
            $.ajax({
                url : uucss_stripe_gateway.uucss_endpoint_url + '/internal/' + 'promotion-code',
                type : 'POST',
                data : {
                    coupon : urlParams.get('coupon'),
                },
                success : function (response) {
                    if(response.data.success){
                        var percentage = response.data.promotionCode.coupon.percent_off;
                        $('.selling-price-wrap .selling-price').each(function(index, value){

                            var selling_price = Number($(value).text())
                            var $discount_price = $(value).parent().parent().parent().find('.discount-price');   

                            $discount_price.text((selling_price.toString().includes('.') ? Number(selling_price).toFixed(2) : selling_price));
                            
                            var new_price = Number(selling_price * (100 - percentage) / 100)
                            $(value).text((new_price.toString().includes('.') ? Number(new_price).toFixed(2) : new_price));
                            $(value).parent().addClass('has-discount')
                            $discount_price.parent().addClass('has-discount')
                        });
                    }
                },
            })
        }

        var current_interval = 'year';
        $('.interval-toggle a').click(function(e){
            e.preventDefault();
            var $parent = $(this).parent().parent().parent();
            if($parent.hasClass('year') && current_interval === 'month' || $parent.hasClass('month') && current_interval === 'year'){
                current_interval = (current_interval === 'year') ? 'month' : 'year';
                $('.interval-toggle').toggleClass('active');
                $('.interval-toggle-section').toggleClass('active');
            }
        });

    });

    console.log('pricing page version 1.0');
})(jQuery);