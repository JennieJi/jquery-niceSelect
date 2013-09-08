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
			},SELECTOR;

        var wrapper = '<div class="' + CLASS.wrapper + '" />';

        // functions
		var destroy = function( ){
			$selects.siblings().remove();
			$selects.unwrap();
			return this;
		};
        var hideSelect = function(){
            $(SELECTOR.dropdown).hide();
        };
		var init = function( ){
            if( !$selets || !$selets.size() ) { return; }

            $selets.each(function(){
                var $select = $(this);
            	if( $select.parent( SELECTOR.wrapper ).length>1 ) { return; }

                var $options = $select.find('OPTION');
                var $selected = $select.find(':selected').length<1 ? $select.first() : $select.find(':selected');
                var $newSelect, $newSelectList, $newSelectText, $newSelectOpen;

                var selectWidth = $select.outerWidth(),
                	selectHeight = $select.outerHeight();
                var isDisabled = $select.is(':disabled');

                // build HTML
                var newSelect = '<div class="' + CLASS.select + ( isDisabled ? ' niceSelect-disabled' : '' ) + '" style="width:' + selectWidth +'px; height:' + selectHeight +  ' position:relative;"></div>',
	                newSelectOpen = '<span class="' + CLASS.selectOpen + '" style="float:right; height:' + selectHeight +  ';"></span>',
	                newSelectText = '<span class="' + CLASS.selectText + '" style="height:' + selectHeight +  '; overflow:hidden;">' + $selected.text() + '</span>',
	                newDropdown = function(){
	                	return '<ul class="' + CLASS.dropdown + '" style="display:none; position:absolute; z-index:' + opts.zindex + ';"></ul>';
	                };

	            // append HTML
				$select.hide().wrap( wrapper );
                $newSelect = $(newSelect).insertAfter($select);
                $newSelectOpen = $( newSelectOpen ).appendTo( $newSelect );
                $newSelectText = $( newSelectText ).appendTo( $newSelect );

                // set style
                $newSelectText.width( selectWidth - $newSelectOpen.outerWidth(true) - $newSelectText.outerWidth() );


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
                    $newSelect.children().click( function(){
                        hideSelect();
                        $newSelectList.slideDown('fast');
                    });
                    // change the select's value
                    $newSelectList.delegate('A','click',function(e){
                        e.preventDefault();
                        $newSelectText.text( $(this).text() );
                    	$select.val( $(this).parent().data('value') );
                       	$select.change();
                        hideSelect();
                    });
                }
            });
			// select blur effect
			$(document).mousedown(function(e) {
                if ($(e.target).parents( CLASS.wrapper ).length === 0) {
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
