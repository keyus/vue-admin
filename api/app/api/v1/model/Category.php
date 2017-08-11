<?php
namespace app\api\v1\model;
use think\Db;

class Category
{
    public function getCategory($id)
    {
        if($id){
            $data = Db::name('category')
                ->alias('a')
                ->field('a.id,a.name,a.pid,a.sort,b.name as pname')
                ->join('category b','a.pid = b.id', 'left')
                ->find($id);
            return $data;
        }
        $data = Db::name('category')->field('id,name,pid,sort')->select();
        return $data;
    }

    //编辑分类
    public function writeCategory($query) {
        if(is_numeric($query['id'])){
            Db::name('category')->where('id',$query['id'])->update($query);
            return ['state'=>1,'msg'=> '分类名:' .$query['name'].'修改成功!'];
        }
        unset($query['id']);
        Db::name('category')->insert($query);
        return ['state'=>1,'msg'=> '分类名:' .$query['name'].'添加成功!'];
    }

    //删除分类
    public  function deleteCategory($id){
        $son = Db::name('category')->where('pid',$id)->find();
        if($son){
            return ['state'=>-1,'msg'=>'继续操作,请删除该分类下所有子分类'];
        }
        Db::name('category')->delete($id);
        return ['state'=>1,'msg'=>'分类删除成功!'];
    }
}
