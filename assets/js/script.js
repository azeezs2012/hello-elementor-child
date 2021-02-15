(function ($) {
    $(document).ready(function () {

        window.setRapidLoadCookie = function (key , value, days){
            var exdate=new Date();
            exdate.setDate(exdate.getDate() + days);
            document.cookie = key + "=" + value
            + ";domain=.rapidload.io;path=/; expires="+exdate.toUTCString();
        }

        window.getRapidLoadCookie = function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        var urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.has('ref')) {
            window.setRapidLoadCookie('rapidload_affiliate', urlParams.get('ref'), 30);
        }

        console.log('child common js version:1.0');
    });
})(jQuery);