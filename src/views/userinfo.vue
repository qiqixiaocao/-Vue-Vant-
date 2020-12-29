<template>
  <div class="">
    <h3>用户注册</h3>
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
      <van-field
        autocomplete="off"
        v-model="userMessage"
        type="text"
        name="用户简介"
        label="用户简介"
        placeholder="请输入用户简介"
        :rules="[{ required: true, message: '请填写用户简介' }]"
      />
      <van-field
        autocomplete="off"
        v-model="userScore"
        type="text"
        name="用户评分"
        label="用户评分"
        placeholder="请输入用户评分"
        :rules="[{ required: true, message: '请填写用户评分' }]"
      />
      <van-field name="uploader" label="上传头像">
        <template #input>
          <van-uploader v-model="fileList" multiple :max-count="1" />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          round
          block
          :disabled="
            this.userName &&
            this.userPassword &&
            this.userMessage &&
            this.userScore &&
            this.fileList.length != 0
              ? false
              : true
          "
          type="info"
          @click="userInfo"
        >
          注册
        </van-button>
        <van-button style="margin-top: 16px" round block type="info" @click="goLogin">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import $ from "jquery";
export default {
  data() {
    return {
      userName: "",
      userPassword: "",
      userMessage: "",
      userScore: "",
      userImg: "",
      fileList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    userInfo() {
      //上传图片
      let imgInfo = this.fileList[0].file;
      let formdata = new FormData();
      formdata.append("avatar", imgInfo);
      console.log(formdata);
      let that = this;
      $.ajax({
        type: "post",
        url: "http://localhost:8888/upload",
        data: formdata,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data.code === 200) {
            data.path = "http://localhost:8888" + "\\" + data.path;
            that.userImg = data.path;
            $.ajax({
              type: "post",
              url: "http://localhost:8888/useradd",
              data: {
                userName: that.userName,
                userPassword: that.userPassword,
                userMessage: that.userMessage,
                userScore: that.userScore,
                userImg: that.userImg,
              },
              success: function (res) {
                if (res.code === 200) {
                  Toast.success({
                    duration: 300,
                    message: "注册成功",
                  });
                  that.$router.push("/login");
                } else {
                  Toast.fail({
                    duration: 300,
                    message: "注册失败",
                  });
                }
              },
            });
          }
        },
      });
    },
    goLogin() {
      this.$router.push("/login");
    },
  },
  created() {
    let username = localStorage.getItem("username");
    console.log(username);
    if (username) {
      this.$router.push("/login");
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
