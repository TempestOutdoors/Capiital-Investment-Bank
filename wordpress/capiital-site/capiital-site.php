<?php
/**
 * Plugin Name:       Capiital · site
 * Plugin URI:        https://capiital.eu/
 * Description:       What Elementor cannot do on its own: the Publication post type behind the archive and the front page's ledger, the six custom widgets, the shared behaviour, the form's spam floor, and a Reveal control so the firm keeps the house motion on anything it adds.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Capiital
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       capiital-site
 * Domain Path:       /languages
 *
 * ── What belongs here, and what does not ──────────────────────────────────────
 * The child theme holds the tokens, the typefaces and the styles: anything a page needs in
 * order to look right whether or not this plugin is active. This plugin holds behaviour and
 * content structure: anything that would be lost if the design were ever restyled.
 *
 * That line matters practically. A theme can be swapped; a post type cannot. Publications,
 * their taxonomies and their fields live here so that they survive a change of design, which
 * is the ordinary reason WordPress asks for the separation.
 *
 * ── What was and was not tested ───────────────────────────────────────────────
 * Every file here is syntax-checked against PHP 8.4 and reviewed line by line, but it has NOT
 * been run against a live WordPress with Elementor Pro — there is none in the environment it
 * was written in. Treat the first activation as the real test, and read
 * wordpress/capiital-site/README.md, which names the three places most likely to need an
 * adjustment against the installed versions.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

define( 'CAPIITAL_SITE_VERSION', '1.0.0' );
define( 'CAPIITAL_SITE_FILE', __FILE__ );
define( 'CAPIITAL_SITE_DIR', plugin_dir_path( __FILE__ ) );
define( 'CAPIITAL_SITE_URL', plugin_dir_url( __FILE__ ) );

/** The minimum Elementor the widgets are written against. */
define( 'CAPIITAL_SITE_MIN_ELEMENTOR', '3.5.0' );

require_once CAPIITAL_SITE_DIR . 'includes/class-capiital-publications.php';
require_once CAPIITAL_SITE_DIR . 'includes/class-capiital-seed.php';
require_once CAPIITAL_SITE_DIR . 'includes/class-capiital-assets.php';
require_once CAPIITAL_SITE_DIR . 'includes/class-capiital-form.php';
require_once CAPIITAL_SITE_DIR . 'includes/class-capiital-reveal.php';
require_once CAPIITAL_SITE_DIR . 'includes/class-capiital-widgets.php';

/**
 * Everything the plugin does, started in one place so the order is visible.
 */
function capiital_site_boot() {
	Capiital_Publications::init();
	Capiital_Seed::init();
	Capiital_Assets::init();
	Capiital_Form::init();
	Capiital_Reveal::init();
	Capiital_Widgets::init();
}
add_action( 'plugins_loaded', 'capiital_site_boot' );

/**
 * The post type has to exist before the rewrite rules are written, or /publications/ 404s
 * until somebody saves the permalink settings by hand. Registering then flushing, once, on
 * activation is the documented way round it.
 */
function capiital_site_activate() {
	Capiital_Publications::register_post_type();
	Capiital_Publications::register_taxonomies();
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'capiital_site_activate' );

/**
 * On deactivation the rules are flushed again so /publications/ stops answering. The posts
 * themselves are left alone: deactivating a plugin must never destroy content.
 */
function capiital_site_deactivate() {
	flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'capiital_site_deactivate' );

/**
 * A notice rather than a fatal error if Elementor is missing or too old. The post type and
 * the archive data still work without Elementor; only the widgets do not.
 */
function capiital_site_requirements_notice() {
	if ( ! current_user_can( 'activate_plugins' ) ) {
		return;
	}
	$message = '';
	if ( ! did_action( 'elementor/loaded' ) ) {
		$message = __( 'Capiital · site: Elementor is not active, so the custom widgets are not registered. The publications themselves are unaffected.', 'capiital-site' );
	} elseif ( defined( 'ELEMENTOR_VERSION' ) && version_compare( ELEMENTOR_VERSION, CAPIITAL_SITE_MIN_ELEMENTOR, '<' ) ) {
		$message = sprintf(
			/* translators: 1: the installed Elementor version, 2: the minimum this plugin was written against */
			__( 'Capiital · site: Elementor %1$s is older than the %2$s these widgets were written against. Check the front page before publishing.', 'capiital-site' ),
			ELEMENTOR_VERSION,
			CAPIITAL_SITE_MIN_ELEMENTOR
		);
	}
	if ( $message ) {
		printf( '<div class="notice notice-warning"><p>%s</p></div>', esc_html( $message ) );
	}
}
add_action( 'admin_notices', 'capiital_site_requirements_notice' );
