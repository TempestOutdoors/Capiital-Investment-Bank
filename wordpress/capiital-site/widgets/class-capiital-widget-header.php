<?php
/**
 * Capiital · Header
 *
 * Custom because of what it carries rather than what it says: the Logo Border's cross-fade,
 * the reading line that marks the live section, the fold into Menu at 1300px, the EN · DK
 * switch and the read-progress rule. There is nothing here for an editor to type — the six
 * links come from the `primary` menu so WPML can translate their labels, and the languages
 * come from WPML itself.
 *
 * Goes in a Theme Builder header template, displayed on the entire site.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Widget_Header extends Capiital_Widget_Base {

	public function get_name() {
		return 'capiital-header';
	}

	public function get_title() {
		return __( 'Capiital · Header', 'capiital-site' );
	}

	/** The design's own six, in order, used until a `primary` menu is assigned. */
	private function fallback_links() {
		return array(
			array( 'label' => $this->t( 'Where we engage', 'Hvor vi rådgiver' ), 'id' => 'services' ),
			array( 'label' => $this->t( 'What we learned', 'Hvad vi har lært' ), 'id' => 'learned' ),
			array( 'label' => 'Cases', 'id' => 'cases' ),
			array( 'label' => $this->t( 'Who we are', 'Hvem vi er' ), 'id' => 'people' ),
			array( 'label' => $this->t( 'What we think', 'Hvad vi mener' ), 'id' => 'papers' ),
			array( 'label' => $this->t( 'How to reach us', 'Kontakt' ), 'id' => 'contact' ),
		);
	}

	/**
	 * The six links, from the menu where there is one.
	 *
	 * An anchor on the front page has to be written as a bare #id while the reader is on the
	 * front page, and as the front page's address plus the anchor anywhere else — spec/60. A
	 * bare #services on the archive would resolve against the archive and do nothing.
	 */
	private function links() {
		$front = is_front_page();
		$home  = trailingslashit( home_url( '/' ) );
		$items = array();

		$locations = get_nav_menu_locations();
		if ( ! empty( $locations['primary'] ) ) {
			$menu = wp_get_nav_menu_items( $locations['primary'] );
			if ( $menu ) {
				foreach ( $menu as $item ) {
					$url  = (string) $item->url;
					$hash = strpos( $url, '#' );
					$id   = false !== $hash ? substr( $url, $hash + 1 ) : '';
					$items[] = array( 'label' => $item->title, 'id' => $id, 'url' => $url );
				}
			}
		}
		if ( ! $items ) {
			$items = $this->fallback_links();
		}

		foreach ( $items as &$item ) {
			if ( ! empty( $item['id'] ) ) {
				$item['href'] = $front ? '#' . $item['id'] : $home . '#' . $item['id'];
			} else {
				$item['href'] = isset( $item['url'] ) ? $item['url'] : '#';
			}
		}
		return $items;
	}

	/**
	 * EN · DK, rendered here rather than by WPML's own switcher, because spec/01 fixes its
	 * appearance and its behaviour: the current language in navy with a hairline beneath, the
	 * separator at half opacity and hidden from screen readers, and the hash carried across so
	 * the reader returns to the same section. The visible label is DK; the language code stays
	 * `da` in the markup, the URL and hreflang.
	 */
	private function languages() {
		$out = array();
		if ( function_exists( 'icl_get_languages' ) ) {
			$languages = icl_get_languages( 'skip_missing=0&orderby=custom' );
			foreach ( (array) $languages as $code => $language ) {
				$code  = substr( (string) $code, 0, 2 );
				$out[] = array(
					'code'    => $code,
					'label'   => 'da' === $code ? 'DK' : strtoupper( $code ),
					'name'    => $language['native_name'] ?? strtoupper( $code ),
					'url'     => $language['url'] ?? '#',
					'current' => ! empty( $language['active'] ),
				);
			}
		}
		if ( ! $out ) {
			/* WPML absent: the switch still shows, so the header does not change shape when it
			   is installed, and English is simply the only language offered. */
			$out[] = array( 'code' => 'en', 'label' => 'EN', 'name' => 'English', 'url' => home_url( '/' ), 'current' => true );
		}
		return $out;
	}

	private function lang_switch( $class ) {
		$html = '<div class="lang ' . esc_attr( $class ) . '" role="group" aria-label="'
			. esc_attr( $this->t( 'Language', 'Sprog' ) ) . '">';
		$first = true;
		foreach ( $this->languages() as $language ) {
			if ( ! $first ) {
				$html .= '<span class="lang__dot" aria-hidden="true">&middot;</span>';
			}
			$first = false;
			$html .= sprintf(
				'<a class="lang__code%s" href="%s" lang="%s" aria-label="%s"%s>%s</a>',
				$language['current'] ? ' is-current' : '',
				esc_url( $language['url'] ),
				esc_attr( $language['code'] ),
				esc_attr( $language['name'] ),
				$language['current'] ? ' aria-current="true"' : '',
				esc_html( $language['label'] )
			);
		}
		return $html . '</div>';
	}

	private static function icon_menu() {
		return '<svg class="site-menu-btn__icon" data-menu-icon aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" '
			. 'fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">'
			. '<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>';
	}

	protected function render() {
		$links = $this->links();
		$home  = is_front_page() ? '#top' : trailingslashit( home_url( '/' ) ) . '#top';
		?>
		<header class="site-header capiital-part" data-scrolled="false">
			<div class="site-progress" aria-hidden="true"><span class="site-progress__bar" data-progress></span></div>
			<div class="site-header__inner">
				<a class="logo-border" href="<?php echo esc_url( $home ); ?>" aria-label="Capiital">
					<span class="logo-border__strip" aria-hidden="true"></span>
					<span class="logo-border__shape" aria-hidden="true"></span>
					<span class="logo-border__mark" aria-hidden="true"></span>
				</a>
				<nav class="site-nav" aria-label="<?php echo esc_attr( $this->t( 'Sections', 'Afsnit' ) ); ?>">
					<?php foreach ( $links as $link ) : ?>
						<a href="<?php echo esc_url( $link['href'] ); ?>"><?php
							echo esc_html( $link['label'] );
						?><span class="site-nav__rule" aria-hidden="true"></span></a>
					<?php endforeach; ?>
				</nav>
				<div class="site-header__right">
					<?php echo $this->lang_switch( 'lang--bar' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<button class="site-menu-btn" type="button" aria-expanded="false" aria-controls="site-menu">
						<span class="site-menu-btn__label" data-menu-label>Menu</span>
						<?php echo self::icon_menu(); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</button>
				</div>
			</div>
			<nav class="site-menu" id="site-menu" aria-label="<?php echo esc_attr( $this->t( 'Sections', 'Afsnit' ) ); ?>">
				<?php foreach ( $links as $link ) : ?>
					<a href="<?php echo esc_url( $link['href'] ); ?>"><?php echo esc_html( $link['label'] ); ?></a>
				<?php endforeach; ?>
				<?php echo $this->lang_switch( 'lang--menu' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</nav>
		</header>
		<?php
	}
}
