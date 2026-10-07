<?php
/**
 * Capiital · Archive
 *
 * The widget writes the shell and a JSON island of every publication; assets/js/archive.js
 * draws the filters, the order menu, the cards and the reading panel from it.
 *
 * That division is deliberate. The static archive at the repository root and this widget feed
 * the same renderer from different data, so there is one archive implementation rather than
 * two that drift — and the reading panel's focus trap, its address and its behaviour are
 * written once.
 *
 * Only the heading and the standfirst are fields. The filters, the order, the grid and the
 * panel are not editable, and nothing about a card is styled per entry: a publication the firm
 * adds appears with the formatting and the behaviour already on it.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Widget_Archive extends Capiital_Widget_Base {

	public function get_name() {
		return 'capiital-archive';
	}

	public function get_title() {
		return __( 'Capiital · Archive', 'capiital-site' );
	}

	protected function register_controls() {
		$this->start_controls_section( 'head', array( 'label' => __( 'Heading', 'capiital-site' ) ) );
		$this->add_control( 'heading_line', array(
			'label'       => __( 'Heading', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'What we think,',
			'label_block' => true,
		) );
		$this->add_control( 'accent_line', array(
			'label'       => __( 'Accent line', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'in full.',
			'label_block' => true,
		) );
		$this->add_control( 'standfirst', array(
			'label'   => __( 'Standfirst', 'capiital-site' ),
			'type'    => \Elementor\Controls_Manager::TEXTAREA,
			'rows'    => 3,
			'default' => 'Every letter, note and review the house has published, arranged by type, sector, stage of engagement and year.',
		) );
		$this->end_controls_section();
	}

	/**
	 * The Danish names of the filter values.
	 *
	 * A filter matches on the English value in both languages — that is the reference's
	 * arrangement and WPML keeps it, so an entry filtered on /da/ answers to the same term as
	 * on /. Only the label shown is translated, and these are the fourteen it needs.
	 */
	private function terms() {
		return array(
			'Sector note'              => 'Sektornotat',
			'Quarterly review'         => 'Kvartalsgennemgang',
			"Owner's letter"           => 'Ejerbrev',
			'Market letter'            => 'Markedsbrev',
			'Chemicals'                => 'Kemi',
			'Across sectors'           => 'Tværgående',
			'Sponsor-backed services'  => 'Kapitalfondsejet service',
			'Industrial manufacturing' => 'Industriel produktion',
			'Energy'                   => 'Energi',
			'Life sciences'            => 'Life science',
			'Before a transaction'     => 'Før en transaktion',
			'After a transaction'      => 'Efter en transaktion',
			'During ownership'         => 'Under ejerskabet',
			'Before exit'              => 'Før exit',
		);
	}

	protected function render() {
		$s       = $this->get_settings_for_display();
		$posts   = Capiital_Publications::all();
		$entries = array_map( array( 'Capiital_Publications', 'to_entry' ), $posts );

		Capiital_Assets::archive_is_on_page();
		?>
		<div class="<?php echo esc_attr( $this->part_class() ); ?>" data-archive>
			<div class="wrap">
				<div class="page-intro"<?php echo $this->reveal( 'veil' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
					<div><?php echo $this->heading( array( $s['heading_line'] ), $s['accent_line'], 'md' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
					<p class="page-intro__sub"><?php echo esc_html( $s['standfirst'] ); ?></p>
				</div>

				<div class="arc-wrap">
					<div class="arc-bar" role="group" aria-label="<?php echo esc_attr( $this->t( 'Filter and order the archive', 'Filtrér og sortér arkivet' ) ); ?>">
						<div class="arc-menus" data-arc-menus></div>
						<div data-arc-order></div>
					</div>
					<div class="arc-line">
						<span aria-live="polite" data-arc-count></span>
						<button type="button" class="arc-toggle" data-arc-clear hidden><?php
							echo esc_html( $this->t( 'Clear filters', 'Ryd filtre' ) );
						?></button>
					</div>
				</div>

				<div class="arc-grid" data-arc-grid></div>
				<div class="arc-empty" data-arc-empty hidden><?php
					echo esc_html( $this->t(
						'No publication answers to every filter chosen.',
						'Ingen publikation svarer til alle de valgte filtre.'
					) );
				?></div>

				<?php if ( ! $entries && current_user_can( 'edit_posts' ) ) : ?>
					<p class="arc-empty"><?php
						echo esc_html__( 'There are no published publications yet, so the archive is empty. Add them under Publications, or import the twelve placeholders from Publications → Placeholder entries. This notice is shown to editors only.', 'capiital-site' );
					?></p>
				<?php endif; ?>
			</div>
		</div>
		<script type="application/json" id="arc-data"><?php
			/* Not escaped with esc_html: this is a JSON island, not markup. The flags below
			   close the one hole that matters — a title containing </script> would otherwise
			   end the element early — and HEX_AMP keeps WPML's and Yoast's filters from
			   finding entities to rewrite. */
			echo wp_json_encode(
				array(
					'terms'        => $this->terms(),
					'publications' => $entries,
				),
				JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP
			);
		?></script>
		<?php
	}
}
