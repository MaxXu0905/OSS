/*	Beamland.js
	by Tristan Beaulieu 2012-2013
*/

var slideElements = []; //empty because we have no elements in our work flexslider yet.
var vidslideElements = [];
var touchtest = 0; //Quick and dirty way to determine if we're a tablet/phone/etc  0 == Desktop. 1+ == mobile/tablet etc


$(document).ready(function(){
  	
  	retinaCheck('.project .imgcontain > img');
  	
  	
  	$('.project .imgcontain > img').lazyload({
		//	event : 'click',
			// threshold:250,
			 skip_invisible : false
		});
	
	
	
	$('img').lazyload();
	
	prepVids();
	$('#backtotop').css('opacity',0);
	var pxShow = 300;//height on which the button will show
	
		var scrollSpeed = 333;//how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		jQuery(window).scroll(function(){
			if(jQuery(window).scrollTop() >= pxShow){
				$("#backtotop").css('opacity',1);
			}else{
				$("#backtotop").css('opacity',0);
			}
		});
		 
		jQuery('#backtotop a').click(function(){
			jQuery('html, body').animate({scrollTop:0}, scrollSpeed); 
			return false; 
		}); 

		initFlexsliders();

	//Destroy the cookie on logout and lose the bar.

	$('.close_spec_bar').click(function(){
		$('.specialclient').slideUp();
		$('.specialClientText, .client_work').hide();
		$('.default_work').css('display',"block");

		$('.showemall').fadeIn();
		if($(window).width() <= 768){
			$('.client-list-spinner').fadeIn();
		}
		else{
			$('.filterbutton').fadeIn();

		}
		$('.featured_click').click();
		//Kill our cookies		
		document.cookie = "beamlandclient" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		document.cookie = "beamlandprojects" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		//document.location.reload();
		$('#flexslider_0 .slides li,#flexslider_1 .slides li').css('width',$(window).width());
		$('.flexslider').flexslider(0);
		$('#flexslider_0, #flexslider_1').flexslider();
		$(window).resize();

	});

	$('.spec_work').click(function(){
		document.location='/ourwork.php#custom';
		$('.specialClientText').show();
		$('.default_work').hide();
		$(window).scroll();
		//document.location.reload();
		$('#flexslider_0 .slides li,#flexslider_1 .slides li').css('width',$(window).width());
		$('.flexslider').flexslider(0);
		$('#flexslider_0, #flexslider_1').flexslider();
		$(window).resize();
	});

	$('#nav_button').click(function(){
		if($('.nav_mobile').height()==0){
			$('.nav_mobile').height('183px');
		}	
		else{
			$('.nav_mobile').height('0px');
			$('.in_touch').slideUp();
		}
	});
	
	$('#beamlogo').click(function(){
		/*Let's just go to the homepage for now*/
		document.location='/index.php';
	});
	
	$('#explore_work').click(function(){
		document.location='/ourwork.php';
	});
	
	$('.launch_site, .launch_app_store').click(function(){
		window.open($(this).attr('rel'));
		
	});
		
	$('#follow_us').click(function(){
		window.open('https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fbeamland.com%2F&region=follow_link&screen_name=beamlanders&tw_p=followbutton&variant=2.0');
	});	
	
	$('#our_work').click(function(){
		window.parent.location="/ourwork.php";
	});
	$('#about_us').click(function(){
		window.parent.location="/aboutus.php";
	});		
	$('#get_in_touch, #get_in_touch_mobile, .close_getintouch').click(function(){
		$('.in_touch').slideToggle();
	});
	
	
	$('.index_study').click(function(){
		if($(this).children('.view_button').attr('rel')!==undefined){
			window.parent.location=$(this).children('.view_button').attr('rel');
		}

	});

	$('.view_button, #explore_work, .pinkstripe, .desktop_studies .one-third').click(function(){

		if($(this).attr('rel')!==undefined){
			window.parent.location=$(this).attr('rel');
		}

	
	});
	
	$('.seven').click(function(){
		if($(this).children('.undertext').attr('rel')!==undefined){
				window.parent.location=$(this).children('.undertext').attr('rel');
				}

	});
	
	$('.flexslider li').click(function(){
		if($(this).children('.undertext').attr('rel')!==undefined){
				var oururl=$(this).children('.undertext').attr('rel');
				window.parent.location=$(this).children('.undertext').attr('rel');
				}
		else{
			if($(this).children('.undertext').children('a').attr('href')!==undefined){
				window.parent.location=$(this).children('.undertext').children('a').attr('href');
			}
		}
	});
	
	
		$('.case_studies .case_study').click(function(){
			window.parent.location=$(this).children('h6').attr('rel');
		});// End Case Study click
	
$('.boxslider .slides li').live("touchstart",function(e){
		if($(this).children('.inspiration_txt').css('opacity') == '0'){
			touchtest=1; //Hey guys, we're a tablet/phone!
			$(this).siblings().children('.inspiration_txt').css('opacity','0');
			$(this).siblings().children('img').css('opacity','1');
			$(this).children('.inspiration_txt').css('opacity','1');
			$(this).children('img').css('opacity','.2');
		}
		else{
			touchtest=2; //For mobile resolutions
		}
			//e.preventDefault(); //Prevent the click register (hopefully)
			//alert("tap in: "+touchtest);
});
	
	
	
	$('.inspiration_txt').click(function(){
		if(touchtest!=1){  //Fail the touch test?  
			touchtest=0;
			window.open($(this).parent('li').attr('rel'),'_blank');
		}
		else{
			touchtest=2;
		}
	
	});

		
	if ($(".tweets").length != 0) {
		twitterFeed();
	}
	
	//******************
	/* OUR WORK STUFF */
	
	
	
	
	//DEEP LINKING STUFF!!!!!
	
	
		  $.address.init(function(event) {
             //   console.log('init: "' + event.value + '"');
                $('.hideandseek li').address(function() {
                 //   return $(this).attr('rel').replace(location.pathname, 'derbederbie');
                });
            }).change(function(event) {
                //console.log('change: "' + event.value + '"');
             //   alert($.address.queryString());
                var text = (event.value == '') ? 'Home' : 
                    event.pathNames[0].substr(0, 1) + 
                    event.pathNames[0].substr(1);
                //alert(text);
                $('.hideandseek li').each(function() {
                //	console.log($(this).attr('rel'));
                	if($(this).attr('rel')==text){
                		$(this).click();
                		$(window).scroll();
                	}
                if(text=='custom'){
                	if($('.hiddenvalley').text()!=''){
                	var rawprojects = $('.hiddenvalley').text();
					$(rawprojects).show();
					$('.project').not(rawprojects).hide();
					$('.filterbutton, .showemall, .client-list-spinner .default_work').hide();
					$('.client_work').show();
					initFlexsliders();

					$(window).scroll();
					}
                }
                });
            }).internalChange(function(event) {
                console.log('internalChange: "' + event.value + '"');
            }).bind('externalChange', {msg: 'The value of the event is "{value}".'}, function(event) {
                console.log('externalChange: ' + event.data.msg.replace(/\{value\}/, event.value));
            });
	
	
	//Filler Script for selections
	if($('.work-selection').length !=0){
		itemList();
	}		
	$('.client-list-spinner').change(function(){
		var ourclass="."+$(this).find('option:selected').attr('rel');
		if(ourclass!=='' && ourclass!=='.view_all' && ourclass!=='.featured'){
			$('.project').not(ourclass).fadeOut();
			$(ourclass).fadeIn();
		}
		if(ourclass=='.featured'){
			$('.project').not(ourclass).fadeOut();
			$(ourclass).fadeIn();
		}
		if(ourclass=='.view_all'){
			$('.project').fadeIn();
		}
	});
	
	$('.view_all li').click(function(){
		//alert($(this).attr('rel'));
		$('.work-selection li p').removeClass('selected');
		$(this).children('p').addClass('selected');
		window.location.hash = $(this).attr('rel');
		//show all our case studies
		if($(this).attr('rel')=='all'){
			$('.project').fadeIn();
			$('.showemall').fadeOut();
		}
	 	//Show whatever rel attribute of this li is, and fade out others
		else{
			var ourclass="."+$(this).attr('rel');
			$('.project').not(ourclass).fadeOut();
			$(ourclass).fadeIn();
			$('.showemall').fadeIn();
		}	
	//	$('.hideandseek').slideUp();
		var h3offset=$('h3.selected_work').offset();
		var movedistance = -10-h3offset.left-$('.selected_work').width();
		var ourText=$(this).children('p').text();
		$('h3.selected_work').css('left', -$('.selected_work').width()).css('opacity',0);
	window.setTimeout(function(){
			$('h3.selected_work').text(ourText).css('left',10).css('opacity',1);
			}, 400);
		

	});
	
	$('#show_projects').click(function(){
		$('.view_all li:nth-child(2)').click();
	});	
	
	$('.client-list li').click(function(){
		$('.work-selection li p').removeClass('selected');
		$(this).children('p').addClass('selected');
		var ourclass="."+$(this).attr('rel');
		$('.project').not(ourclass).fadeOut();
		$(ourclass).fadeIn();
		window.location.hash = $(this).attr('rel');
		//	$('.hideandseek').slideUp();
		var h3offset=$('h3.selected_work').offset();
		var movedistance = -10-h3offset.left-$('.selected_work').width();
		var ourText=$(this).children('p').text();
		$('h3.selected_work').css('left', -$('.selected_work').width()).css('opacity',0);
	window.setTimeout(function(){
			$('h3.selected_work').text(ourText).css('left',10).css('opacity',1);
			}, 400);
			$('.showemall').fadeIn();
			   $(window).trigger("scroll");//fix lazy load garbage 


	});
	
	$('.project-list li').click(function(){
			$('.work-selection li p').removeClass('selected');

		//	$('.project-list li p').removeClass('selected');
			$(this).children('p').addClass('selected');
	
		
		/*
		
		Sub filter ability commented out per Jeremy
				
		if($('.client-list li p').hasClass('selected')){
			var ourclass="."+$(this).attr('rel');
			ourclass= ourclass + "." + $('.client-list li p.selected').parent('li').attr('rel');
			$('.project').not().fadeOut();
			$(ourclass).fadeIn();
			console.log(ourclass);
		}
		
		else{
			$('view_all li p').removeClass('active');
			
			*/
			
			var ourclass="."+$(this).attr('rel');
			$('.project').not(ourclass).fadeOut();
			$(ourclass).fadeIn();
	//		console.log(ourclass);
	//		$('.hideandseek').slideUp();
			$('h3.selected_work').text($(this).children('p').text());   
			
			$(window).trigger("scroll"); 

		/*}*/

	
	});
	//$('.project > img').trigger('projectclick');

	$('.filterbutton').click(function(){
		$('.hideandseek').slideToggle();
	});
	$('.close_flex').click(function(){
		//$('.hideandseek').slideUp();
		if($('.flexslider_video').is(':visible')){
			var vidslider = $('.flexslider_video').data('flexslider');
			$f( vidslider.slides.eq(vidslider.currentSlide).find('iframe').attr('id')).api('pause');}        
		$('#myModal').trigger('reveal:close');
	});
	
	$('.reveal-modal-bg').click(function(){
			var vidslider = $('.flexslider_video').data('flexslider');
			$f( vidslider.slides.eq(vidslider.currentSlide).find('iframe').attr('id')).api('pause');
	});
	
	$('.close_filter').click(function(){
		$('.hideandseek').slideUp();
	});

//PROJECT ENABLING


	$('.project').click(function(){
		$("#myModal").reveal();
		//$('.hideandseek').slideDown();
		//Let's put a forced scroll position here to bring the user back up at some point
		//$("html, body").animate({ scrollTop: 300 }, "slow");
		//Update the Title here	
		//alert($(this).children('h3').text());
		$('.project_text').html(''); //Clear out the content please!
		$('.project_title').text($(this).children('h3').text());
		$('.project_text').text($(this).children('p').text());
		if($(this).children('.projectslides').children('.project_link').attr('rel')!=''){
			$('.project_text').append('<br><a href="'+$(this).children('.projectslides').children('.project_link').attr('rel')+'" target="_blank"> View Site</a>');
		}
		
		//lazy load in the images that are contained in the div
		$(this).children('.projectslides img').lazyload();
		//console.log('lazyloaded!');
		//force the images into the Flexslider slides
		var projectslides = [];
		//console.log($(this).children('.projectslides img'));
		var slider = $('#myModal .flexslider').data('flexslider');
		var vidslider = $('.flexslider_video').data('flexslider');
		//alert(slider);
		//clearSlider();
		
		var len= slideElements.length;
		var vid_len = vidslideElements.length;
		//console.log(len);
		for (var i=len-1; i>=0; i--){
			slider.removeSlide(i);
			//console.log('slide removed: '+i);
		}
		for (var i=vid_len-1; i>=0; i--){
			vidslider.removeSlide(i);
			//console.log('slide removed: '+i);
		}
		slideElements = [];
		vidslideElements = [];
		$(this).children('.projectslides').children('img').each(function(index){
			var imageurl=$(this).attr('data-original');
			
			slider.addSlide('<li><img src="/_img/spacer.gif" data-original="'+imageurl+'" height="100%" width="100%" class="lazy"></li>');
			slideElements.push($("#dealSlide" + i));	

	//		console.log('slide: '+index);
				$('.flexslider_video').hide();
				$('#myModal .flexslider').show();
					var real_src = $('#myModal .flex-active-slide img').attr('data-original');
					$('#myModal .flex-active-slide img').attr('src',real_src);
					$('#myModal .clone:last-child').children('img').attr('src',real_src); //fix for messed up flexslider additions.		

			});		
	//for Videos wooo
		$(this).find('li').each(function(index){
			vidslider.addSlide("<li><iframe src='"+$(this).attr('data-src')+"?api=1&amp;player_id=flex_vid"+index+"' id='flex_vid"+index+"' width='500' height='281' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen /></iframe></li>"); //imbed it in
			vidslideElements.push($("#vidSlide" + i));	
			$('#myModal .flexslider').hide();
			$('.flexslider_video').show();
			
		});
		
		//Get Flexslider Videos prepared for pausing/playing (WE HAVE TO DO THIS EVERY TIME BECAUSE FLEXSLIDER SUCKS)
		prepVids();
		$('#myModal .clone').each(function(){
						var srcfix=$(this).children('img').attr('data-original');
						$(this).children('img').attr('src',srcfix);
					});
		
		setTimeout("$('.clone').removeClass('flex-active-slide');",200);
	}); //End Project click.

	if(document.location.hash==''){
				//alert(document.cookie);
				
				//if(!readCookie('beamlandprojects')){
					$('.featured_click').click(); //for Our Work, will autoload the featured clients.
				
				
		}
	if(document.location.hash!=='#custom'){
		$('.specialClientText, .client_work').hide();
		$('.default_work').show();
		initFlexsliders();
		$(window).scroll();


	}	

	if(document.location.hash=='#custom'){
				var rawprojects = $('.hiddenvalley').text();
				$(rawprojects).show();
				$('.project').not(rawprojects).hide();
				$('.filterbutton, .showemall, .client-list-spinner, .default_work').hide();
				$('.specialClientText, .client_work').show();
				initFlexsliders();
				$(window).scroll();
	}

	
	/* ***********************************************************
	 * JS for Message forms: nav and footer
	 * 
	 * *********************************************************** 
	 * */
	
	$('#nav_message_form').validate({
		onkeyup: false,
		focusCleanup: true,
		rules: {
			name: {
				required: true
			},
			email_address: {
				required: true
			},
			reason: {
				required: true
			},
			message: {
				required: true
			}
		}
	});

	$('#nav_send_button').click(function(e){
		//console.log("Send button");
		e.preventDefault();
		var validator = $('#nav_message_form').validate();
		if (validator.form()) {
			var data = $('#nav_message_form').serialize();
			$.ajax({
				url: '/api/message/',
				type: 'POST',
				data: data,
				success: function(ret) {
					//console.log(ret);
					// Clear form
					$('#nav_message_form')[0].reset();
					// Show thanks
					$('#nav_message_form_div').hide();
					$('#nav_message_thankyou').show();
				},
				error: function(ret) {
					//console.log(ret.responseText);
					$('#nav_message_form_div').hide();
					$('#nav_message_error').show();
				}
			});
		}
	}); // nav send button click
	
	$('.fn_nav_send_another').click(function(e){
		e.preventDefault();
		$('#nav_message_thankyou').hide();
		$('#nav_message_error').hide();
		$('#nav_message_form_div').show();
	});
	
	$('#footer_message_form').validate({
		onkeyup: false,
		focusCleanup: true,
		rules: {
			name: {
				required: true
			},
			email_address: {
				required: true
			},
			message: {
				required: true
			}
		}
	});
	
	$('#footer_send_button').click(function(e){
		//console.log("Footer send button");
		e.preventDefault();
		var validator = $('#footer_message_form').validate();
		if (validator.form()) {
			var data = $('#footer_message_form').serialize();
			$.ajax({
				url: '/api/message/',
				type: 'POST',
				data: data,
				success: function(ret) {
					//console.log(ret);
					// Clear form
					$('#footer_message_form')[0].reset();
					// Show thanks
					$('#footer_message_form_div').hide();
					$('#footer_message_thankyou').show();
				},
				error: function(ret) {
					//console.log(ret.responseText);
					$('#footer_message_form_div').hide();
					$('#footer_message_error').show();
				}
			});
		}
	}); // footer send button click
	
	$('.fn_footer_send_another').click(function(e){
		e.preventDefault();
		$('#footer_message_thankyou').hide();
		$('#footer_message_error').hide();
		$('#footer_message_form_div').show();
	});
	
	
//################# MODERNIZER STUFF #########################//
	
/*

		$("input").each(function(){
			if($(this).val()=="" && $(this).attr("placeholder")!=""){
				$(this).val($(this).attr("placeholder"));
				$(this).focus(function(){
					if($(this).val()==$(this).attr("placeholder")) $(this).val("");
					});
				$(this).blur(function(){	
					if($(this).val()=="") $(this).val($(this).attr("placeholder"));
				});
			}	
		});
*/
//################ GOTTA GO FAST WITH SONIC AND GET IE BACKGROUNDS 100%!!!! #############//

/*	var bg =$('.header_supercontainer').css('background-image');
	bg = bg.replace('url(','').replace(')','');	
	$('.header_supercontainer').css('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+bg+"', sizingMethod='scale')");
	$('.header_supercontainer').css('-ms-filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+bg+"', sizingMethod='scale')");*/
	$('.header_supercontainer').css({backgroundSize: "cover"});
	$('.flexsliderAutoPlay li').css({backgroundSize: "cover"});
	$('.case_study > div').css({backgroundSize: "cover"});

	if(('#map_div').length!=undefined){
		makeGoogleMap();
	}
}); //End load


function twitterFeed() {
	$.ajax({
    	url: 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=beamlanders&count=3',
    	type:'GET',
    	dataType:'JSONP',
		success: function(data){ 
			twitterCallback(data);
		}
    	//error: function(){ /* The code you want to execute on a fail call */ }
	});
}


function twitterCallback(twitters) {
	var statusHTML = [];
	var sliderHTML = [];
	var data = twitters;
	//profileImage();
  for (var i=0; i < data.length; i++){
   // var userhandle = data[i].from_user;
	//var username = data[i].from_user_name;
	var linkstatus1 = data[i].text.replace(" ","+");
    var status = data[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'" target="_blank">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return '<a href="http://twitter.com/'+reply.substring(1)+'" target="_blank">'+reply.charAt(0)+''+reply.substring(1)+'</a>';
    }).replace(/[#]+[A-Za-z0-9-_]+/g, function(reply) {
    	var tag = reply.replace("#","%23")
   		return '<a href="http://twitter.com/search?q='+tag+'" target="_blank">'+reply+'</a>'; 
    });
	var id_number = data[i].id_str;
	
	
    statusHTML.push('<div class="one-third column"><p>'+status+'</p><div class="balloon_triangle"></div></div>');
    sliderHTML.push('<li><p>'+status+'</p></li>');
    
	  }

	$('.tweets').html(statusHTML.join(''));
	
	//Really messy implementation that needs to be better thought out but it works...  Commented out because killing flexslider for now
		/*
	$('.tweetslide .slides li:nth-child(1)').html(sliderHTML[2]);
	$('.tweetslide .slides li:nth-child(2)').html(sliderHTML[0]);
	$('.tweetslide .slides li:nth-child(3)').html(sliderHTML[1]);
	$('.tweetslide .slides li:nth-child(4)').html(sliderHTML[2]);
	$('.tweetslide .slides li:nth-child(5)').html(sliderHTML[0]);*/
	
}

function itemList(){ //This is only going to be used on PROJECT CONTAINER and only ONCE
	var client_list = []; //Messy text
	var client_clean_class = []; //cleanclass stuff
	var project_type = [];
  	$('.project_container > div').each(function(index){ //only checks child divs, nothing else
  		var splitsville= $(this).attr('class').split(/\s+/);
  		//Client suck out projects	
  		if(jQuery.inArray(splitsville[1],client_list)==-1){
  			var clientCleanup = splitsville[1];
  			clientCleanup=clientCleanup.replace(/\./g,'dot');
  			clientCleanup=clientCleanup.replace(/\&/g,'Amp');
  	//		console.log('Project cleaned = '+clientCleanup);
  			client_list.push(splitsville[1]);
  			$(this).removeClass(splitsville[1]).addClass(clientCleanup);
  			client_clean_class.push(clientCleanup);
  		}
  		//Get the project type!
  	for(var i=2;i< splitsville.length; i++){
  		if(jQuery.inArray(splitsville[i],project_type)==-1 && splitsville[i]!=='recent' && splitsville[i]!=='featured'){
  			project_type.push(splitsville[i]);
  			}
  		
  		}//iterated through the entire list after the first two items and then we can find everything in the array!
  	});
  
  	$('.client-list-spinner').append('<option rel="" disabled>Clients</option');
  	
  	//Take our new lists and populate our index of clients/projects
  	 
  	$(client_list).each(function(index){
  		$('.client-list').append('<li rel="'+client_clean_class[index]+'"><p>'+client_list[index].replace(new RegExp('_','g'),' ')+'</p></li>');
  		$('.client-list-spinner').append('<option rel="'+client_clean_class[index]+'">'+client_list[index].replace(new RegExp('_','g'),'&nbsp;')+'</option>');
  	});
 /*
 
 	!!! TEMPORARILY DISABLED !!!!!
 	
 	 
   	$('.client-list-spinner').append('<option rel="" disabled>Project Type</option');

  	$(project_type).each(function(index){
  		if(project_type[index]!=''){
  			$('.project-list').append('<li rel="'+project_type[index]+'"><p>'+project_type[index].replace('_','&nbsp;')+'</p></li>');
  			$('.client-list-spinner').append('<option rel="'+project_type[index]+'">'+project_type[index].replace('_','&nbsp;')+'</option>');
  		}
  	});
  	*/
  	
  	//Class style cleanup for any missed items 
  	
  	$('.project_container > div').each(function(index){
			var splitsville= $(this).attr('class').split(/\s+/);
			var clientCleanup = splitsville[1];
  			clientCleanup=clientCleanup.replace(/\./g,'dot');
  			clientCleanup=clientCleanup.replace(/\&/g,'Amp');
  			$(this).removeClass(splitsville[1]).addClass(clientCleanup);


	});
  	
}

function clearSlider(){
	var len= slideElements.length;
	for (var i=len-1; i>=0; i--){
		slider.removeSlide(i);
		//console.log('slide removed: '+i);
	}
}


function prepVids(){
	
  	/*  FlexSlider X Vimeo party time  */
  	
	var vimeoPlayers = jQuery('.flexslider_video').find('iframe'), player; 		
	for (var i = 0, length = vimeoPlayers.length; i < length; i++) { 		    
			player = vimeoPlayers[i]; 		    
			$f(player).addEvent('ready', ready); 	
			//console.log('video ready added! '+i);	
	} 		
	function addEvent(element, eventName, callback) { 	    	
		if (element.addEventListener) { 		    	
			element.addEventListener(eventName, callback, false) 		    
		} else { 	      		
			element.attachEvent(eventName, callback, false); 	      	
		} 	    
	} 	    	
	
	function ready(player_id) { 	    	
		var froogaloop = $f(player_id); 	    	
		froogaloop.addEvent('play', function(data) { 		    	
			jQuery('.flexslider_video').flexslider("pause"); 		    
		}); 		    
		froogaloop.addEvent('pause', function(data) { 			    
			jQuery('.flexslider_video').flexslider("play"); 		    
		}); 		
	} 
}

function deepLinking(link){
	$(link).show();
	$('.project').siblings().not(link).hide();  

}

function makeGoogleMap(){

  var point = new google.maps.LatLng(42.357529,-71.059055);

  var myMapOptions = {
    zoom: 18,
    center: point,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map_div"),myMapOptions);

  var image = new google.maps.MarkerImage(
    '_img/beam_pin.png',
    new google.maps.Size(31,39),
    new google.maps.Point(0,0),
    new google.maps.Point(0,39)
  );

  

  var shape = {
    coord: [29,0,30,1,30,2,30,3,30,4,30,5,30,6,30,7,30,8,30,9,30,10,30,11,30,12,30,13,30,14,30,15,30,16,30,17,30,18,30,19,30,20,30,21,30,22,30,23,30,24,30,25,30,26,30,27,30,28,30,29,29,30,20,31,20,32,19,33,18,34,18,35,17,36,16,37,16,38,14,38,14,37,13,36,12,35,12,34,11,33,10,32,10,31,1,30,0,29,0,28,0,27,0,26,0,25,0,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,0,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,0,3,0,2,0,1,1,0,29,0],
    type: 'poly'
  };

  var marker = new google.maps.Marker({
    draggable: true,
    raiseOnDrag: false,
    icon: image,
    shape: shape,
    map: map,
    position: point
  });

}

function retinaCheck(theClass){/*
	if (window.devicePixelRatio >= 1.5){ //Retina resolutions!
		$(theClass).each(function(){
			if($(this).attr('data-retina')!='' || $(this).attr('data-retina')!=undefined){
				var src=$(this).attr('data-retina');
				$(this).attr("data-original",src).removeAttr("data-retina");
			}
		
		});
		
		
	}
	
	else return;

*/	
}


/*Flexslider initialization*/

function initFlexsliders(){
	$('.flexslider').flexslider({
   		animation: "slide",
		//useCSS: false,       
		animationLoop: true,
		slideshow: false,       
		//fixedHeightMiddleAlign:true,
		/*smoothHeight: true,*/
	
     	start: function(slider){
			$('.flexslider').each(function(index){
					$(this).attr('id','flexslider_'+index); //individualize each flexslider please 
			});
	
		},
		
		before: function(slider){
			
			$(slider.slides).each(function(){
				if($(this).children('img').attr('src')=='/_img/spacer.gif'){
					
						if (!(window.devicePixelRatio >= 1.5)){
							var topPad=(slider.height()/2)-12;
							$(this).children('img').css('padding-top',topPad).addClass('loadsize');
						}
					}	
				});
			},
		
		after: function(slider){
			var ourSliderPic = '#' + $(slider).attr('id') + ' .flex-active-slide img';
				if($(ourSliderPic).attr("src")=='/_img/spacer.gif' || $(ourSliderPic).attr("src")=='/_img/grey.gif'){
					var src=$(ourSliderPic).attr("data-original");
										$(ourSliderPic).attr('src', src).removeAttr("data-original");							

					$(ourSliderPic).css('padding-top',0);							
				}
				$(ourSliderPic).removeClass('loadsize'); //Fix for occasional flexslider burps
			}



  });
  
  $('.flexsliderAutoPlay').flexslider({
	  	animation: "fade",
	  	animationLoop: true,
		slideshow: true,
		slideshowSpeed: 7000,
		animationSpeed: 1000, 
		initDelay: 0
		       
  });
  

  $('.flexslider_video').flexslider({
   		animation: "slide",
		useCSS: false,       
		animationLoop: false,
		touch: true,                  
		video: true,
 		controlnav: "thumbnails",
		slideshow: false,       
		before: function(slider){  
			if (slider.slides.eq(slider.currentSlide).find('iframe').length !== 0)
			     $f( slider.slides.eq(slider.currentSlide).find('iframe').attr('id')).api('pause');        
		}
  });
	$('.boxslider').flexslider({
		directionNav: true,
			controlNav: false,
			animation: "slide",
			animationLoop: true,
		    itemWidth: 240,
		    itemMargin: 20,
		    startAt: 0,
		    slideshow: false,
		    slideshowSpeed: 3000,
		    pauseOnHover: true, 
		    // maxItems: 4,
		    // minItems: 4,
		    move: 1,
	});
}

/*For Cookie reading with classes */


function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


function decodeBase64(s) {
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
    for(x=0;x<L;x++){
        c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
        while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
    }
    return r;
};