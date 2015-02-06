(function($){
    $.convertTo = function(element, html, fnc, options) {
        var defaults = {
            $html: null, 
            $element: null,
            fnc: null,
            val: 'elementVal',
            focus: undefined,
            keyup: function(event) {
                var ENTER_KEY_CODE = 13;
                var ESC_KEY_CODE = 27;
                if (event.keyCode == ENTER_KEY_CODE) {
                    var newVal = this.$html.val();
                    this.$element.html(newVal);
                    if(this.fnc !== undefined) {
                        this.fnc.call(this.$element, newVal);
                    }
                    this.$html.replaceWith(this.$element);
                    event.preventDefault();
                } else if (event.keyCode == ESC_KEY_CODE) {
                   this.$html.replaceWith(this.$element);
                }
            },
            focusout: function() {
                this.$html.replaceWith(this.$element);
            }
        }

        var plugin = this;

        plugin.init = function() {
            if(options !== undefined)
            $.each(options, function(k, f) {
                defaults[k] = f
            });
            var $html = $(html);            
            var $element = $(element).replaceWith($html);
            var elementVal = $element.html();            
            if($html.is(':input') || $html.is(':select')) {
                $.each(defaults, function(k, f){
                    if(f === undefined) {
                        $html[k]();
                    } else if(typeof f === 'function') {
                        var nf = f.bind({
                            $html: $html,
                            $element: $element,
                            fnc: fnc
                        });
                        $html.on(k, nf);
                    } else {
                        var isKeyword = k === '$html' 
                                        || k === '$element' 
                                        || k === 'fnc';
                        if(!isKeyword && f != null){                                             
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
        plugin.init();
    }

    $.fn.convertTo = function(html, fnc, options) {
        var plugin = new $.convertTo(this, html, fnc, options);
    }
})(jQuery);