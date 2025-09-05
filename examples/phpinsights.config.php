<?php

/**
 * PHP Insights Configuration Example
 * 
 * This is an example configuration file for PHP Insights that can be used
 * with the MCP server. Copy this file to your project root as 'phpinsights.php'
 * or use it as a reference for creating your own configuration.
 */

return [
    /*
    |--------------------------------------------------------------------------
    | Preset
    |--------------------------------------------------------------------------
    |
    | This preset is used by PHP Insights to determine which rules to use.
    | Available presets: laravel, symfony, magento2, drupal, default
    |
    */
    'preset' => 'laravel',

    /*
    |--------------------------------------------------------------------------
    | IDE
    |--------------------------------------------------------------------------
    |
    | This options allow to add hyperlinks in your terminal to quickly open
    | files in your favorite IDE using browser-refactoring-toolkit.
    |
    */
    'ide' => 'vscode',

    /*
    |--------------------------------------------------------------------------
    | Exclude
    |--------------------------------------------------------------------------
    |
    | Here you may specify which files and directories should be excluded
    | from the analysis.
    |
    */
    'exclude' => [
        'vendor',
        'storage',
        'bootstrap/cache',
        'node_modules',
        'public/build',
        'public/hot',
        'public/storage',
        'tests',
        'database/migrations',
        'database/seeders',
    ],

    /*
    |--------------------------------------------------------------------------
    | Add
    |--------------------------------------------------------------------------
    |
    | Here you may add additional rules to be applied to your project.
    | You can add custom rules or override existing ones.
    |
    */
    'add' => [
        // Add custom rules here
        // Example: \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenNormalClasses::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Remove
    |--------------------------------------------------------------------------
    |
    | Here you may remove rules that you don't want to be applied to your
    | project.
    |
    */
    'remove' => [
        // Remove rules that are too strict for your project
        // Example: \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenNormalClasses::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Config
    |--------------------------------------------------------------------------
    |
    | Here you may configure specific rules for your project.
    |
    */
    'config' => [
        // Configure specific rules
        \NunoMaduro\PhpInsights\Domain\Insights\CyclomaticComplexityIsHigh::class => [
            'maxComplexity' => 10,
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenGlobals::class => [
            'ignore' => ['$argv', '$argc'],
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenNormalClasses::class => [
            'ignore' => [
                'App\\Models\\User',
                'App\\Models\\Post',
            ],
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenTraits::class => [
            'ignore' => [
                'Illuminate\\Database\\Eloquent\\SoftDeletes',
            ],
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenPublicMethods::class => [
            'ignore' => [
                '__construct',
                '__invoke',
                '__call',
                '__callStatic',
            ],
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenPublicProperties::class => [
            'ignore' => [
                'App\\Models\\User::$fillable',
                'App\\Models\\User::$hidden',
                'App\\Models\\User::$casts',
            ],
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenStaticMethods::class => [
            'ignore' => [
                'App\\Models\\User::factory',
                'App\\Models\\User::create',
                'App\\Models\\User::make',
            ],
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenPrivateMethods::class => [
            'ignore' => [
                '__construct',
                '__invoke',
                '__call',
                '__callStatic',
            ],
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenPrivateProperties::class => [
            'ignore' => [
                'App\\Models\\User::$fillable',
                'App\\Models\\User::$hidden',
                'App\\Models\\User::$casts',
            ],
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenProtectedMethods::class => [
            'ignore' => [
                '__construct',
                '__invoke',
                '__call',
                '__callStatic',
            ],
        ],
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenProtectedProperties::class => [
            'ignore' => [
                'App\\Models\\User::$fillable',
                'App\\Models\\User::$hidden',
                'App\\Models\\User::$casts',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Requirements
    |--------------------------------------------------------------------------
    |
    | Here you may specify which requirements should be met for your project.
    |
    */
    'requirements' => [
        'min-quality' => 80,
        'min-complexity' => 80,
        'min-architecture' => 80,
        'min-style' => 80,
    ],
];
