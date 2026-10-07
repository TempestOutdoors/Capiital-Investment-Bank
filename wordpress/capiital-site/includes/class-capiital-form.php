<?php
/**
 * The contact form's spam floor, and its field-specific messages.
 *
 * Elementor Pro's own Honeypot field covers half of what spec/20 asks for, so only the time
 * check is written here: a submission arriving within three seconds of the page loading was
 * not typed by a person. A caught submission is shown "Received, with thanks" and nothing is
 * sent — spec/20 is explicit that a bot is never told it was caught.
 *
 * ── The one part that needs checking on the live site ─────────────────────────
 * Silently accepting a submission while running none of its actions is not something
 * Elementor Pro documents a hook for. The approach below is the one the field uses: register
 * an error, which stops every action, then set the response back to a success so the visitor
 * sees the ordinary message. It depends on Ajax_Handler::set_success() and ::add_error()
 * remaining public, which they have been for a long time but are not a promise.
 *
 * Check it the way the checklist says: submit within three seconds of load and confirm the
 * visitor sees Received, that no mail arrives, and that nothing appears under
 * Elementor → Submissions. If a future Elementor breaks it, the fallback is to leave the
 * honeypot alone and drop the time check — the honeypot is the larger part of the protection.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Form {

	/** Submissions faster than this were not typed. spec/20 and elementor.md §6 both say 3s. */
	const FLOOR_MS = 3000;

	/** The hidden field the page stamps with the load time. */
	const FIELD = 't0';

	public static function init() {
		add_action( 'elementor_pro/forms/validation', array( __CLASS__, 'check' ), 10, 2 );
		add_action( 'wp_footer', array( __CLASS__, 'stamp' ), 20 );
	}

	/**
	 * Fills the hidden t0 field with the moment the page loaded.
	 *
	 * It has to be written by the browser rather than by PHP: a cached page would otherwise
	 * carry the time it was cached, and with WP Rocket in front of the site that could be hours
	 * ago — every submission would then look slow enough to be human, and the floor would do
	 * nothing at all.
	 */
	public static function stamp() {
		?>
		<script>
		(function () {
			var t0 = String(Date.now());
			var fill = function () {
				var fields = document.querySelectorAll('input[name*="<?php echo esc_js( self::FIELD ); ?>"]');
				for (var i = 0; i < fields.length; i++) { if (!fields[i].value) fields[i].value = t0; }
			};
			fill();
			/* Elementor re-renders a form in the editor and after an ajax submit, so fill again. */
			document.addEventListener('submit', fill, true);
		})();
		</script>
		<?php
	}

	/**
	 * @param object $record       Elementor's Form_Record.
	 * @param object $ajax_handler Elementor's Ajax_Handler.
	 */
	public static function check( $record, $ajax_handler ) {
		$fields = $record->get( 'fields' );
		if ( ! is_array( $fields ) ) {
			return;
		}

		$t0 = null;
		foreach ( $fields as $id => $field ) {
			if ( self::FIELD === $id || ( isset( $field['id'] ) && self::FIELD === $field['id'] ) ) {
				$t0 = isset( $field['value'] ) ? (string) $field['value'] : '';
				break;
			}
		}

		/* No stamp at all is not treated as spam. A visitor with JavaScript disabled cannot
		   fill the field, and refusing their message to catch a bot is the wrong trade. */
		if ( null === $t0 || '' === $t0 || ! ctype_digit( $t0 ) ) {
			return;
		}

		$elapsed = ( (float) round( microtime( true ) * 1000 ) ) - (float) $t0;
		if ( $elapsed >= self::FLOOR_MS || $elapsed < 0 ) {
			return;
		}

		/* Caught. Stop every action, then present the ordinary success to whoever sent it. */
		if ( method_exists( $ajax_handler, 'add_error' ) ) {
			$ajax_handler->add_error( self::FIELD, '' );
		}
		if ( method_exists( $ajax_handler, 'set_success' ) ) {
			$ajax_handler->set_success( true );
		}
		if ( method_exists( $ajax_handler, 'add_response_data' ) ) {
			$ajax_handler->add_response_data( 'message', self::success_message() );
		}
	}

	/**
	 * The success line, in the house register, in the page's language.
	 *
	 * It is repeated here rather than read from the form's own settings because a caught
	 * submission never reaches the point where those are applied, and showing a different
	 * sentence to a bot than to a visitor would tell it that it had been caught.
	 */
	private static function success_message() {
		$danish = ( 0 === strpos( get_locale(), 'da' ) )
			|| ( defined( 'ICL_LANGUAGE_CODE' ) && 'da' === ICL_LANGUAGE_CODE );

		return $danish
			? 'Modtaget, med tak. En partner svarer personligt.'
			: 'Received, with thanks. A principal will reply in person.';
	}
}
