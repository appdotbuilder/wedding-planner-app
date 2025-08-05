<?php

use Symfony\Component\Finder\Finder;

arch()->preset()->php()->ignoring(['dd', 'dump']);

arch()->preset()->laravel();
arch()->preset()->relaxed();
arch()->preset()->security()->ignoring(['array_rand', 'parse_str', 'mt_rand', 'uniqid', 'sha1']);

arch('annotations')
    ->expect('App')
    ->toUseStrictEquality()
    ->toHavePropertiesDocumented()
    ->toHaveMethodsDocumented();

arch('no PhpUnit classes in src directories')
    ->expect(function () {
        $finder = Finder::create()
            ->in(['app'])
            ->files()
            ->name('*.php');

        $files = [];
        foreach ($finder as $file) {
            $content = file_get_contents($file->getRealPath());
            if (preg_match('/class\s+\w+\s+extends\s+PHPUnit/', $content)) {
                $files[] = $file->getRealPath();
            }
        }

        return $files;
    })
    ->toBeEmpty();
