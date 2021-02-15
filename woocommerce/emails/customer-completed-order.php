<?php
/**
 * Customer completed order email
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/customer-completed-order.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates\Emails
 * @version 3.7.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
 * @hooked WC_Emails::email_header() Output the email header
 */
do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

<style>

</style>

<?php /* translators: %s: Customer first name */ ?>
<div class="main-info">
    <div class="logo">
        <?php
        if ( $img = get_option( 'woocommerce_email_header_image' ) ) {
            echo '<img src="' . esc_url( $img ) . '" alt="' . get_bloginfo( 'name', 'display' ) . '" />';
        }
        ?>
    </div>
    <p><strong>Hello, <?php echo $order->get_billing_first_name() ?></strong></p>
    <p style="margin-bottom: 30px;">
        Congratulations on your new account and welcome to the <br>
        RapidLoad family!
    </p>

    <p style="margin-bottom: 30px;">You now have access to the plugin.</p>

    <p>
        Your Username (the email you used) <br>
        <strong><a class="email" href="mailto:<?php echo $order->get_billing_email() ?>"><?php echo $order->get_billing_email() ?></a></strong>
    </p>

    <div class="devider">
    </div>

    <div class="login-info">
        <div class="password-info" style="width: 80%;display: block;">
            <p style="margin-bottom: 5px;">
                Your password has been automatically generated:
            </p>
            <p style="margin-bottom: 0;">
                <strong><span class="password-content">
        <?php
        $order = wc_get_order($order->get_id());
        echo $order->get_meta('password');
        ?></span></strong>
            </p>
        </div>
        <div class="login-action">
            <a href="https://app.unusedcss.io/auth/sign-in" target="_blank">Login</a>
        </div>
    </div>

    <div class="order-details">
        <h2>
            Subscription Details - [Order #<?php echo $order->get_id() ?>] (<?php echo $order->get_date_completed()->format('F j, Y') ?>)</h2>
        <table class="td" cellspacing="0" cellpadding="6" border="1">
            <thead>
            <tr>
                <th class="td" scope="col" >Order</th>
                <th class="td" scope="col" >Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr class="order_item">
                <td class="td" style="word-wrap: break-word;">
                    RapidLoad <?php echo $order->get_meta('plan_nickname') ?> - <?php echo get_woocommerce_currency_symbol() . number_format(($order->get_meta('plan_amount') / 100),2,'.',',') ?>/<?php echo $order->get_meta('plan_interval') ?><br>
                    <?php echo $order->get_meta('plan_quota') ?> Sites
                </td>
                <td class="td" style="text-align:right;">
                    <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol"><?php echo get_woocommerce_currency_symbol() ?></span><?php echo number_format(($order->get_meta('plan_amount') / 100),2,'.',',') ?></span>		</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <th class="td" scope="row" >Discount</th>
                <td class="td" >
                    <?php
                    $discounts = $order->get_meta('latest_invoice_total_discount_amounts');
                    if(isset($discounts) && !empty($discounts)){
                        echo get_woocommerce_currency_symbol() . number_format(($discounts[0]->amount / 100),2,'.',',');
                    }else{
                        echo get_woocommerce_currency_symbol() . "0.00";
                    }
                    ?>
                </td>
            </tr>
            <tr>
                <th class="td" scope="row" >Total</th>
                <td class="td" ><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol"><?php echo get_woocommerce_currency_symbol() ?></span><?php echo number_format(($order->get_meta('latest_invoice_total')/100),2,'.',',') ?></span></td>
            </tr>
            </tfoot>
        </table>
    </div>
</div>


<?php

/*
 * @hooked WC_Emails::order_details() Shows the order details table.
 * @hooked WC_Structured_Data::generate_order_data() Generates structured data.
 * @hooked WC_Structured_Data::output_structured_data() Outputs structured data.
 * @since 2.5.0
 */
//do_action( 'woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email );

/*
 * @hooked WC_Emails::order_meta() Shows order meta data.
 */
do_action( 'woocommerce_email_order_meta', $order, $sent_to_admin, $plain_text, $email );

/*
 * @hooked WC_Emails::customer_details() Shows customer details
 * @hooked WC_Emails::email_address() Shows email address
 */
//do_action( 'woocommerce_email_customer_details', $order, $sent_to_admin, $plain_text, $email );

/*
 * @hooked WC_Emails::email_footer() Output the email footer
 */
//do_action( 'woocommerce_email_footer', $email );
