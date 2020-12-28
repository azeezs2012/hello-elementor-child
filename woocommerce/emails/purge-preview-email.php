<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_email_header', $email_heading, $email ); 
?>

<div class="main-info">
    <div class="logo">
        <?php
        if ( $img = get_option( 'woocommerce_email_header_image' ) ) {
            echo '<img src="' . esc_url( $img ) . '" alt="' . get_bloginfo( 'name', 'display' ) . '" />';
        }
        ?>
    </div>
    <table>
        <tbody>
            <tr>
                <td>
                    Url
                </td>
                <td>
                <?php echo $preview_data->url ?>
                </td>
            </tr>
            <tr>
                <td>
                    Reduction Size
                </td>
                <td>
                    <?php echo $preview_data->stats->reductionSize ?>
                </td>
            </tr>
            <tr>
                <td>
                    Reduction %
                </td>
                <td>
                    <?php echo $preview_data->stats->reduction ?>
                </td>
            </tr>
            <tr>
                <td>
                    Before Bytes
                </td>
                <td>
                <?php echo $preview_data->stats->beforeBytes ?>
                </td>
            </tr>
            <tr>
                <td>
                    After Bytes
                </td>
                <td>
                    <?php echo $preview_data->stats->afterBytes ?>
                </td>
            </tr>
        </tbody>
    </table>
</div>

