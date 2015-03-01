<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use frontend\widgets\Alert;

/* @var $this \yii\web\View */
/* @var $content string */

$this->title = '用户中心';
AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <link rel="icon" type="image/png" href="assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="assets/i/app-icon72x72@2x.png">
    <?php $this->head() ?>
</head>
<body>
    <?php $this->beginBody() ?>
    <div class="wrap">
        <?php
            NavBar::begin([
                'brandLabel' => 'IjiaChe',
                'brandUrl' => Yii::$app->homeUrl,
                'options' => [
                    'class' => 'navbar-inverse navbar-fixed-top',
                ],
            ]);
            $menuItems = [
                ['label' => '首 页', 'url' => ['/site/index']],
                ['label' => '关于', 'url' => ['/site/about']],
                ['label' => '联系我们', 'url' => ['/site/contact']],
            ];
            if (Yii::$app->user->isGuest) {
                $menuItems[] = ['label' => '注册', 'url' => ['/site/signup']];
                $menuItems[] = ['label' => '登陆', 'url' => ['/site/login']];
            } else {
                $menuItems[] = ['label' => '[' . Yii::$app->user->identity->username . ']', 'url' => ['/user/index']];
                $menuItems[] = [
                    'label' => '[退出]',
                    'url' => ['/site/logout'],
                    'linkOptions' => ['data-method' => 'post']
                ];
            }
            echo Nav::widget([
                'options' => ['class' => 'navbar-nav navbar-right'],
                'items' => $menuItems,
            ]);
            NavBar::end();
        ?>
        
        <div class="container">
            
        <!--[if lte IE 9]>
        <p class="browsehappy">你正在使用<strong>过时</strong>的浏览器，Amaze UI 暂不支持。 请 <a href="http://browsehappy.com/" target="_blank">升级浏览器</a>
          以获得更好的体验！</p>
        <![endif]-->
        <header class="am-topbar admin-header">
          <div class="am-topbar-brand">
            <strong><?php echo $this->title?></strong> <small><?php echo  date('Y-m-d H:m:s') ?></small>
          </div>
        
          
          <div class="am-collapse am-topbar-collapse" id="topbar-collapse">
        
            <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
              <li class="am-dropdown" data-am-dropdown>
                <a class="am-dropdown-toggle" data-am-dropdown-toggle href="#">
                  <span class="am-icon-users">类型:</span> 管理员 <span class="am-icon-caret-down"></span>
                </a>
              </li>
              <li><a href="?r=admin/index" id="admin-fullscreen"><span class="am-icon-arrows-alt"></span> <span class="admin-fullText">驾校管理中心</span></a></li>
              <li><a href="?r=admin/index"><span class="am-icon-envelope-o"></span> 用户留言 <span class="am-badge am-badge-warning">5</span></a></li>
            </ul>
          </div>
        </header>
        
        <div class="am-cf admin-main">
          <!-- sidebar start -->
          <div class="admin-sidebar">
            <ul class="am-list admin-sidebar-list">
              <li><a href="?r=user/index"><span class="am-icon-home"></span> 欢迎首页</a></li>
              <li class="admin-parent">
                <a class="am-cf" data-am-collapse="{target: '#collapse-nav1'}"><span class="am-icon-file"></span> 账 户 <span class="am-icon-angle-right am-fr am-margin-right"></span></a>
                <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav1">
                  <li><a href="?r=user/info" class="am-cf"><span class="am-icon-check"></span> 个人资料<span class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                  <li><a href="?r=user/coach"><span class="am-icon-check"></span> 教练资料<span class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                  <li><a href="?r=user/password"><span class="am-icon-pencil-square-o"></span> 修改密码</a></li>
                  <li><a href="?r=user/add"><span class="am-icon-bug"></span> 绑定驾校</a></li>
                  <li><a href="?r=user/add"><span class="am-icon-bug"></span> 报名学车</a></li>
                </ul>
              </li>
              <li class="admin-parent">
                <a class="am-cf" data-am-collapse="{target: '#collapse-nav2'}"><span class="am-icon-calendar"></span> 预约日历 <span class="am-icon-angle-right am-fr am-margin-right"></span></a>
                <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav2">
                  <li><a href="?r=user/indent" class="am-cf"><span class="am-icon-calendar"></span> 登记练车 <span class="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
                  <li><a href="?r=user/practice"><span class="am-icon-puzzle-piece"></span> 练车排期</a></li>
                  <li><a href="?r=user/prelist"><span class="am-icon-th"></span> 练车历史<span class="am-badge am-badge-secondary am-margin-right am-fr">24</span></a></li>
                </ul>
              </li>
              <li><a href="?r=user/position"><span class="am-icon-th"></span> 我的驾校</a></li>
              <li><a href="?r=user/practice"><span class="am-icon-calendar"></span> 练车日历</a></li>
              <li><a href="?r=user/logout"><span class="am-icon-sign-out"></span> 注销退出</a></li>
            </ul>
        
            <div class="am-panel am-panel-default admin-sidebar-panel">
              <div class="am-panel-bd">
                <p><span class="am-icon-bookmark"></span> 公告</p>
                <p>时光静好，与君语；细水流年，与君同。——爱驾车</p>
              </div>
            </div>
        
           <!-- <div class="am-panel am-panel-default admin-sidebar-panel">
              <div class="am-panel-bd">
                <p><span class="am-icon-tag"></span> 通知</p>
                <p>Welcome to the IjiaChe!</p>
              </div>
            </div> --> 
            <div class="am-panel am-panel-default admin-sidebar-panel">
              <div class="am-panel-bd">
                <p><span class="am-icon-bookmark"></span> 友情提醒</p>
                <p>建议使用360极速、Chrome、IE10以上浏览器——爱驾车</p>
              </div>
            </div>
          </div>
          <!-- sidebar end -->
            <?= Breadcrumbs::widget([
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
            ]) ?>
            <?= Alert::widget() ?>
            <?= $content ?>
        </div>
    </div>
 </div>
    <footer class="footer">
        <div class="container">
        <p class="pull-left">&copy; IjiaChe <?= date('Y') ?></p>
        <p class="pull-right">爱驾车</p>
        </div>
    </footer>

    <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
