<?php
/**
 * Plugin Name: PrayerZone Widget Example
 * Description: Adds a versioned PrayerZone prayer-times widget shortcode.
 * Version: 1.0.0
 * License: MIT
 */

if (!defined('ABSPATH')) {
    exit;
}

function prayerzone_example_shortcode($attributes)
{
    $attributes = shortcode_atts(
        [
            'city' => 'paris',
            'lang' => 'en',
            'theme' => 'auto',
            'qibla' => 'true',
        ],
        $attributes,
        'prayerzone'
    );

    $city = sanitize_title($attributes['city']);
    $lang = in_array($attributes['lang'], ['de', 'en', 'es', 'fr'], true)
        ? $attributes['lang']
        : 'en';
    $theme = in_array($attributes['theme'], ['auto', 'light', 'dark'], true)
        ? $attributes['theme']
        : 'auto';
    $showQibla = filter_var($attributes['qibla'], FILTER_VALIDATE_BOOLEAN);

    $widget = sprintf(
        '<prayer-zone-widget city="%s" lang="%s" theme="%s"%s></prayer-zone-widget>',
        esc_attr($city),
        esc_attr($lang),
        esc_attr($theme),
        $showQibla ? ' show-qibla' : ''
    );

    static $moduleAdded = false;
    if (!$moduleAdded) {
        $widget .= '<script type="module" src="' .
            esc_url('https://cdn.jsdelivr.net/gh/PrayerZone/prayer-times-widget@v2.0.1/src/prayer-zone-widget.js') .
            '"></script>';
        $moduleAdded = true;
    }

    return $widget;
}

add_shortcode('prayerzone', 'prayerzone_example_shortcode');
