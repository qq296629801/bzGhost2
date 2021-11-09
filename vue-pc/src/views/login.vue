<template>
  <div class="login">
    <Top></Top>

    <div class="login-panel" style="-webkit-app-region: no-drag">
      <Alert v-if="showErr" type="error">{{ err }}</Alert>
      <div v-show="!showRegister" class="login-form">
        <div class="login-form-left">
          <img class="my-logo" src="../static/ll.png" alt="" />
        </div>
        <div class="login-form-right">
          <div class="title">账号密码登录</div>
          <div class="item">
            <Input
              clearable
              prefix="ios-contact-outline"
              v-model="requestData.username"
              placeholder="手机"
              class="item-input"
            />
          </div>
          <div class="item">
            <Input
              clearable
              prefix="ios-lock-outline"
              type="password"
              v-model="requestData.password"
              placeholder="密码"
              class="item-input"
            />
          </div>
          <div class="btn item">
            <Button type="primary" @click="login()" icon="md-contact"
              >登录</Button
            >
          </div>
          <div class="item register">
            <a type="info" class="pull-right" @click="showRegister = true">
              <Icon type="ios-cloud-circle" />注册
            </a>
          </div>
        </div>
      </div>
    </div>

    <Modal
      :transfer="false"
      closable
      class="user-model"
      v-model="showRegister"
      footer-hide
      title="注册新用户"
      width="400"
    >
      <Form
        ref="formValidate"
        :model="registerForm"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="手机" prop="phone">
          <Input
            clearable
            class="my-ipt"
            v-model="registerForm.phone"
            placeholder="请输入手机号"
            @on-blur="verifyTelephone"
          ></Input>
        </FormItem>
        <FormItem label="昵称" prop="nickName">
          <Input
            clearable
            class="my-ipt"
            v-model="registerForm.nickName"
            placeholder="请输入昵称"
          ></Input>
        </FormItem>
        <FormItem label="邀请码" prop="invitationPerson">
          <Input
            clearable
            class="my-ipt"
            v-model="registerForm.invitationPerson"
            placeholder="请输入邀请码"
          ></Input>
        </FormItem>
        <FormItem label="密码" prop="pwd">
          <Input
            clearable
            class="my-ipt"
            type="password"
            v-model="registerForm.pwd"
            placeholder="请输入密码"
          ></Input>
        </FormItem>
        <FormItem label="确认密码" prop="qurePassWord">
          <Input
            clearable
            class="my-ipt"
            type="password"
            v-model="registerForm.qurePassWord"
            placeholder="请输入密码"
          ></Input>
        </FormItem>
        <Button type="primary" long @click="saveRegister">保存</Button>
      </Form>
    </Modal>

    <vue-particles
      color="#dedede"
      :particlesNumber="50"
      class="bg-login"
    ></vue-particles>
  </div>
</template>

<script>
import Top from "./im/components/top.vue";
import apiMessage from "@/utils/api/message.js";
import apiCommon from "@/utils/api/common.js";
import { mapMutations } from "vuex";
export default {
  name: "login-page",
  data() {
    return {
      ruleValidate: {
        phone: [
          {
            required: true,
            message: "请填写手机号",
            trigger: "blur"
          }
        ],
        nickName: [
          {
            required: true,
            message: "请填写昵称",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          }
        ],
        qurePassWord: [
          {
            required: true,
            message: "请再次填写密码",
            trigger: "blur"
          }
        ]
      },
      checkCode: null,
      app_name: "",
      telephone: "",
      password: "",
      registerForm: {
        devId: 1,
        phone: "",
        pwd: "",
        nickName: "",
        invitationPerson: "QhQf",
        sex: "",
        birthday: ""
      },
      err: "",
      showErr: false,
      showSetting: false,
      showRegister: false,
      dialCode: "86",
      isCanRegister: false,
      ifshow: false,
      isdefultImg: true,
      img: "",
      formData: "",
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: ""
      },
      requestData: {
        username: "test",
        password: "123456"
      }
    };
  },
  components: {
    Top
  },
  mounted() {},
  methods: {
    ...mapMutations(["setUserData"]),
    clickUser: function() {
      location.reload();
    },
    verifyTelephone: function() {},
    imgChange: function() {
      // var file = $("#photoImg")[0].files[0];
      // this.formData = new FormData();
      // this.formData.append("file", file);
      // var URL = window.URL || window.webkitURL;
      // var imgURL = URL.createObjectURL(file);
      // this.img = imgURL;
      // this.isdefultImg = false;
      // this.ifshow = true;
    },
    selectImg: function() {
      this.$refs.img.click();
    },
    dataChange: function() {},
    saveRegister: function() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          let _this = this;
          this.$post("/register/register", this.registerForm)
            .then(function(response) {
              _this.$Message.success(response.data.data);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    login: function() {
      this.$get("login", this.requestData).then(res => {
        if (res) {
          this.setUserData(res);

          localStorage.setItem("userData",res);

          apiMessage.online();

          apiCommon.post("group");
          apiCommon.post("post");
          apiCommon.post("friend");
          apiCommon.post("conversation");
          
          this.$router.push({
            path: "/index/chatBox",
            params: {}
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/static/styles/theme.scss";
.login {
  height: 100%;
  background: url("../static/bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .my-ipt {
    width: 100%;
  }

  .login-form {
    display: flex;

    .my-logo {
      width: 7rem;
    }

    .login-form-left {
      margin-top: -1rem;
      padding-left: 30px;
      width: 15rem;
      height: 28rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-form-right {
      width: 35rem;
      height: 28rem;
      padding-right: 54px;
      padding-top: 40px;
    }
  }

  .bg-login {
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .login-panel {
    background: url("../static/login-bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    margin-left: -25rem;
    top: 50%;
    margin-top: -12rem;
    z-index: 2;

    .item {
      margin-top: 12px;
      width: 100%;

      label {
        width: 5rem;
        text-align: right;
        display: inline-block;
        color: #fff;
      }

      .item-input {
        width: 100%;
      }
    }

    .btn {
      button {
        width: 100%;
      }
    }

    .title {
      color: #fff;
      font-size: 14px;
    }
  }

  .setting {
    color: #fff;
    font-size: 2rem;
    display: block;
    right: 1rem;
    position: absolute;
    bottom: 1rem;
    cursor: pointer;
    z-index: 3;
  }

  .save-setting-btn {
    margin: 1rem 0 !important;
  }

  .register {
    padding: 0 2.2rem;

    a {
      color: #ffffff;

      i {
        font-size: 14px;
        letter-spacing: 5px;
      }
    }
  }
}

.setting-item {
  margin-bottom: 1rem;
}

.ivu-modal-wrap {
  .ivu-form-item {
    margin-bottom: 20px;
  }
}
</style>
