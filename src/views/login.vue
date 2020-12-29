<template>
  <div class="">
    <h3>用户登录</h3>
    <van-form>
      <van-field
        autocomplete="off"
        v-model="userName"
        name="用户名称"
        label="用户名称"
        placeholder="请输入用户名称"
        :rules="[{ required: true, message: '请填写用户名称' }]"
      />
      <van-field
        autocomplete="off"
        v-model="userPassword"
        name="用户密码"
        label="用户密码"
        placeholder="请输入用户密码"
        :rules="[{ required: true, message: '请填写用户密码' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          :disabled="this.userName && this.userPassword ? false : true"
          type="info"
          @click="login"
        >
          登录
        </van-button>
        <van-button style="margin-top: 16px" round block type="info" @click="goUserInfo">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      userName: "",
      userPassword: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    login() {
      axios
        .get("http://localhost:8888/login", {
          params: {
            userName: this.userName,
            userPassword: this.userPassword,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            Toast.success({
              duration: 300,
              message: "登录成功",
            });
            localStorage.setItem("username", res.data.user.userName);
            this.$router.push("/userlist");
            console.log(res.data.user.userName);
            console.log(res);
          } else {
            Toast.fail({
              duration: 2000,
              message: "登录失败，请检查用户名密码是否正确",
            });
            this.userName = "";
            this.userPassword = "";
          }
        });
    },
    goUserInfo() {
      this.$router.push("/userinfo");
    },
  },
  created() {
    let username = localStorage.getItem("username");
    console.log(username);
    if (username) {
      this.$router.push("/userlist");
    }
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style lang="scss" scoped></style>
