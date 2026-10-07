<?php
/**
 * Capiital — the child theme's only PHP.
 *
 * What this theme does: it loads the tokens, the two self-hosted typefaces, the site's
 * styles and the shared behaviour, registers the one menu location the header needs, and
 * declares the Elementor locations so the Theme Builder can own the header and the footer.
 *
 * What it deliberately does not do: render, inject or filter any content. The last theme
 * put the design into the page itself, which meant every page carried it whether or not
 * that was wanted. Elementor owns the page; this theme owns the styling beneath it.
 *
 * Why the CSS is enqueued here rather than pasted anywhere: WordPress strips <style> from
 * widget content, and 42KB of stylesheet once vanished that way, leaving the site to render
 * as raw markup. A stylesheet enqueued by PHP is never page content and is never filtered.
 * Nothing about the design may ever go back into a widget or into Additional CSS.
 *
 * @package capiital
 */

defined( 'ABSPATH' ) || exit;

const CAPIITAL_VERSION = '3.0.0';

/**
 * Styles and behaviour, in dependency order.
 *
 * tokens → fonts → styles. The tokens come first because fonts.css and styles.css both
 * read --font-display and --font-sans from them; styles.css comes last because it is the
 * only sheet that may override a token.
 *
 * Versions are the file's own modification time, so a changed file busts its cache without
 * anybody having to remember to bump a number.
 */
function capiital_assets() {
	$dir = get_stylesheet_directory();
	$uri = get_stylesheet_directory_uri();

	$ver = static function ( $rel ) use ( $dir ) {
		$path = $dir . '/' . $rel;
		return file_exists( $path ) ? (string) filemtime( $path ) : CAPIITAL_VERSION;
	};

	/* No dependency is declared on the parent's handle. WordPress silently skips a style
	   whose dependency is not registered, and a child enqueued without its parent present
	   would then load no CSS at all. Priority 20 on the hook puts these three after
	   whatever Hello Elementor enqueues, which is all the ordering that is needed. */
	wp_enqueue_style( 'capiital-tokens', $uri . '/assets/css/tokens.css', array(), $ver( 'assets/css/tokens.css' ) );
	wp_enqueue_style( 'capiital-fonts', $uri . '/assets/css/fonts.css', array( 'capiital-tokens' ), $ver( 'assets/css/fonts.css' ) );
	wp_enqueue_style( 'capiital', $uri . '/assets/css/styles.css', array( 'capiital-fonts' ), $ver( 'assets/css/styles.css' ) );

	/* The behaviour belongs to the capiital-site plugin (elementor.md §2), and the theme keeps
	   a copy only so that neither half is broken on its own. When the plugin is active it
	   enqueues its own, newer copy, and this one stands down rather than loading it twice. */
	if ( ! defined( 'CAPIITAL_SITE_VERSION' ) ) {
		wp_enqueue_script( 'capiital', $uri . '/assets/js/main.js', array(), $ver( 'assets/js/main.js' ), true );
	}

}
add_action( 'wp_enqueue_scripts', 'capiital_assets', 20 );

/**
 * The two typefaces are the only fonts the site loads, and the headline is set in the serif
 * and shows at once, so both latin subsets are preloaded. latin-ext is left to be fetched on
 * demand, for the few characters that need it.
 */
function capiital_preload_fonts() {
	$uri = get_stylesheet_directory_uri();
	foreach ( array( 'source-serif-4-normal-latin', 'inter-normal-latin' ) as $face ) {
		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( $uri . '/assets/fonts/' . $face . '.woff2' )
		);
	}
}
add_action( 'wp_head', 'capiital_preload_fonts', 2 );


/**
 * The reveal start states must not apply when JavaScript is absent, or the prose would
 * never appear. styles.css gates them on html.js, and this is what sets it — inline and
 * in the head, so there is no flash of hidden text.
 */
function capiital_js_class() {
	echo '<script>document.documentElement.className += " js";</script>' . "\n";
}
add_action( 'wp_head', 'capiital_js_class', 1 );

/**
 * The header's six section links come from a menu, so their labels can be translated by
 * WPML without touching code. Until one is assigned the header widget falls back to the
 * design's own links.
 */
function capiital_menus() {
	register_nav_menus(
		array(
			'primary' => __( 'Section links, in the header', 'capiital' ),
		)
	);
}
add_action( 'after_setup_theme', 'capiital_menus' );

/**
 * Elementor's Theme Builder locations. Declaring them is what lets a header or footer
 * template built in Elementor take over from the parent theme's own markup.
 */
function capiital_elementor_locations( $manager ) {
	$manager->register_all_core_location();
}
add_action( 'elementor/theme/register_locations', 'capiital_elementor_locations' );

/**
 * Things the house rules forbid, switched off here rather than left to a setting somebody
 * may change back.
 *
 * Emoji: two scripts and a stylesheet for something the register rules out outright.
 * Block library CSS: unused while Elementor renders every page, and it ships its own
 * border radii and shadows, which this design does not have.
 */
function capiital_trim_emoji() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	add_filter( 'emoji_svg_url', '__return_false' );
}
add_action( 'init', 'capiital_trim_emoji' );

/**
 * The block library's stylesheet is unused while Elementor renders every page, and it ships
 * border radii and shadows this design does not have. Dequeued late, after everything that
 * might enqueue it. The admin keeps it: the editor needs it.
 */
function capiital_trim_block_css() {
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
	wp_dequeue_style( 'classic-theme-styles' );
	wp_dequeue_style( 'global-styles' );
}
add_action( 'wp_enqueue_scripts', 'capiital_trim_block_css', 100 );

/**
 * A guard, not a style. If anything ever enqueues Google Fonts — a plugin, a theme update,
 * an Elementor setting that gets switched back — the legal page's cookie paragraph stops
 * being true, because it states that no third party is contacted when a page loads. So the
 * request is refused here as well as being turned off in Elementor's settings.
 */
function capiital_no_google_fonts( $src, $handle ) {
	if ( $src && ( false !== strpos( $src, 'fonts.googleapis.com' ) || false !== strpos( $src, 'fonts.gstatic.com' ) ) ) {
		return '';
	}
	return $src;
}
add_filter( 'style_loader_src', 'capiital_no_google_fonts', 10, 2 );
add_filter( 'script_loader_src', 'capiital_no_google_fonts', 10, 2 );
add_filter( 'elementor/frontend/print_google_fonts', '__return_false' );
