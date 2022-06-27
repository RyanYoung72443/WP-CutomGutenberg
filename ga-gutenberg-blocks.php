<?php

/*
Plugin Name: Gourmet Artistry Gutenberg Blocks
Plugin URI:
Description: Adds Custom Gutenberg Blocks to site.
Version: 1.0
Author: Juan De la torre Valdez
License: GPL2
License: URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

// Prevent the execution
if(!defined('ABSPATH')) exit;

add_action( 'init', 'ga_register_gutenberg_blocks');
function ga_register_gutenberg_blocks() {
  // Check if gutenberg is enabled

  if(!function_exists('register_block_type')) {
    return;
  }

 wp_register_script(
   'ga-editor-script',
   plugins_url( 'build/index.js', __FILE__ ),
   array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
   filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
 );

 //Gutenberg Editor CSS
 wp_register_style( 
  'ga-editor-style',
  plugins_url( 'build/editor.css', __FILE__ ),
  array(),
  filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.css' )
 );
 
 //Gutenberg Block CSS
 wp_register_style( 
  'ga-block-styles',
  plugins_url( 'build/style.css', __FILE__ ),
  array(),
  filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' )
 );

 $blocks = array(
   'ga/testimonial',
   'ga/hero'
 );

 foreach($blocks as $block) {
   register_block_type( $block, array(
    'editor_script' => 'ga-editor-script',
    'editor_style' => 'ge-editor-style',
    'style' => 'ga-block-styles'
   ));
 }

}

add_filter( 'block_categories', 'ga_new_gutenberg_category', 10, 2 );
function ga_new_gutenberg_category( $categories, $post ) {
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'gourmet-artist',
        'title' => 'Gourmet Artist',
        'icon' => 'awards'
      ),
    )
  );
}