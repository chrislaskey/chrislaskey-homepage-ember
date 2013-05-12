Fixing Google Map Toolbars in Responsive Websites

February 2, 2013

When designing responsive websites it's common to assign a CSS value of
`max-width:100%` to elements, particularly to `img` tags.

Embedded Google Maps use images for the map toolbars. Due to the map's
own CSS rules, if these image tags inherit a `max-width:100%` style
they will not be displayed correctly. The fix is simple enough, either
revise the page's CSS cascade to prevent the style from applying to the
google map, or reset the style:

	.google_map img{
		max-width:none !important;
	}	
