(function($){	
	$.modal = function(text,options){

		var modal=	'<div class="modal" id="modal">'+
						'<div class="modal-content"></div>'+
					'</div>';

		var overlay = 	'<div class="modal-overlay" id="modal-overlay"></div>';	

		var defaults = {
			parent:'body',
			overlay:false,
			id:'.modal',
			closeOnClick: true,
			placeholder: '.modal-content',
			closeBtn: ''
		},

		o = $.extend({},defaults, options);

		$('#modal-overlay').remove();
		$(o.id).remove();

		modal = $(modal);
		overlay = $(overlay);

		if (o.overlay) $(o.parent).append(overlay);
		$(o.parent).append(modal);
		modal.find(o.placeholder).prepend(text);

		if (o.overlay) {
			overlay.show();
		}
		setTimeout( function(){
			modal.addClass('modal-animate');
		}, 0)
		

		// close modal by clicking on the screen
		$(document).on('mouseup touchend', function(e){
			if(o.closeOnClick) {
				if(!$(e.target).is('#modal, #modal *')){	
					overlay.fadeOut(80,function(){
						$(this).remove();
					});
					modal.fadeOut(80,function(){ 
						$(this).remove();
						if(!modal.length) $(document).unbind('mouseup');
					});
				}
			}
			
		});

		$(document).on('keydown', function(e){
			if (e.keyCode == 27) { 
			   	overlay.fadeOut(80,function(){
					$(this).remove();
				});
				modal.fadeOut(80,function(){ 
					$(this).remove();
				});
			}
		});

		modal.find(o.closeBtn).click(function(){
			if(overlay.length) overlay.remove();
			modal.remove();
		});
		
		return modal;
	};
})(jQuery);