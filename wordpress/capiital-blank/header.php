<?php
/**
 * The document head and the opening of the body.
 *
 * Deliberately renders no site header, no branding and no navigation. The only
 * markup here is what WordPress and the browser require, so that whatever the
 * page itself contains starts at the very top of the document with nothing
 * above it.
 *
 * Elementor Pro's Theme Builder is still given its chance: if a header has been
 * published there, it renders. If not, nothing does.
 *
 * @package capiital-blank
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php
wp_body_open();

if ( function_exists( 'elementor_theme_do_location' ) ) {
	elementor_theme_do_location( 'header' );
}
