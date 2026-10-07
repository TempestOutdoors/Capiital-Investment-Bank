<?php
/**
 * The twelve placeholder publications.
 *
 * They are read from data/publications.json, which is the same file the static archive is
 * built from, so the two cannot drift. Each is flagged is_placeholder, because open-items.md
 * requires the whole set to be removable in one step once the firm supplies its own.
 *
 * Seeding is deliberately manual — Publications → Placeholder entries → Import — rather than
 * something that happens on activation. A plugin that writes twelve posts the moment it is
 * switched on is a plugin that writes them again on a staging copy, or after a deactivate and
 * reactivate, and leaves the firm deleting duplicates.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Seed {

	const NONCE   = 'capiital_seed';
	const META_KEY = '_capiital_seed_slug';

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
		add_action( 'admin_post_capiital_seed', array( __CLASS__, 'handle' ) );
	}

	public static function menu() {
		add_submenu_page(
			'edit.php?post_type=' . Capiital_Publications::POST_TYPE,
			__( 'Placeholder entries', 'capiital-site' ),
			__( 'Placeholder entries', 'capiital-site' ),
			'manage_options',
			'capiital-seed',
			array( __CLASS__, 'screen' )
		);
	}

	/**
	 * The data file, or null if it is missing.
	 */
	private static function data() {
		$path = CAPIITAL_SITE_DIR . 'data/publications.json';
		if ( ! file_exists( $path ) ) {
			return null;
		}
		$json = json_decode( (string) file_get_contents( $path ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		return is_array( $json ) ? $json : null;
	}

	/** Slugs already present, so importing twice adds nothing. */
	private static function existing() {
		$posts = get_posts( array(
			'post_type'      => Capiital_Publications::POST_TYPE,
			'post_status'    => 'any',
			'posts_per_page' => -1,
			'fields'         => 'ids',
		) );
		$slugs = array();
		foreach ( $posts as $id ) {
			$slugs[ get_post_field( 'post_name', $id ) ] = $id;
		}
		return $slugs;
	}

	public static function screen() {
		$data     = self::data();
		$existing = self::existing();
		$total    = $data ? count( $data['publications'] ) : 0;
		$present  = 0;
		if ( $data ) {
			foreach ( $data['publications'] as $entry ) {
				if ( isset( $existing[ $entry['slug'] ] ) ) {
					$present++;
				}
			}
		}
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'Placeholder entries', 'capiital-site' ); ?></h1>
			<?php if ( ! $data ) : ?>
				<div class="notice notice-error"><p>
					<?php esc_html_e( 'data/publications.json is missing from the plugin folder, so there is nothing to import.', 'capiital-site' ); ?>
				</p></div>
			<?php else : ?>
				<p>
					<?php
					printf(
						/* translators: 1: how many of the placeholders are already present, 2: how many there are in total */
						esc_html__( 'The design ships with %2$s placeholder publications so the archive and the front page\'s ledger can be seen working before the firm has written anything. %1$s of them are present.', 'capiital-site' ),
						(int) $present,
						(int) $total
					);
					?>
				</p>
				<p><?php esc_html_e( 'They are drafts, not published, and each is flagged as a placeholder. Importing again adds only what is missing; it never overwrites an entry you have edited.', 'capiital-site' ); ?></p>
				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
					<input type="hidden" name="action" value="capiital_seed">
					<?php wp_nonce_field( self::NONCE ); ?>
					<p>
						<button type="submit" name="mode" value="import" class="button button-primary">
							<?php esc_html_e( 'Import the missing entries', 'capiital-site' ); ?>
						</button>
						<button type="submit" name="mode" value="remove" class="button"
							onclick="return confirm('<?php echo esc_js( __( 'Move every placeholder entry to the bin? Entries you have edited are flagged too, so check the list first.', 'capiital-site' ) ); ?>')">
							<?php esc_html_e( 'Bin every placeholder', 'capiital-site' ); ?>
						</button>
					</p>
				</form>
			<?php endif; ?>
		</div>
		<?php
	}

	public static function handle() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You do not have permission to do that.', 'capiital-site' ) );
		}
		check_admin_referer( self::NONCE );

		$mode   = isset( $_POST['mode'] ) ? sanitize_key( wp_unslash( $_POST['mode'] ) ) : '';
		$result = 'remove' === $mode ? self::remove() : self::import();

		wp_safe_redirect( add_query_arg(
			array( 'post_type' => Capiital_Publications::POST_TYPE, 'page' => 'capiital-seed', 'capiital_done' => $result ),
			admin_url( 'edit.php' )
		) );
		exit;
	}

	private static function import() {
		$data = self::data();
		if ( ! $data ) {
			return 0;
		}
		$existing = self::existing();
		$made     = 0;

		foreach ( $data['publications'] as $entry ) {
			if ( isset( $existing[ $entry['slug'] ] ) ) {
				continue;
			}
			$body = '';
			foreach ( $entry['en']['body'] as $paragraph ) {
				$body .= wp_kses_post( $paragraph ) . "\n\n";
			}
			/* Drafts, not published. The firm decides when a placeholder goes live, and nobody
			   wants twelve invented publications appearing on a live site on activation. */
			$id = wp_insert_post( array(
				'post_type'    => Capiital_Publications::POST_TYPE,
				'post_status'  => 'draft',
				'post_title'   => $entry['en']['title'],
				'post_name'    => $entry['slug'],
				'post_content' => trim( $body ),
				'post_excerpt' => $entry['en']['summary'],
				'post_date'    => $entry['date'] . ' 09:00:00',
			), true );

			if ( is_wp_error( $id ) ) {
				continue;
			}
			wp_set_object_terms( $id, $entry['kind'], Capiital_Publications::TAX_KIND );
			wp_set_object_terms( $id, $entry['sector'], Capiital_Publications::TAX_SECTOR );
			wp_set_object_terms( $id, $entry['stage'], Capiital_Publications::TAX_STAGE );

			self::set_field( $id, 'summary', 'field_capiital_summary', $entry['en']['summary'] );
			self::set_field( $id, 'read_time', 'field_capiital_read_time', $entry['read'] );
			self::set_field( $id, 'photo_brief', 'field_capiital_photo_brief', $entry['en']['photo'] );
			self::set_field( $id, 'is_placeholder', 'field_capiital_placeholder', 1 );
			update_post_meta( $id, self::META_KEY, $entry['slug'] );

			$made++;
		}
		return $made;
	}

	private static function remove() {
		$posts = get_posts( array(
			'post_type'      => Capiital_Publications::POST_TYPE,
			'post_status'    => 'any',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'meta_key'       => self::META_KEY, // phpcs:ignore WordPress.DB.SlowDBQuery
		) );
		foreach ( $posts as $id ) {
			wp_trash_post( $id );
		}
		return count( $posts );
	}

	/** ACF where it is available, plain meta where it is not, so neither path loses the value. */
	private static function set_field( $post_id, $name, $key, $value ) {
		if ( function_exists( 'update_field' ) ) {
			update_field( $key, $value, $post_id );
			return;
		}
		update_post_meta( $post_id, $name, $value );
	}
}
