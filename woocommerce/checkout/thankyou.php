<?php
/**
 * Thankyou page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/thankyou.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.7.0
 */

defined( 'ABSPATH' ) || exit;
?>

<div class="woocommerce-order">

	<?php
	if ( $order ) :

		do_action( 'woocommerce_before_thankyou', $order->get_id() );
		?>

		<?php if ( $order->has_status( 'failed' ) ) : ?>

			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed"><?php esc_html_e( 'Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woocommerce' ); ?></p>

			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed-actions">
				<a href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>" class="button pay"><?php esc_html_e( 'Pay', 'woocommerce' ); ?></a>
				<?php if ( is_user_logged_in() ) : ?>
					<a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>" class="button pay"><?php esc_html_e( 'My account', 'woocommerce' ); ?></a>
				<?php endif; ?>
			</p>

		<?php else : ?>

			<div class="thankyou-section-1">
                <div class="image-content">
                    <img src="/wp-content/uploads/2020/11/raising-hands-min.png" alt="">
                </div>
                <div class="instructions-content">
                    <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">
                        <?php
                        echo apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Your order was completed successfully', 'woocommerce' ), $order ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                        ?>
                    </p>
                    <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-message">
                        Thank you <?php echo $order->get_billing_last_name() ?> for buying RapidLoad to speed up our website!
                    </p>

                    <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-instructions">
                        Be sure to place <strong><a class="support-email" href="mailto:support@rapidload.io">support@rapidload.io</a></strong> on your approved senders
                        list to prevent emails from going into spam <strong><a class="address-card-action" href="">Add us to you address book (vCard)</a></strong>
                    </p>
                </div>
            </div>

            <div class="devider">

            </div>

            <div class="thankyou-section-2">
                <div class="image-content">
                    <img src="/wp-content/uploads/2020/11/envilope-min.png" alt="">
                </div>
                <div class="instructions-content">
                    <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-info-1">
                        <span class="text"><strong>Check your email to get your login info we sent to:</strong></span> <span class="value">
                            <a href="mailto:<?php echo $order->get_billing_email() ?>"><?php echo $order->get_billing_email() ?></a></span>
                    </p>

                    <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-info-2">
                        If this is not the right email, create a ticket on our <a class="support-email" href="https://rapidload.zendesk.com/hc/en-us/requests/new">support channel.</a>
                    </p>
                </div>
            </div>
            <div class="thankyou-section-3">
                <div class="download">
                    <a class="elementor-button elementor-size-md elementor-animation-float download-btn" href="https://wordpress.org/plugins/unusedcss/">DOWNLOAD RAPIDLOAD</a>
                </div>
                <div class="download-info">
                    <div class="info-img">
                        <img src="/wp-content/uploads/2020/11/info.svg" alt="">
                    </div>
                    <div class="info-text">
                        <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-info-1">
                            <strong>Need help to install a WordPress plugin?</strong>
                        </p>
                        <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-info-2">Check our documentation
                            <a class="support-email" href="https://rapidload.zendesk.com/hc/en-us/articles/1500000363341-Installation-Requirements">Installing RapidLoad</a>
                        </p>
                    </div>
                </div>
            </div>

        <?php endif; ?>

	<?php else : ?>
    
		<p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received"><?php echo apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woocommerce' ), null ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>

	<?php endif; ?>

</div>