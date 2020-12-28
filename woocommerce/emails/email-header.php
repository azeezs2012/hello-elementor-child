<?php
/**
 * Email Header
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/email-header.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates\Emails
 * @version 4.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>" />
		<title><?php echo get_bloginfo( 'name', 'display' ); ?></title>
	</head>
	<body <?php echo is_rtl() ? 'rightmargin' : 'leftmargin'; ?>="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
    <style>
        #template_body{
            max-width: 800px;
            width: 100%;
        }
        #template_container{
            background-color: #f7f7f7;
            max-width: 800px;
            width: 100%;
        }
        #header_wrapper{
            padding: 20px 48px 30px;
        }
        #header_wrapper img{
            margin-right: 0;
        }
        #body_content{
            background-color: #f7f7f7;
        }
        #body_content_inner .main-info{
            padding: 20px 30px 20px 30px;
            background-color: #ffff;
            border: 2px solid #ecdfe9;
            border-radius: 5px;
        }
        #body_content_inner .main-info .logo{
            display: flex;
            justify-content: center;
            padding: 20px 10px 50px;
        }
        #body_content_inner .main-info .logo img{
            max-width: 200px;
            margin: 0 auto;
        }
        #body_content_inner p{
            font-size: 18px;
            line-height: 24px;
        }
        #body_content_inner .devider{
            width: 100%;
            display: block;
            background-color: #ecdfe9;
            height: 1px;
            margin-bottom: 30px;
            margin-top: 25px;
        }
        #body_content_inner .login-info{
            display: flex;
            align-items: center;
            margin-bottom: 25px;
        }
        #body_content_inner .login-info .login-action{
            justify-content: center;
            display: flex;
        }
        #body_content_inner .login-info .login-action a{
            background-color: #702ea0;
            text-decoration: none;
            height: 35px;
            align-items: center;
            border-radius: 5px;
            color: #ffffff;
            width: 127px;
            font-weight: 700;
            line-height: 35px;
            padding-left: 10px;
            padding-right: 10px;
            text-align: center;
        }
        #body_content_inner .main-info a.email{
            font-weight: 600;
            color: #702ea0;
        }
        #body_content_inner .password-content{
            color: #702ea0;
        }
        #body_content_inner .order-details
        {
            padding: 20px 0;
        }
        #body_content_inner .order-details h2{
            color : #636363;
            display: block;
            font-size: 18px;
            font-weight: bold;
            line-height: 130%;
            margin: 0 0 18px;
            text-align: left;
        }
        #body_content_inner .order-details table{
            color: #636363;
            border: 1px solid #e5e5e5;
            vertical-align: middle;
            width: 100%;
            font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
        }
        #body_content_inner .order-details table thead tr th{
            color: #636363;
            border: 1px solid #e5e5e5;
            vertical-align: middle;
            padding: 12px;
            text-align: left;
        }
        #body_content_inner .order-details table tbody tr.order_item td{
            color: #636363;
            border: 1px solid #e5e5e5;
            padding: 12px;
            text-align: left;
            vertical-align: middle;
            font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
        }
        #body_content_inner .order-details table tfoot tr th, #body_content_inner .order-details table tfoot tr td{
            color: #636363;
            border: 1px solid #e5e5e5;
            vertical-align: middle;
            padding: 12px;
        }
        #body_content_inner .order-details table tfoot tr th{
            text-align: left;
        }
        #body_content_inner .order-details table tfoot tr td{
            text-align: right;
        }
        @media (max-width:768px){
            #body_content_inner .login-info{
                flex-direction: column;
                align-items: baseline !important;
            }
            #body_content_inner .login-info .login-action{
                margin-top: 10px;
            }
        }
    </style>
		<div id="wrapper" dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
			<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
				<tr>
					<td align="center" valign="top">
						<table border="0" cellpadding="0" cellspacing="0" id="template_container">
							<tr>
								<td align="center" valign="top">
									<!-- Header -->
<!--									<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_header" style="background-color: #f7f7f7">-->
<!--										<tr>-->
<!--											<td id="header_wrapper">-->
<!--                                                <div style="max-width: 200px;margin: 0 auto">-->
<!--                                                    --><?php
//                                                    if ( $img = get_option( 'woocommerce_email_header_image' ) ) {
//                                                        echo '<img src="' . esc_url( $img ) . '" alt="' . get_bloginfo( 'name', 'display' ) . '" />';
//                                                    }
//                                                    ?>
<!--                                                </div>-->
<!--											</td>-->
<!--										</tr>-->
<!--									</table>-->
									<!-- End Header -->
								</td>
							</tr>
							<tr>
								<td align="center" valign="top">
									<!-- Body -->
									<table border="0" cellpadding="0" cellspacing="0" id="template_body">
										<tr>
											<td valign="top" id="body_content">
												<!-- Content -->
												<table border="0" cellpadding="20" cellspacing="0" width="100%">
													<tr>
														<td valign="top" style="padding: 5px">
															<div id="body_content_inner">
