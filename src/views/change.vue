<template>
  <div class="change">
    <h2>修改用户信息</h2>
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
      <van-field name="uploader" label="文件上传">
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
          @click="userChange"
        >
          提交修改
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
      fileList: [{ url: "" }],
    };
  },
  computed: {},
  watch: {},
  methods: {
    shopitem() {
      const id = this.$route.params && this.$route.params.id; //接收id
      console.log(id);
      let that = this;
      $.ajax({
        //查询指定数据
        type: "get",
        url: `http://localhost:8888/useritem/${id}`,
        success: function (res) {
          if (res.code === 200) {
            console.log(res.msg);
            that.userName = res.msg.userName;
            that.userPassword = res.msg.userPassword;
            that.userMessage = res.msg.userMessage;
            that.userScore = res.msg.userScore;
            that.fileList[0].url = res.msg.userImg;
          } else {
            Toast.fail({
              duration: 300,
              message: res.msg,
            });
          }
        },
      });
    },
    userChange() {
      const id = this.$route.params && this.$route.params.id; //接收id
      let imgInfo = this.fileList[0].file;
      console.log(imgInfo);
      let formdata = new FormData();
      formdata.append("avatar", imgInfo);
      console.log(formdata);
      let that = this;
      $.ajax({
        //删除图片
        type: "delete",
        url: `http://localhost:8888/userDelImg/${id}`,
      });
      $.ajax({
        //更新图片
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
              //更新数据
              type: "put",
              url: `http://localhost:8888/userUpdate/${id}`,
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
                    duration: 1000,
                    message: "用户信息发生改变，请重新登录!",
                  });
                  localStorage.removeItem("username");
                  that.$router.push("/login");
                } else {
                  Toast.fail({
                    duration: 300,
                    message: res.msg,
                  });
                }
              },
            });
          }
        },
      });
    },
  },
  created() {
    this.shopitem();
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
