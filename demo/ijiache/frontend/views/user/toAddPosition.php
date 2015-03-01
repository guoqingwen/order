<?php
?>
<!-- content start -->
  <div class="admin-content">
    <div class="am-cf am-padding">
      <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">绑定驾校</strong> / <small>Binding of driving school</small></div>
    </div>

    <hr/>

    <div class="am-g">

      <div class="am-u-sm-12 am-u-md-4 am-u-md-push-8">
      </div>

      <div class="am-u-sm-12 am-u-md-8 am-u-md-pull-4">
        <form class="am-form am-form-horizontal">
          <div class="am-form-group am-form-inline">
            <label for="id_addposition" class="am-u-sm-3 am-form-label">选择驾校:</label>
            <div class="am-u-sm-6">
               <select id="id_addposition">
                    <option >港安驾校</option>
                    <option>综安驾校</option>
               </select>
              <small>选择您报名学车的驾校...</small>
            </div>
            <div class="am-u-sm-3">
                <small id="id_positionIns">驾校简介...</small>
            </div>
            
          </div>
          
          <div class="am-form-group">
            <label for="id_classType" class="am-u-sm-3 am-form-label">选择驾照类型:</label>
            <div class="am-u-sm-6">
              <select id="id_classType">
                    <option >C1手动挡</option>
                    <option>C2自动挡</option>
                    <option>B1自动挡</option>
                    <option>B2自动挡</option>
               </select>
              <small>选择您在该驾校报名学车的驾照类型...</small>
            </div>
             <div class="am-u-sm-3">
                <small id="id_classIns">驾照类型简介...</small>
            </div>
          </div>
          

          <div class="am-form-group">
            <label for="id_classType" class="am-u-sm-3 am-form-label">选择班别:</label>
            <div class="am-u-sm-6">
              <select id="id_classType">
                    <option >至尊VIP班</option>
                    <option>普通班</option>
               </select>
              <small>选择您在该驾校报名学车的班别...</small>
            </div>
             <div class="am-u-sm-3">
                <small id="id_classIns">班别简介...</small>
            </div>
          </div>

          <div class="am-form-group">
            <label for="user-phone" class="am-u-sm-3 am-form-label">学车优惠价:</label>
            <div class="am-u-sm-9">
              ￥<span id="id_price" style="color: red;font-size:24" >9988</span>元<br>
              <small>原价￥10000元 ....你懂得...</small>
            </div>
          </div>

          <div class="am-form-group">
            <div class="am-u-sm-9 am-u-sm-push-3">
              <button type="button" class="am-btn am-btn-primary">绑定</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- content end -->