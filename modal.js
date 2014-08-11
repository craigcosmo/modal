/*
Baisc CSS
.modal {
	display:none;
	position:absolute;
	z-index:99999;
	background: rgba(0,0,0,0.8);
	background:url(/img/modalbg.png)\9;
	border-radius: 3px 3px;
	min-width:240px;
	color:#FFF;
	max-width:400px
}
.modal a{
	color: #A4BAE3
}
.modal .modal_content {
	padding:20px
}
.modal .e {
	color:#FF0000;
}
.modal .modal_header {
	padding:0 5px 0 0;
	margin-bottom:5px
}
.modal .modal_close{
	position: absolute;
	top: 4px;
	right: 5px;
	cursor:pointer;
	padding: 4px;	
}
Basic html
*/

(function($){	
	$.modal = function(options){

		var modal=	'<div class="modal">'+
						'<div class="modal_content"></div>'+
					'</div>';

		$('.modal').remove();
		$('body').append(modal);
		$('.modal_content').prepend(options);
		
		var left = ($(window).width() - $('.modal').outerWidth())/2 + $(document).scrollLeft();
		var top = (($(window).height() - $('.modal').outerHeight())/2) * (2/2) + $(document).scrollTop();	
		
		$('.modal').css({'top':top+'px', 'left':left+'px'}).fadeIn(80);

		// close modal by clicking on the screen
		$(document).mouseup(function(e){
			if(!$(e.target).is('.modal, .modal *')){
				$('.modal').fadeOut(80,function(){ 
					$(this).remove();
					$(document).unbind('mouseup');
				});
			}
		});

	}
})(jQuery);