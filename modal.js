(function($){	
	function createModalObject(){

		var m=	'<div class="modal" id="modal">'+
						'<div class="modal-content"></div>'+
					'</div>';

		var div = document.createElement('div');
		div.innerHTML = m
		m = div.firstChild
		return m
	}
	function removeCurrentModal(id){
		$(id).remove();
	}
	function removeCurrentOverlay(){
		$('#modal-overlay').remove();
	}
	function createOverlay(){
		var overlay = 	'<div class="modal-overlay" id="modal-overlay"></div>';	

		var div = document.createElement('div');
		div.innerHTML = overlay
		overlay = div.firstChild
		return overlay
	}



	$.modal = function(text,options){

		var defaults = {
			parent:'body',
			overlay:false,
			id:'.modal',
			closeOnClick: true,
			placeholder: '.modal-content',
			closeBtn: '',
			animateClass: 'modal-animate',
		},

		o = Object.assign({},defaults, options);


		removeCurrentOverlay();
		removeCurrentModal(o.id);

		var parent = document.querySelector('body')
		var modal = createModalObject()
		var overlay = createOverlay()

		o.overlay && parent.appendChild(overlay);
		parent.appendChild(modal);
		modal.querySelector(o.placeholder).innerHTML = text ;


		setTimeout( function(){
			modal.classList.add(o.animateClass);
		}, 0)
		

		function handleDocumentOnClick(){
			console.log(modal.children)
			if(!o.closeOnClick)  return
			var e = window.event
			var doc = this
			var inner = modal.querySelectorAll('*')
			while( e.target && e.target != document.body){

			}
			// if (e.target !== modal && e.target !== modal.children[0] ) {
				modal.classList.remove(o.animateClass)
				modal.addEventListener('transitionend', function(){
					this.remove()
					doc.removeEventListener('mouseup', handleDocumentOnClick)
				}, false)
			// }
			
		}

		document.addEventListener('mouseup', handleDocumentOnClick, false)
		// // close modal by clicking on the screen
		// $(document).on('mouseup touchend', function(e){
		// 	if(o.closeOnClick) {
		// 		if(!$(e.target).is('#modal, #modal *')){	
		// 			overlay.fadeOut(80,function(){
		// 				$(this).remove();
		// 			});
		// 			modal.fadeOut(80,function(){ 
		// 				$(this).remove();
		// 				if(!modal.length) $(document).unbind('mouseup');
		// 			});
		// 		}
		// 	}
			
		// });

		// $(document).on('keydown', function(e){
		// 	if (e.keyCode == 27) { 
		// 	   	overlay.fadeOut(80,function(){
		// 			$(this).remove();
		// 		});
		// 		modal.fadeOut(80,function(){ 
		// 			$(this).remove();
		// 		});
		// 	}
		// });

		// modal.find(o.closeBtn).click(function(){
		// 	if(overlay.length) overlay.remove();
		// 	modal.remove();
		// });
		
		return modal;
	};
})(jQuery);