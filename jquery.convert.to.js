(function($){

    $.fn.convertTo = function (html, fnc, defaultFncs) {
        var $html = $(html);
        var htmlType = $html.prop('tagName')
                            .toLowerCase();
        var $elem = $(this).replaceWith($html);
        var elemVal = $elem.html();        
                
        if(htmlType == 'input' || htmlType == 'select') {
            $.each($.fn.convertTo.defaults, function(k, f){
                if(f === undefined) {
                    $html[k]();
                } else if(typeof f === 'function') {
                    $.fn.convertTo.$html = $html;
                    $.fn.convertTo.$elem = $elem;
                    $.fn.convertTo.fnc = fnc;                   
                    
                    $html.on(k, f)
                } else {
                    try {
                        $html[k](eval(f));
                    } catch(e) {
                        $html[k](f);
                    }
                }
            });
        }        
    }  

    $.fn.convertTo.$html = null;
    $.fn.convertTo.$elem = null;
    $.fn.convertTo.fnc = undefined;

    $.fn.convertTo.defaults = {
        val: 'elemVal',
        focus: undefined,
        keyup: function(event) {
            $html = $.fn.convertTo.$html;
            $elem = $.fn.convertTo.$elem;
            fnc = $.fn.convertTo.fnc;
            if (event.keyCode == 13) { //Intro
                var newVal = $html.val();
                $elem.html(newVal);
                if(fnc !== undefined) {
                    fnc.call($elem, newVal);
                }
                $html.replaceWith($elem);
                event.preventDefault();
            } else if (event.keyCode == 27) { //Esc
               $html.replaceWith($elem);
            }            
        },
        focusout: function() {
            $html = $.fn.convertTo.$html;
            $elem = $.fn.convertTo.$elem;
            $html.replaceWith($elem);
        }
    }
})(jQuery);