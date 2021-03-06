<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    '__pattern__' => [
        'name' => '\w+',
    ],

    '[v1/category]' => [
        'edit'        => ['app\api\v1\controller\CategoryCtrl@edit',  ['method' => 'post']],
        'delete'     => ['app\api\v1\controller\CategoryCtrl@delete', ['method' => 'post']],
        'getdata'     => ['app\api\v1\controller\CategoryCtrl@index', ['method' => 'get']],
    ]

];
