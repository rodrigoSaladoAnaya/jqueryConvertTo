(function($){

    $.fn.convertTo = function (html, fnc, defaultFncs) {
        var $html = $(html);
        var htmlType = $html.prop('tagName')
                            .toLowerCase();
        var $elem = $(this).replaceWith($html);
        var elemVal = $elem.html();

        if(defaultFncs !== undefined) {
            $.extend(
                $.fn.convertTo.defaults,
                defaultFncs
            );
        }

        if($html.is(':input') || $html.is(':select')) {
            $.each($.fn.convertTo.defaults, function(k, f){
                if(f === undefined) {
                    $html[k]();
                } else if(typeof f === 'function') {
                    var nf = f.bind({
                        $html: $html,
                        $elem: $elem,
                        fnc: fnc
                    });
                    $html.on(k, nf)
                } else {
                    var isKeyword = k === '$html' 
                                    || k === '$elem' 
                                    || k === 'fnc';
                    if(!isKeyword){                        
                        try {
                            $html[k](eval(f));
                        } catch(e) {
                            $html[k](f);
                        }    
                    }
                }
            });
        }        
    }
    
    $.fn.convertTo.defaults = {
        $html: null, 
        $elem: null,
        fnc: null,
        val: 'elemVal',
        focus: undefined,
        keyup: function(event) {
            if (event.keyCode == 13) { //Intro
                var newVal = this.$html.val();
                this.$elem.html(newVal);
                if($fnc !== undefined) {
                    $fnc.call(this.$elem, newVal);
                }
                this.$html.replaceWith(this.$elem);
                event.preventDefault();
            } else if (event.keyCode == 27) { //Esc
               $html.replaceWith(this.$elem);
            }            
        },
        focusout: function() {
            this.$html.replaceWith(this.$elem);
        }
    }
})(jQuery);