<template>
    <div class="full">
        <h1>分类目录 </h1>
        <div class="search">
            <div class="handle">
                <router-link to="/category/edit">
                    <el-button type="primary">新建分类</el-button>
                </router-link>
            </div>

            <span class="input">
                <el-input
                        placeholder="请输入分类名"
                        icon="search"
                        v-model="keywords"
                        >
                </el-input>
            </span>
        </div>

        <div class="">
            <table class="am-table">
                <tr>
                    <th class="user" width="50%">名称</th>
                    <th class="hash">统计</th>
                    <th class="text">排序</th>
                    <th class="status icon-col">操作</th>
                </tr>
                <template  v-for="it in data2">
                    <tr>
                        <td class="user" @click="toggle(it)" :data-toggle="true"><span :class="{'icon-sanjiao3': it.son,'icon-sanjiao1': it.show }" ></span>{{it.name}}</td>
                        <td class="hash">{{it.is_nav}}</td>
                        <td class="text">{{it.sort}}</td>
                        <td class="status icon-col">
                            <router-link :to="{path: '/category/edit', query : { id: it.id }}">编辑</router-link>
                            <a href="javascript:;"  @click="deleteCategory(it)">删除</a>
                        </td>
                    </tr>
                    <template  v-for="item in it.son" v-if="it.show">
                        <tr class="son">
                            <td class="user" @click="toggle(item)" ><span :class="{'icon-sanjiao1': item.son}"></span>{{item.name}}</td>
                            <td class="hash">{{item.is_nav}}</td>
                            <td class="text">{{item.sort}}</td>
                            <td class="status icon-col">
                                <router-link :to="{path: '/category/edit', query : { id: item.id }}">编辑</router-link>
                                <a href="javascript:;"  @click="deleteCategory(item)">删除</a>
                            </td>
                        </tr>
                        <template v-for="last in item.son" v-if="item.show">
                            <tr class="sun">
                                <td class="user">{{last.name}}</td>
                                <td class="hash">{{last.is_nav}}</td>
                                <td class="text">{{last.sort}}</td>
                                <td class="status icon-col">
                                    <router-link :to="{path: '/category/edit', query : { id: last.id }}">编辑</router-link>
                                    <a href="javascript:;" @click="deleteCategory(last)">删除</a>
                                </td>
                            </tr>
                        </template>
                    </template>
                </template>
            </table>
        </div>
    </div>

</template>

<script>
    import Util from '../../utils/index';
    export default {
        data() {
            return {
                data : "",
                keywords: "",
            };
        },
        computed : {
            data2 () {
                if(Array.isArray(this.data)){
                    if(!this.keywords.trim()) return Util.toTree(this.data);
                    return Util.toTree(this.data.filter( item =>{
                        return item.name.indexOf(this.keywords.trim()) !== -1;
                    }),'pid','parent_id');
                }
                return this.data;
            }
        },

        mounted () {
            this.api.category().then((res)=>{
                this.data = res.data;
            })
        },
        methods: {
            toggle(item) {
                if(item.show){
                    item.show = !item.show;
                    return ;
                }
                this.$set(item,'show',true);
            },
            deleteCategory(item) {
                this.confirmDelete(item);
            },
            confirmDelete(item) {
                let index = this.data.indexOf(item);
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._delete_http(item).then(res=>{
                        this.$message({
                            type: 'success',
                            message: res
                        });
                        this.data.splice(index,1)
                    },
                    res=>{
                        this.$message.error(res);
                    })
                }).catch(() => {
                });
            },
            _delete_http (item) {
                let id = item.id;
                let p  = new Promise((resolve,reject)=>{
                    this.api.categoryDelete(id).then(res =>{
                        if(res.data.state===1){
                            resolve(res.data.msg);
                            return ;
                        }
                        reject(res.data.msg);
                    }).catch(()=>{
                        reject('网络请求错误');
                    })
                })
                return p;
            }
        },

    };
</script>