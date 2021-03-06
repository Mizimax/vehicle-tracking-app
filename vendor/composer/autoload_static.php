<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit26dfda2c6d394e23a10e8d26694a13d2
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit26dfda2c6d394e23a10e8d26694a13d2::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit26dfda2c6d394e23a10e8d26694a13d2::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
