<template>

    <div class="full">
        <h1 v-if="id">分类编辑</h1>
        <h1 v-else>新建分类</h1>

        <div class="am-form cateform w5">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="分类名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="归属">
                    <el-select v-model="form.pname" placeholder="顶级分类">
                        <el-option label="顶级分类" value="0" ></el-option>
                        <template v-for="it in allot" >
                            <el-option
                                        :key="it.value"
                                        :label="it.name"
                                        :value="it.name"
                            ></el-option>
                            <template v-for="item in it.son">
                                <el-option :key="item.value"
                                           :label="item.name"
                                           :value="item.name"
                                ></el-option>
                                <template v-for="last in item.son">
                                    <el-option :key="last.value"
                                               :label="last.name"
                                               :value="last.name"
                                    ></el-option>
                                </template>
                            </template>
                        </template>
                    </el-select>
                </el-form-item>


                <el-form-item label="排序">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()" v-if="id">修改</el-button>
                    <el-button type="primary" @click="onSubmit()" v-else>保存</el-button>
                    <el-button @click="Back()">取消</el-button>
                </el-form-item>

            </el-form>

        </div>

    </div>

</template>

<style lang="scss">
    .cateform {
        padding-top: 3rem;
        .el-input {
            width: 360px;
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                id : this.$route.query.id,
                tiptext: '分类添加成功!',
                allot : "",
                form: {
                    id : '',
                    pid: '',
                    name: '',
                    pname: '',
                    sort: '50'
                }
            }
        },
        watch : {
            pname (val) {
                if( !Array.isArray( this.allot ) ) return ;
                let find = this.allot.find( item=> item.name === val )
                if( find && find.id ){
                    if( find.id == this.id ) return ;
                    this.form.pid = find.id;
                }
                if( val==0 ) {
                    this.form.pid = 0;
                }
            }
        },

        computed : {
            pname () {
                return this.form.pname;
            }
        },

        mounted () {
            let id = this.id;
            if(id){
                this.api.category(id).then((res)=>{
                    this.form = res.data;
                })
                this.tiptext = '分为修改成功'
            }
            this.api.category().then((res)=>{
                this.allot = res.data;
            });
        },

        methods: {
            onSubmit() {
                let data = Object.assign({},this.form);
                delete data.pname;
                this.api.categoryEdit(data).then(res=>{
                    if(res.data.state === 1){
                        this.$notify({
                            title: this.tiptext,
                            message: res.data.msg,
                            type: 'success'
                        });
                    }
                })
            },
            Back(){
                this.$router.back()
            }
        }
    }
</script>