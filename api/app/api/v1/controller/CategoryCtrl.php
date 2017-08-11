<?php
namespace app\api\v1\controller;
use app\api\v1\model\Category;
use think\Request;

class CategoryCtrl extends Base
{
    public function model () {
        return new Category();
    }
    public function index($id=null)
    {
        $data = $this->model()->getCategory($id);
        return json($data);
    }

    public function edit(Request $request){
        $query  = $request->param();
        return json($this->model()->writeCategory($query));
    }

    public function delete($id=null){
        if(!$id) return json(['state'=> -1 , 'msg'=>'访问错误']);
        return json($this->model()->deleteCategory($id));
    }

}
