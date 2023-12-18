
//
$(document).ready(function() {
			$('#fullpage').fullpage({
				'verticalCentered': false,
				'scrollingSpeed': 600,
				'autoScrolling': false,
				'css3': true,
				'navigation': true,
				'navigationPosition': 'right',
			});
		});

// wow
$(function()
{
    new WOW().init();
    $(".rotate").textrotator();
})


/**
 * Automatic Incremental Delay Setter for social icons
 */
document.addEventListener('DOMContentLoaded', function() {
    var wowLinks = document.querySelectorAll('.link-icon-socials');
    var delay = 0.3;

    wowLinks.forEach(function(link) {
        link.setAttribute('data-wow-delay', delay + 's');
        delay += 0.15;
    });
});
