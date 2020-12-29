<template>
  <div class="list">
    <h3>用户列表</h3>
    <ul>
      <li v-for="(item, index) in userList" :key="item._id">
        <van-swipe-cell>
          <van-card
            :title="item.userName"
            :desc="item.userMessage"
            :thumb="item.userImg"
            id="list"
          />
          <van-rate
            :value="item.userScore"
            allow-half
            void-icon="star"
            void-color="#eee"
          />
          <template #right>
            <van-button
              type="info"
              @click="goChange(item._id)"
              size="normal"
              class="delete-button"
              >修改</van-button
            >
            <van-button
              @click="deletedUser(index, item._id)"
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </li>
    </ul>
    <van-button type="info" @click="userOut()" size="normal">退出登录</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import Vant from "vant";
import { Card, Toast, Rate, Dialog, SwipeCell } from "vant";
Vue.use(SwipeCell);
Vue.use(Card);
Vue.use(Toast);
Vue.use(Rate);
Vue.use(Dialog);
Vue.use(Vant);
import axios from "axios";
export default {
  data() {
    return {
      userList: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    showList() {
      let that = this;
      axios.get("http://localhost:8888/userlist").then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          that.userList = res.data.msg;
          console.log(that.userList);
        }
      });
    },
    deletedUser(index, id) {
      Dialog.confirm({
        message: "确定要删除吗？",
      })
        .then(() => {
          this.userList.splice(index, 1);
          axios.delete(`http://localhost:8888/userDel/${id}`).then((res) => {
            if (res.data.code === 200) {
              Toast.success({
                duration: 1000,
                message: "删除用户成功！",
              });
              if (this.userList.length == 0) {
                localStorage.removeItem("username");
                this.$router.push("/userinfo");
              }
            } else {
              Toast.fail({
                duration: 1000,
                message: "删除用户失败！",
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    userOut() {
      Dialog.confirm({
        message: "确定要退出登录吗？",
      })
        .then(() => {
          localStorage.removeItem("username");
          this.$router.push("/login");
          Toast.success({
            duration: 1000,
            message: "注销成功！",
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    goChange(id) {
      console.log(id);
      this.$router.push(`/change/${id}`);
    },
  },
  created() {
    let username = localStorage.getItem("username");
    console.log(username);
    if (username) {
      this.showList();
    } else {
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

<style>
#list .van-card__title,
.van-card__desc {
  font-size: 20px !important;
  line-height: 30px;
  max-height: none;
}
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}
</style>
