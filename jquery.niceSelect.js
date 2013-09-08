/*!	jQuery.niceSelect.js - created by Jennie Ji
*	Latest update: 2013-09-08
*/
(function($){
	$.fn.niceSelect = function( options ) {
		var $selects = $(this);
		var defaults = {
			zindex: 10
		},opts = $.extend(defaults, options);

		var PREFIX = 'niceSelect-';
		var CLASS = {
				wrapper: 	PREFIX + 'wrapper',
				select: 	PREFIX + 'select',
				selectText: PREFIX + 'text',
				selectOpen: PREFIX + 'open',
				dropdown: 	PREFIX + 'dropdown',
				disabled: 	PREFIX + 'disabled'
			},
            SELECTOR = {};

        var wrapper = '<div class="' + CLASS.wrapper + '" />';

        // functions
        var isInited = function( $select ){
            return $select.parent( SELECTOR.wrapper ).length>0;
        }
		var destroy = function( ){
            $selects.each(function(){
                var $select = $(this);
                if( !isInited( $select ) ) { return; }
    			$selects.siblings().remove();
    			$selects.unwrap().show();
            });
			return this;
		};
        var hideSelect = function(){
            $(SELECTOR.dropdown).hide();
        };
		var init = function( ){
            if( $selects.length<1 ) { return; }

            $selects.each(function(){
                var $select = $(this);
            	if( isInited( $select ) ) { return; }

                var $options = $select.find('OPTION');
                var $selected = $select.find(':selected').length<1 ? $select.first() : $select.find(':selected');
                var $newSelect, $newSelectList, $newSelectText, $newSelectOpen;

                var selectWidth = $select.outerWidth(),
                	selectHeight = $select.outerHeight();
                var isDisabled = $select.is(':disabled');

                // build HTML
                var newSelect = '<div class="' + CLASS.select + ( isDisabled ? ' niceSelect-disabled' : '' ) + '" style="width:' + selectWidth +'px; height:' + selectHeight +  'px; position:relative;"></div>',
	                newSelectOpen = '<div class="' + CLASS.selectOpen + '" style="float:right; height:' + selectHeight +  'px;"></div>',
	                newSelectText = '<div class="' + CLASS.selectText + '" style="height:' + selectHeight +  'px; line-height:' + selectHeight +  'px; overflow:hidden;">' + $selected.text() + '</div>',
	                newDropdown = function(){
	                	return '<ul class="' + CLASS.dropdown + '" style="display:none; position:absolute; z-index:' + opts.zindex + ';"></ul>';
	                };

	            // append HTML
				$select.hide().wrap( wrapper );
                $newSelect = $(newSelect).insertAfter($select);
                $newSelectOpen = $( newSelectOpen ).appendTo( $newSelect );
                $newSelectText = $( newSelectText ).appendTo( $newSelect );

                // set style
                // $newSelectText.width( selectWidth - $newSelectOpen.outerWidth(true) - $newSelect.outerWidth() );


                if(!isDisabled){

                	// build dropdown
                    $newSelectList = $( newDropdown() ).appendTo( $newSelect );
                    $options.each(function(){
                    	$('<li><a href="#">' + $(this).text() + '</a></li>')
                    		.appendTo( $newSelectList )
                    		.data('value', $(this).val() );
                    });

                    // set style of dropdown
                    $newSelectList.width( selectWidth );

                    // open the dropdown list
                    $newSelectText.add( $newSelectOpen ).click( function(){
                        hideSelect();
                        $newSelectList.slideDown('fast');
                    });
                    // change the select's value
                    $newSelectList.delegate('A','click',function(e){
                        e.preventDefault();
                        $newSelectText.html( $(this).text() );
                    	$select.val( $(this).parent().data('value') );
                       	$select.change();
                        hideSelect();
                    });
                }
            });
			// select blur effect
			$(document).mousedown(function(e) {
                if ($(e.target).parents( SELECTOR.wrapper ).length === 0) {
                	hideSelect();
                }
            });

            return this;
		};
		var refresh = function(){
			destroy();
			init();
			return this;
		};

		// init SELECTOR
		$.each( CLASS, function(key, val){
			SELECTOR[key] = '.' + val;
		});

		init();
		
		return {
			refresh: refresh,
			destroy: destroy
		};	

	};
})( jQuery );
