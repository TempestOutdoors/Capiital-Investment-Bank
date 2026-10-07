<?php
/**
 * Capiital · Contact
 *
 * The whole footer band: the invitation and the form on the left, the site's index on the
 * right, one hairline, then the legal lines. One band on the Logo Border's gradient — the
 * dark navy footer with a separate light contact band is gone, and none of its styles are to
 * come back.
 *
 * ── Why the form arrives by template ──────────────────────────────────────────
 * spec/20 wants the band laid out exactly as drawn, and elementor.md §6 wants a native
 * Elementor Pro Form, so that submissions are stored, the email action runs and the built-in
 * honeypot is available. A widget cannot nest another widget, so the form is built once as a
 * saved template and embedded here by id. The editor edits the form in the library, as a
 * form; the band keeps its layout.
 *
 * Without a template chosen the band renders without a form, which is what the editor sees
 * before building one, and what the page shows if the template is ever deleted.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Widget_Contact extends Capiital_Widget_Base {

	public function get_name() {
		return 'capiital-contact';
	}

	public function get_title() {
		return __( 'Capiital · Contact', 'capiital-site' );
	}

	/** Saved templates, for the form picker. */
	private function templates() {
		$options = array( '' => __( '— none —', 'capiital-site' ) );
		$posts   = get_posts( array(
			'post_type'      => 'elementor_library',
			'post_status'    => 'publish',
			'posts_per_page' => 100,
			'orderby'        => 'title',
			'order'          => 'ASC',
		) );
		foreach ( $posts as $post ) {
			$options[ $post->ID ] = $post->post_title;
		}
		return $options;
	}

	protected function register_controls() {
		$this->start_controls_section( 'invitation', array( 'label' => __( 'The invitation', 'capiital-site' ) ) );
		$this->add_control( 'heading_line', array(
			'label'       => __( 'Heading', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'Every engagement',
			'label_block' => true,
		) );
		$this->add_control( 'accent_line', array(
			'label'       => __( 'Accent line', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'begins with a letter.',
			'label_block' => true,
		) );
		$this->add_control( 'lead', array(
			'label'   => __( 'Paragraph', 'capiital-site' ),
			'type'    => \Elementor\Controls_Manager::TEXTAREA,
			'rows'    => 4,
			'default' => 'Engagements come to us by introduction or by letter. If you are considering a sale, an acquisition, a capital raise or a succession, we would be glad to hear of it.',
		) );
		$this->add_control( 'email', array(
			'label'       => __( 'E-mail', 'capiital-site' ),
			'description' => __( 'Always lowercase. Two i\'s in capiital.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'contact@capiital.eu',
		) );
		$this->add_control( 'form_template', array(
			'label'       => __( 'Form', 'capiital-site' ),
			'description' => __( 'An Elementor Pro Form saved as a template. Build it once under Templates → Saved Templates and choose it here; it is edited there, as a form.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::SELECT,
			'options'     => $this->templates(),
			'default'     => '',
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'columns', array( 'label' => __( 'The index', 'capiital-site' ) ) );

		$links = new \Elementor\Repeater();
		$links->add_control( 'label', array(
			'label'       => __( 'Label', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'label_block' => true,
		) );
		$links->add_control( 'url', array(
			'label'       => __( 'Address', 'capiital-site' ),
			'description' => __( 'A bare #anchor points at the front page from anywhere on the site.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => '#services',
			'label_block' => true,
		) );

		$columns = new \Elementor\Repeater();
		$columns->add_control( 'heading', array(
			'label'       => __( 'Column heading', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'label_block' => true,
		) );
		$columns->add_control( 'links', array(
			'label'       => __( 'Links', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::REPEATER,
			'fields'      => $links->get_controls(),
			'title_field' => '{{{ label }}}',
		) );

		$this->add_control( 'columns', array(
			'label'       => __( 'Columns', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::REPEATER,
			'fields'      => $columns->get_controls(),
			'default'     => $this->default_columns(),
			'title_field' => '{{{ heading }}}',
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'legal', array( 'label' => __( 'The legal lines', 'capiital-site' ) ) );
		$this->add_control( 'legal_1', array(
			'label'       => __( 'First line', 'capiital-site' ),
			'description' => __( 'The year is the Roman numeral. Update it each January.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => '© MMXXVI Capiital ApS · Dampfærgevej 27, 2100 København Ø, Denmark · CVR 42842699',
			'label_block' => true,
		) );
		$this->add_control( 'legal_2', array(
			'label'   => __( 'Second line', 'capiital-site' ),
			'type'    => \Elementor\Controls_Manager::TEXTAREA,
			'rows'    => 3,
			'default' => 'Information on this site is provided for general informational purposes only and does not constitute investment, legal, tax or accounting advice.',
		) );
		$this->end_controls_section();
	}

	private function default_columns() {
		return array(
			array(
				'heading' => 'Where we engage',
				'links'   => array(
					array( 'label' => 'Before a transaction', 'url' => '#services' ),
					array( 'label' => 'After a transaction', 'url' => '#services' ),
					array( 'label' => 'During ownership', 'url' => '#services' ),
					array( 'label' => 'Before exit', 'url' => '#services' ),
				),
			),
			array(
				'heading' => 'The house',
				'links'   => array(
					array( 'label' => 'What we learned', 'url' => '#learned' ),
					array( 'label' => 'Cases', 'url' => '#cases' ),
					array( 'label' => 'Who we are', 'url' => '#people' ),
					array( 'label' => 'What we think', 'url' => '#papers' ),
					array( 'label' => 'Archive', 'url' => '/archive/' ),
				),
			),
			array(
				'heading' => 'Legal',
				'links'   => array(
					array( 'label' => 'Legal notice', 'url' => '/legal/#legal-notice' ),
					array( 'label' => 'Privacy', 'url' => '/legal/#privacy' ),
					array( 'label' => 'Cookies', 'url' => '/legal/#cookies' ),
					array( 'label' => 'Regulatory disclosures', 'url' => '/legal/#regulatory' ),
				),
			),
		);
	}

	/**
	 * A bare #anchor has to become the front page's address plus the anchor on any other page,
	 * or it resolves against the wrong document and does nothing (spec/60).
	 */
	private function href( $url ) {
		$url = (string) $url;
		if ( '' === $url ) {
			return '#';
		}
		if ( '#' === $url[0] && ! is_front_page() ) {
			return trailingslashit( home_url( '/' ) ) . $url;
		}
		return $url;
	}

	private static function arrow() {
		return '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
			. 'stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">'
			. '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$email = sanitize_email( $s['email'] );
		?>
		<footer class="<?php echo esc_attr( $this->part_class( 'site-footer foot-ice' ) ); ?>" id="contact">
			<div class="wrap site-footer__grid">
				<div class="foot-left"<?php echo $this->reveal( 'settle' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<?php echo $this->heading( array( $s['heading_line'] ), $s['accent_line'], 'md' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<p class="foot-left__lead"><?php echo esc_html( $s['lead'] ); ?></p>
					<?php if ( $email ) : ?>
						<a class="foot-email" href="<?php echo esc_url( 'mailto:' . $email ); ?>"><?php
							echo esc_html( $email );
						?> <?php echo self::arrow(); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
					<?php endif; ?>
					<?php
					if ( ! empty( $s['form_template'] ) ) {
						echo \Elementor\Plugin::$instance->frontend->get_builder_content_for_display( (int) $s['form_template'] ); // phpcs:ignore WordPress.Security.EscapeOutput
					} elseif ( current_user_can( 'edit_posts' ) ) {
						printf(
							'<p class="foot-form__status">%s</p>',
							esc_html__( 'No form is chosen. Build an Elementor Pro Form as a saved template and pick it in this widget. Editors only see this line.', 'capiital-site' )
						);
					}
					?>
				</div>

				<div class="foot-cols">
					<?php foreach ( (array) $s['columns'] as $column ) : ?>
						<div class="foot-col">
							<div class="foot-col__heading"><?php echo esc_html( $column['heading'] ); ?></div>
							<div class="foot-col__links">
								<?php foreach ( (array) $column['links'] as $link ) : ?>
									<a href="<?php echo esc_url( $this->href( $link['url'] ) ); ?>"><?php
										echo esc_html( $link['label'] );
									?></a>
								<?php endforeach; ?>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>

			<div class="wrap site-footer__legal">
				<div><?php echo esc_html( $s['legal_1'] ); ?></div>
				<div><?php echo esc_html( $s['legal_2'] ); ?></div>
			</div>
		</footer>
		<?php
	}
}
