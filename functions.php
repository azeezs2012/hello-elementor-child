<?php

add_action( 'wp_enqueue_scripts', 'child_script' );

function child_script() {
    $parent_style = 'hello-elementor'; 
    
    wp_enqueue_style( 'child-theme-style',
        get_stylesheet_directory_uri() . '/assets/css/style.css',
        array( $parent_style ),
        '1.5'
    );

    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        '1.0'
    );

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );

    global $post;

    wp_enqueue_script(
        'child-common',
        get_stylesheet_directory_uri() . '/assets/js/script.js',
        array( 'jquery' ),'1.05',true
    );

    if($post && ($post->ID == 1166 || $post->ID == 2486)){
        wp_enqueue_script(
            'child-home',
            get_stylesheet_directory_uri() . '/assets/js/home.js',
            array( 'jquery' ),'1.87',true
        );
    }

    if($post && ($post->ID == 1099 || $post->ID == 2486)){
        wp_enqueue_script(
            'child-pricing',
            get_stylesheet_directory_uri() . '/assets/js/pricing.js',
            array( 'jquery' ),'1.0',true
        );
    }

    if($post && ($post->ID == 865 || $post->ID == 1674)){

        wp_enqueue_style( 'twenty-twenty-style',
            get_stylesheet_directory_uri() . '/assets/css/twenty-twenty.css'
        );

        wp_enqueue_style( 'player-style',
            get_stylesheet_directory_uri() . '/assets/css/plyr.css'
        );

        wp_enqueue_script(
            'child-plyr',
            get_stylesheet_directory_uri() . '/assets/js/plyr.js',
            array( 'jquery' ),'1.0',true
        );

        wp_enqueue_script(
            'child-twenty-twenty-js',
            get_stylesheet_directory_uri() . '/assets/js/jquery.twentytwenty.js',
            array( 'jquery' ),'1.0',true
        );

        wp_enqueue_script(
            'child-twenty-twenty-event-move-js',
            get_stylesheet_directory_uri() . '/assets/js/jquery.event.move.js',
            array( 'jquery' ),'1.0',true
        );

        wp_enqueue_script(
            'child-landing',
            get_stylesheet_directory_uri() . '/assets/js/landing.js',
            array( 'jquery' ),'1.1',true
        );

        wp_enqueue_script(
            'child-player',
            get_stylesheet_directory_uri() . '/assets/js/player.js',
            array( 'jquery' ),'1.0',true
        );
    }    
    
    /*wp_localize_script( 'child-js', 'ajax', array(
        'url' => admin_url( 'admin-ajax.php' )
    ) );*/
    wp_enqueue_style('child-font-awesome-css','https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
}

add_action('wp_ajax_send_stat_email','handle_send_stat_email');
add_action('wp_ajax_nopriv_send_stat_email','handle_send_stat_email');

function handle_send_stat_email(){
    /*$response['email'] = $_REQUEST['email'];

    if(!isset($response['email'])){
    wp_send_json_error("invalid email");
    }

    if(!is_email($response['email'])){
      wp_send_json_error('invalid email');
    }

    if(!isset($_REQUEST['preview_data'])){
      wp_send_json_error('invalid stats');
    }

    $preview_data = json_decode(stripslashes($_REQUEST['preview_data']));

    $body = file_get_contents( get_stylesheet_directory() .'/email/stat-email.php');
    $body = str_replace("%url%", $preview_data->url, $body);
    $body = str_replace("%reduction_size%", $preview_data->stats->reductionSize, $body);
    $body = str_replace("%reduction_percentage%", $preview_data->stats->reduction, $body);
    $body = str_replace("%before_bytes%", $preview_data->stats->beforeBytes, $body);
    $body = str_replace("%after_bytes%", $preview_data->stats->afterBytes, $body);

    $headers[] = 'Content-type: text/html; charset=utf-8';
    $response['sent'] = wp_mail('azeezs2012@gmail.com','Unused CSS Stats',$body,$headers);
    wp_send_json_success($response);*/
}

/*add_action('init', function (){
   var_dump( file_get_contents( get_stylesheet_directory() .'/email/stat-email.php'));
});*/

add_filter( 'woocommerce_add_to_cart_validation', 'remove_cart_item_before_add_to_cart', 20, 3 );
function remove_cart_item_before_add_to_cart( $passed, $product_id, $quantity ) {
    if( ! WC()->cart->is_empty() )
        WC()->cart->empty_cart();  
    return $passed;
}

add_filter( 'woocommerce_checkout_fields', 'wc_remove_checkout_fields' );

function wc_remove_checkout_fields( $fields ) {
    unset( $fields['billing']['billing_phone'] );
    unset( $fields['billing']['billing_state'] );
    unset( $fields['billing']['billing_address_1'] );
    unset( $fields['billing']['billing_address_2'] );
    unset( $fields['billing']['billing_city'] );
    unset( $fields['billing']['billing_postcode'] );
    unset($fields['order']['order_comments']);
    return $fields;
}

add_filter( 'woocommerce_checkout_fields', 'reorder_checkout_fields' );
 
function reorder_checkout_fields( $checkout_fields ) {
	$checkout_fields['billing']['billing_email']['priority'] = 4;
    $checkout_fields['billing']['billing_country']['priority'] = 25;
	return $checkout_fields;
}

remove_action( 'woocommerce_checkout_order_review', 'woocommerce_order_review', 10 );

add_filter( 'manage_edit-shop_order_columns', 'add_custom_column_to_orders_table' );
 
function add_custom_column_to_orders_table( $columns ) {
    $columns['affiliate'] = 'Affiliate';
    return $columns;
}
 
add_action( 'manage_shop_order_posts_custom_column', 'add_custom_column_content_to_orders_table' );
 
function add_custom_column_content_to_orders_table( $column ) {
   
    global $post;
 
    if ( 'affiliate' === $column ) {
 
        $order = wc_get_order( $post->ID );
        $affiliate = $order->get_meta('affiliate');
        if(!isset($affiliate) || empty($affiliate)){
            echo 'N/A';
        }else{
            echo $affiliate;
        }
    }
}

/*function flush_rules(){
    
    flush_rewrite_rules();
}

add_action('init','flush_rules');*/

add_action( 'wp_print_styles','deregister_styles', 100 );
function deregister_styles()    { 
    if(!is_user_logged_in()){
        wp_deregister_style( 'dashicons' ); 
    }
   
}

/*wp_enqueue_style( 'jquery-mobile', 'http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css' );
    
	wp_enqueue_script(
        'child-mobile-jquey-js',
        'http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js',
        array( 'jquery' ),'1.0',true
    );*/
