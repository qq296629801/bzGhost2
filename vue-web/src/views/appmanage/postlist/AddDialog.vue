<template>
<el-dialog :append-to-body="true" :close-on-click-modal="false" class="add-dialog add-dialog-project" :title="addForm.title" :visible.sync="addForm.show" width="500px">
    <el-form ref="ruleForm" :model="addForm.form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
            <el-input clearable placeholder="请输入标题" v-model="addForm.form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="word">
            <el-input clearable placeholder="请输入内容" v-model="addForm.form.word"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addForm.show=false">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
    name: 'AddDialog',
    props: {
        addForm: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            file: '',
            rules: {
                title: [
                    {
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }
                ],
                word: [
                    {
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur'
                    }
                ],
            }
        }
    },
    methods: {
        handleSave () {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.$emit('save')
                } else {
                    return false
                }
            })
        },
        resetForm () {
            this.$refs['ruleForm'].resetFields()
        }
    }
}
</script>

<style lang="less">
.add-dialog-project {
    .el-input {
        width: 300px !important;
    }
    .el-textarea__inner {
        width: 300px !important;
    }
    .addGroupAvatar {
        .upload-warp {
            top: 0;
        }
    }
    .qunzhutx {
        width: 178px;
        height: 178px;
    }
}
</style>
