<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow class="page-nav-bar" title="登录" >
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFormRules.mobile" type="number" maxlength="11">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code" type="number" maxlength="6">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 倒计时时间 -->
          <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false"/>
          <van-button v-else class="send-sms-btn" round size="small" type="default" @click="onSendSms" native-type="button">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      //   在组件中必须通过 this.$toast 来调用 Toast 组件
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止 //默认两秒
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      // 3.提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')

        // 登陆成功跳转回原来页面
        // back 的方式不严谨 后面讲功能优化的时候再说
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    async onSendSms () {
      console.log('onSendSms')
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        console.log('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
