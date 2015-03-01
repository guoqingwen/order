<?php

?>
<!-- content start -->
  <div class="admin-content">
    <div class="am-cf am-padding">
      <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">修改密码</strong> / <small>Update Password</small></div>
    </div>

    <hr/>

    <div class="am-g">

      <div class="am-u-sm-12 am-u-md-4 am-u-md-push-8">
      </div>

      <div class="am-u-sm-12 am-u-md-8 am-u-md-pull-4">
        <form class="am-form am-form-horizontal" method="post" action="?r=user/password">
        <input type="hidden" name="_csrf" value='<?php Yii::$app->getRequest()->csrfParam; ?>'/>
          <div class="am-form-group am-form-inline">
            <label for="id_username" class="am-u-sm-3 am-form-label">用户名:</label>
            <div class="am-u-sm-9">
              <span id="id_username"><?php echo Yii::$app->user->identity->username ?></span>
            </div>
          </div>
          
          <div class="am-form-group">
            <label for="pwd" class="am-u-sm-3 am-form-label">原密码:</label>
            <div class="am-u-sm-9">
                <input type="password" id="pwd" name="UpdatePasswordForm[oldpwd]" placeholder="输入原密码" value="123456">
            </div>
          </div>
          

          <div class="am-form-group">
            <label for="password" class="am-u-sm-3 am-form-label">新密码:</label>
            <div class="am-u-sm-9">
            <input type="password" id="password" name="UpdatePasswordForm[password]" placeholder="输入新密码" value="1234567">
              <small>密码在6-15个字符之间...</small>
            </div>
          </div>

          <div class="am-form-group">
            <label for="user-phone" class="am-u-sm-3 am-form-label">重复新密码:</label>
            <div class="am-u-sm-9">
            <input type="password" id="user-phone" name="UpdatePasswordForm[passwordTwo]" placeholder="重复新密码" value="1234567">
              <small>密码在6-15个字符之间...</small>
            </div>
          </div>

          <div class="am-form-group">
            <div class="am-u-sm-9 am-u-sm-push-3">
              <button type="submit" name="psw-button" class="am-btn am-btn-primary">提交</button><p style="color: red"><?php  echo $msg ?></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- content end -->