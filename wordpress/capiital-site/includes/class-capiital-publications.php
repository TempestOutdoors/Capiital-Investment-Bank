<?php
/**
 * The Publication post type, its three taxonomies and its four fields.
 *
 * This is the piece that makes the archive and the front page's ledger the same thing. Both
 * read these posts, so a publication the firm adds appears in both, in the right order, with
 * the formatting already on it — and the two can never disagree, which they did while the
 * ledger's four rows were hard-coded.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Publications {

	const POST_TYPE = 'publication';
	const TAX_KIND   = 'publication_kind';
	const TAX_SECTOR = 'publication_sector';
	const TAX_STAGE  = 'publication_stage';

	/**
	 * The four stages of an ownership, in the order of an ownership.
	 *
	 * This order is a fixed fact of the firm. It is the same four names, in the same order, in
	 * Where we engage, in the footer's first column and in this taxonomy, and spec/03 says to
	 * change all three together or not at all. Never sort these alphabetically.
	 */
	const STAGE_ORDER = array(
		'Before a transaction',
		'After a transaction',
		'During ownership',
		'Before exit',
	);

	public static function init() {
		add_action( 'init', array( __CLASS__, 'register_post_type' ) );
		add_action( 'init', array( __CLASS__, 'register_taxonomies' ) );
		add_action( 'acf/init', array( __CLASS__, 'register_fields' ) );

		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( __CLASS__, 'admin_columns' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( __CLASS__, 'admin_column' ), 10, 2 );
		add_filter( 'manage_edit-' . self::POST_TYPE . '_sortable_columns', array( __CLASS__, 'sortable_columns' ) );

		/* The stage dropdown in the admin list is reordered to match, for the same reason. */
		add_filter( 'get_terms_args', array( __CLASS__, 'stage_term_order' ), 10, 2 );
	}

	/**
	 * has_archive is false on purpose. The archive is an Elementor page carrying the
	 * Capiital · Archive widget, because the filters, the order menu and the reading panel are
	 * not something a WordPress archive template can do. The single template exists only so an
	 * entry can be shared and indexed.
	 */
	public static function register_post_type() {
		register_post_type(
			self::POST_TYPE,
			array(
				'labels'              => array(
					'name'               => _x( 'Publications', 'post type general name', 'capiital-site' ),
					'singular_name'      => _x( 'Publication', 'post type singular name', 'capiital-site' ),
					'add_new_item'       => __( 'Add a publication', 'capiital-site' ),
					'edit_item'          => __( 'Edit publication', 'capiital-site' ),
					'new_item'           => __( 'New publication', 'capiital-site' ),
					'view_item'          => __( 'View publication', 'capiital-site' ),
					'search_items'       => __( 'Search publications', 'capiital-site' ),
					'not_found'          => __( 'No publication found.', 'capiital-site' ),
					'not_found_in_trash' => __( 'No publication in the bin.', 'capiital-site' ),
					'all_items'          => __( 'All publications', 'capiital-site' ),
					'menu_name'          => __( 'Publications', 'capiital-site' ),
				),
				'public'              => true,
				'has_archive'         => false,
				'show_in_rest'        => true,
				'menu_position'       => 20,
				'menu_icon'           => 'dashicons-media-document',
				'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes', 'revisions' ),
				'rewrite'             => array( 'slug' => 'publications', 'with_front' => false ),
				'exclude_from_search' => false,
			)
		);
	}

	/**
	 * Three flat taxonomies. Hierarchical is false on all of them: a publication has one type,
	 * one sector and one stage, and none of them nests.
	 */
	public static function register_taxonomies() {
		$shared = array(
			'public'            => true,
			'hierarchical'      => false,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'show_in_quick_edit'=> true,
		);

		register_taxonomy( self::TAX_KIND, self::POST_TYPE, array_merge( $shared, array(
			'labels'  => self::tax_labels( __( 'Type', 'capiital-site' ), __( 'Types', 'capiital-site' ) ),
			'rewrite' => array( 'slug' => 'publication-type' ),
		) ) );

		register_taxonomy( self::TAX_SECTOR, self::POST_TYPE, array_merge( $shared, array(
			'labels'  => self::tax_labels( __( 'Sector', 'capiital-site' ), __( 'Sectors', 'capiital-site' ) ),
			'rewrite' => array( 'slug' => 'publication-sector' ),
		) ) );

		register_taxonomy( self::TAX_STAGE, self::POST_TYPE, array_merge( $shared, array(
			'labels'  => self::tax_labels( __( 'Stage', 'capiital-site' ), __( 'Stages', 'capiital-site' ) ),
			'rewrite' => array( 'slug' => 'publication-stage' ),
		) ) );
	}

	private static function tax_labels( $singular, $plural ) {
		return array(
			'name'          => $plural,
			'singular_name' => $singular,
			'add_new_item'  => sprintf( /* translators: the taxonomy's singular name */ __( 'Add %s', 'capiital-site' ), $singular ),
			'all_items'     => $plural,
			'search_items'  => sprintf( /* translators: the taxonomy's plural name */ __( 'Search %s', 'capiital-site' ), $plural ),
		);
	}

	/**
	 * The four fields, registered in PHP rather than drawn in the ACF interface.
	 *
	 * In code they are reviewable, they travel with the plugin, and they cannot be edited away
	 * by accident. The firm still fills them in exactly as it would any other field.
	 */
	public static function register_fields() {
		if ( ! function_exists( 'acf_add_local_field_group' ) ) {
			return;
		}
		acf_add_local_field_group( array(
			'key'      => 'group_capiital_publication',
			'title'    => __( 'Publication', 'capiital-site' ),
			'location' => array( array( array(
				'param'    => 'post_type',
				'operator' => '==',
				'value'    => self::POST_TYPE,
			) ) ),
			'position' => 'normal',
			'style'    => 'default',
			'fields'   => array(
				array(
					'key'          => 'field_capiital_summary',
					'name'         => 'summary',
					'label'        => __( 'Summary', 'capiital-site' ),
					'instructions' => __( 'One sentence. It is shown on the card and above the text in the reading panel.', 'capiital-site' ),
					'type'         => 'textarea',
					'rows'         => 2,
					'new_lines'    => '',
					'required'     => 1,
				),
				array(
					'key'          => 'field_capiital_read_time',
					'name'         => 'read_time',
					'label'        => __( 'Reading time', 'capiital-site' ),
					'instructions' => __( 'For example 12 min.', 'capiital-site' ),
					'type'         => 'text',
					'placeholder'  => '12 min',
				),
				array(
					'key'          => 'field_capiital_photo_brief',
					'name'         => 'photo_brief',
					'label'        => __( 'Photo brief', 'capiital-site' ),
					'instructions' => __( 'Describes the photograph wanted while there is none, and becomes its alt text once one is set.', 'capiital-site' ),
					'type'         => 'text',
				),
				array(
					'key'           => 'field_capiital_pdf',
					'name'          => 'pdf',
					'label'         => __( 'PDF', 'capiital-site' ),
					'instructions'  => __( 'Optional. A download link appears in the reading panel only when one is attached.', 'capiital-site' ),
					'type'          => 'file',
					'return_format' => 'url',
					'mime_types'    => 'pdf',
				),
				/* open-items.md requires every seeded entry to be removable in one step, so the
				   twelve placeholders carry a flag the firm can filter the admin list by. */
				array(
					'key'           => 'field_capiital_placeholder',
					'name'          => 'is_placeholder',
					'label'         => __( 'Placeholder entry', 'capiital-site' ),
					'instructions'  => __( 'Ticked on the twelve entries this plugin seeded. Filter by it to remove them all once the firm supplies its own.', 'capiital-site' ),
					'type'          => 'true_false',
					'ui'            => 1,
				),
			),
		) );
	}

	/* ── The admin list ─────────────────────────────────────────────────────── */

	public static function admin_columns( $columns ) {
		$out = array();
		foreach ( $columns as $key => $label ) {
			$out[ $key ] = $label;
			if ( 'title' === $key ) {
				$out['capiital_summary'] = __( 'Summary', 'capiital-site' );
				$out['capiital_read']    = __( 'Reading time', 'capiital-site' );
				$out['capiital_photo']   = __( 'Photograph', 'capiital-site' );
			}
		}
		return $out;
	}

	public static function admin_column( $column, $post_id ) {
		if ( 'capiital_summary' === $column ) {
			echo esc_html( wp_trim_words( (string) self::field( $post_id, 'summary' ), 14 ) );
		} elseif ( 'capiital_read' === $column ) {
			echo esc_html( (string) self::field( $post_id, 'read_time' ) );
		} elseif ( 'capiital_photo' === $column ) {
			if ( has_post_thumbnail( $post_id ) ) {
				echo esc_html__( 'Set', 'capiital-site' );
			} else {
				$brief = (string) self::field( $post_id, 'photo_brief' );
				/* translators: the photograph wanted, where none has been supplied */
				echo esc_html( $brief ? sprintf( __( 'To follow: %s', 'capiital-site' ), $brief ) : __( 'To follow', 'capiital-site' ) );
			}
		}
	}

	public static function sortable_columns( $columns ) {
		$columns['capiital_read'] = 'capiital_read';
		return $columns;
	}

	/**
	 * Stage terms are offered in the order of an ownership wherever they are listed, including
	 * the admin filter. Without this WordPress sorts them by name, which puts "After" first and
	 * reads as nonsense.
	 */
	public static function stage_term_order( $args, $taxonomies ) {
		if ( ! is_array( $taxonomies ) || ! in_array( self::TAX_STAGE, $taxonomies, true ) ) {
			return $args;
		}
		$args['orderby'] = 'include_slugs';
		$args['slug']    = array_map( 'sanitize_title', self::STAGE_ORDER );
		return $args;
	}

	/* ── Reading a publication ──────────────────────────────────────────────── */

	/**
	 * One field read, whether or not ACF is present. get_field() is the right call when ACF is
	 * installed; the meta fallback keeps the archive rendering if it ever is not, rather than
	 * emptying every card.
	 */
	public static function field( $post_id, $name ) {
		if ( function_exists( 'get_field' ) ) {
			$value = get_field( $name, $post_id );
			if ( null !== $value && '' !== $value ) {
				return $value;
			}
		}
		return get_post_meta( $post_id, $name, true );
	}

	private static function first_term( $post_id, $taxonomy ) {
		$terms = get_the_terms( $post_id, $taxonomy );
		return ( $terms && ! is_wp_error( $terms ) ) ? $terms[0]->name : '';
	}

	/**
	 * One publication, shaped exactly as assets/js/archive.js expects an entry.
	 *
	 * The renderer does not know whether it was handed this or the static build's JSON, which
	 * is the point: one archive implementation, two sources of data.
	 */
	public static function to_entry( $post ) {
		$id      = $post->ID;
		$summary = (string) self::field( $id, 'summary' );
		$brief   = (string) self::field( $id, 'photo_brief' );
		$body    = array_values( array_filter( array_map(
			static function ( $paragraph ) {
				return trim( wp_strip_all_tags( $paragraph ) );
			},
			preg_split( '/\R{2,}|<\/p>/', (string) $post->post_content )
		) ) );

		$entry = array(
			'slug'   => $post->post_name,
			'kind'   => self::first_term( $id, self::TAX_KIND ),
			'sector' => self::first_term( $id, self::TAX_SECTOR ),
			'stage'  => self::first_term( $id, self::TAX_STAGE ),
			'date'   => get_the_date( 'Y-m-d', $post ),
			'read'   => (string) self::field( $id, 'read_time' ),
			'en'     => array(
				'title'   => get_the_title( $post ),
				'summary' => $summary,
				'photo'   => $brief,
				'body'    => $body,
			),
		);

		if ( has_post_thumbnail( $id ) ) {
			$entry['img'] = get_the_post_thumbnail_url( $id, 'large' );
		}
		$pdf = self::field( $id, 'pdf' );
		if ( $pdf ) {
			$entry['pdf'] = is_array( $pdf ) ? ( $pdf['url'] ?? '' ) : (string) $pdf;
		}
		return $entry;
	}

	/**
	 * Every publication in the current language, newest first.
	 *
	 * They are loaded in one query because there are few of them and the archive filters in the
	 * browser: a filter must not cost a page load. spec/30 sets the threshold at sixty, past
	 * which this should paginate instead.
	 */
	public static function all( $limit = -1 ) {
		$query = new WP_Query( array(
			'post_type'              => self::POST_TYPE,
			'post_status'            => 'publish',
			'posts_per_page'         => $limit,
			'orderby'                => 'date',
			'order'                  => 'DESC',
			'ignore_sticky_posts'    => true,
			'no_found_rows'          => true,
			'update_post_term_cache' => true,
		) );
		return $query->posts;
	}
}
