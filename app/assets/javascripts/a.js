(function($){
	$(function(){
		$('#nav>li>a').hover(
			function(){
				$(this).stop(1);
				$(this).animate({'background-position':'0px 0'});
			},
			function(){
				$(this).stop(1);
				$(this).animate({'background-position':'-140px 0'});
			}
		)
		
		$('.boxgrid').each(function(){
			var $caption = $(this).find('span.boxcaption');
			var pheight = $(this).height();
			$caption.css('top', pheight );
			
			$(this).hover(
				function(){
					$caption.stop(1);
					$caption.animate({ top: pheight - $caption.height() });
				},
				function(){
					$caption.stop(1);
					$caption.animate({ top: pheight	})
				}
			)
		});
	});
})(jQuery);
