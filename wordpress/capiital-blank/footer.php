<?php
/**
 * The close of the body.
 *
 * Renders no footer of its own — only wp_footer(), without which no plugin
 * script on the site would load.
 *
 * @package capiital-blank
 */

if ( function_exists( 'elementor_theme_do_location' ) ) {
	elementor_theme_do_location( 'footer' );
}

wp_footer();
?>
</body>
</html>
