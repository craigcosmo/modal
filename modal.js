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
	$.modal = function(text,options){


		var modal=	'<div class="modal" id="modal">'+
						'<div class="modal-content"></div>'+
					'</div>';

		var overlay = 	'<div class="modal-overlay" id="modal-overlay"></div>';	

		var defaults = {
			position:'top center',
			offsetY: '-4%',
			offsetX: '',
			parent:'body',
			overlay:false,
			id:'.modal',
			closeOnClick: true,
			placeholder: '.modal-content',
			animate:{
				'top':'4%',
				'opacity' : 1,
				'duration': 100
			},
			css:''
		},

		// var defaults = {
		// 	position:'bottom center',
		// 	offsetY: '',
		// 	offsetX: '',
		// 	parent:'body',
		// 	overlay:true,
		// 	id:'.modal',
		// 	placeholder: '.modal-content',
		// 	animate:{
		// 		'opacity' : 1}
		// },


		o = $.extend({},defaults, options);

		$('#modal-overlay').remove();
		$(o.id).remove();



		modal = $(modal);
		overlay = $(overlay);

		if (o.overlay) $(o.parent).append(overlay);
		$(o.parent).append(modal);
		modal.find(o.placeholder).prepend(text);
		

		var ver = o.position.split(' ')[0];
		var hor = o.position.split(' ')[1];
		var css ={};
		var y='';



		if (ver == 'top') {
			css.top='0';
			y = 0;
			// y being percentage
		}
		if (ver == 'center'){
			css.top='50%';
			css['-ms-transform']= 'translateY(-50%)';
			css['-webkit-transform']= 'translateY(-50%)';
			css['transform']= 'translateY(-50%)';
			y = 50 - modal.outerHeight()*100/$(window).height()/2;
		} 

		if (ver == 'bottom'){
			css.bottom = 0;
			y= 100 - modal.outerHeight()*100/$(window).height();
		} 

		if (hor == 'left') {
			css.left= '0';
			x= 0;
		}
		if (hor == 'center'){
			css.left='50%';
			css['-ms-transform']= 'translateX(-50%)';
			css['-webkit-transform']= 'translateX(-50%)';
			css['transform']= 'translateX(-50%)';
			x = 50 - modal.outerWidth()*100/$(window).width()/2;
		} 
		if (hor == 'right') {
			css.right='0';
			x= 100 - modal.outerWidth()*100/$(window).width();
		}

		if (hor == 'center' && ver == 'center'){ 
			css['-ms-transform']= 'translate(-50%, -50%)';
			css['-webkit-transform']= 'translateX(-50%, -50%)';
			css['transform']= 'translate(-50%, -50%)';
		}


		if ( o.offsetY.indexOf('%') != -1) css['top'] =( parseFloat(o.offsetY) + parseFloat(y) ) +'%';
		// if ( o.offsetY.indexOf('px') != -1) css['top'] =( parseFloat(o.offsetY)/$(window).height()*100 + parseFloat(y) ) +'%' ;


		if (o.offsetX.indexOf('%') != -1) css['left'] =( parseFloat(o.offsetX) + parseFloat(x) ) +'%';
		// if (o.offsetX.indexOf('px') != -1) css['left'] =( parseFloat(o.offsetX)/$(window).width()*100 + parseFloat(x) ) +'%' ;



		if(typeof o.css === 'object'){
			css = o.css;
		}


		if (o.overlay) {
			overlay.animate({'opacity' : 1}, o.animate.duration).show();
		}

		modal.css(css).animate(o.animate,o.animate.duration).show();


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

		modal.find('.close').click(function(){
			if(overlay.length) overlay.remove();
			modal.remove();
		});
		
		return modal;
	};
})(jQuery);