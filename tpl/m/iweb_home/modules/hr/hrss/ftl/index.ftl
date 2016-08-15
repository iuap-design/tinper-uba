<!--<#include "../component/comp1/comp1.ftl">-->
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<!-- Head -->
<head>
    <meta charset="utf-8"/>
    <title>IWEB-DEMO</title>

    <meta name="description" content="Dashboard"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>


    <!--&lt;!&ndash;Basic Styles&ndash;&gt;-->
    <!--<link href="${ctx}/static/css/bootstrap.min.css" rel="stylesheet"/>-->
    <!--<link id="bootstrap-rtl-link" href="" rel="stylesheet"/>-->
    <!--<link href="${ctx}/static/css/font-awesome.min.css" rel="stylesheet"/>-->


    <!--&lt;!&ndash;Beyond styles&ndash;&gt;-->
    <!--<link id="beyond-link" href="${ctx}/static/css/beyond.min.css" rel="stylesheet" type="text/css"/>-->
    <!--<link href="${ctx}/static/css/demo.min.css" rel="stylesheet"/>-->
    <!--<link href="${ctx}/static/css/typicons.min.css" rel="stylesheet"/>-->
    <!--<link href="${ctx}/static/css/animate.min.css" rel="stylesheet"/>-->
    <!--<link id="skin-link" href="" rel="stylesheet" type="text/css"/>-->
    <!--<link href="${ctx}/static/lib/uui/css/u.css" rel="stylesheet">-->
    <!--<link href="${ctx}/static/css/index.css" rel="stylesheet">-->



    {% for (var chunk in o.htmlWebpackPlugin.files.chunks['index'].css) { %}
        <link href="{%= o.htmlWebpackPlugin.files.chunks['index'].css[chunk]%}" rel="stylesheet">
    {% } %}

    <!--Skin Script: Place this script in head to load scripts for skins and rtl support-->
    <!--<script src="${ctx}/static/js/skins.min.js"></script>-->
    <script>
        window.$ctx = '${ctx}';
    </script>
</head>
<!-- /Head -->
<!-- Body -->
<body>
<@comp1/>
<!-- Loading Container -->
<div class="loading-container">
    <div class="loader"></div>
</div>
<!--  /Loading Container -->
<!-- Navbar -->
<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="navbar-container">
            <!-- Navbar Barnd -->
            <div class="navbar-header pull-left">
                <a href="#" class="navbar-brand">
                    <img id="yunc" src="" alt=""/>
                </a>
            </div>
            <!-- /Navbar Barnd -->
            <!-- Sidebar Collapse -->
            <div class="sidebar-collapse" id="sidebar-collapse">
                <i class="collapse-icon fa fa-bars"></i>
            </div>
            <!-- /Sidebar Collapse -->
            <!-- Account Area and Settings --->
            <div class="navbar-header pull-right">
                <div class="navbar-account">
                    <ul class="account-area">
                        <li>
                            <a class="login-area dropdown-toggle" data-toggle="dropdown">
                                <div class="avatar" title="View your public profile">
                                    <img id="jansen" src="">
                                </div>
                                <section>
                                    <h2><span class="profile"><span>${cusername}</span></span></h2>
                                </section>

                            </a>
                            <!--Login Area Dropdown-->
                            <ul class="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
                                <!--/Theme Selector Area-->
                                <li class="dropdown-footer">
                                    <a href="${ctx}/logout">
                                        退出登录
                                    </a>

                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div class="setting">
                        <a id="" title="" href="#">
                            <i class="icon glyphicon glyphicon-cog"></i>
                        </a>
                    </div>
                    <div class="setting-container">
                        <label>
                            <input type="checkbox" id="checkbox_fixednavbar" checked="checked">
                            <span class="text">Fixed Navbar</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedsidebar" checked="checked">
                            <span class="text">Fixed SideBar</span>
                        </label>
                        <label style="display: none;">
                            <input type="checkbox" id="checkbox_fixedbreadcrumbs" checked="checked">
                            <span class="text">Fixed BreadCrumbs</span>
                        </label>
                        <label style="display: none;">
                            <input type="checkbox" id="checkbox_fixedheader" checked="checked">
                            <span class="text">Fixed Header</span>
                        </label>
                    </div>
                    <!-- Settings -->
                </div>
            </div>
            <!-- /Account Area and Settings -->
        </div>
    </div>
</div>
<!-- /Navbar -->
<!-- Main Container -->
<div class="main-container container-fluid">
    <!-- Page Container -->
    <div class="page-container">

        <!-- Page Sidebar -->
        <div class="page-sidebar sidebar-fixed" id="sidebar">
            <!-- Page Sidebar Header-->
            <!--<div class="sidebar-header-wrapper">
                <input type="text" class="searchinput"/>
                <i class="searchicon fa fa-search"></i>

                <div class="searchhelper">搜索 报告, 图表, 邮件 或者 通知</div>
            </div>-->
            <!-- /Page Sidebar Header -->
            <!-- Sidebar Menu -->
            <ul class="nav sidebar-menu left-menu ">
                <!--Dashboard-->
                <li class="active">
                    <#-- 待办列表  -->
                        <a href="#/ipu/index/index">
                            <i class="menu-icon glyphicon glyphicon-home"></i>
                            <span class="menu-text"> 首页 </span>
                        </a>
                </li>
                <!--UI Elements-->
                <li>
                    <a href="#" class="menu-dropdown">
                        <i class="menu-icon fa fa-bar-chart-o"></i>
                        <span class="menu-text"> 采购管理系统 </span>
                        <i class="menu-expand"></i>
                    </a>
                    <ul class="submenu">
                        <li>
                            <a href="#/page1">
                                <span class="menu-text">采购需求</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/page2">
                                <span class="menu-text">询价单</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/ipu/quotationoffer/quotationoffer">
                                <span class="menu-text">报价单</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#" class="menu-dropdown">
                        <i class="menu-icon glyphicon glyphicon-user"></i>
                        <span class="menu-text"> 用户管理 </span>
                        <i class="menu-expand"></i>
                    </a>
                    <ul class="submenu">
                        <li>
                            <a href="#/ipu/sysconfig/user/list">
                                <span class="menu-text">用户</span>
                            </a>
                        </li>
                        <#--<li>-->
                        <#--<a href="#/ipu/sysconfig/role/list">-->
                        <#--<span class="menu-text">角色</span>-->
                        <#--</a>-->
                        <#--</li>-->
                    </ul>
                </li>
                <li>
                    <a href="#" class="menu-dropdown">
                        <i class="menu-icon glyphicon glyphicon-tasks"></i>
                        <span class="menu-text"> 配置管理 </span>
                        <i class="menu-expand"></i>
                    </a>
                    <ul class="submenu">
                        <li>
                            <a href="#/ipu/sysconfig/config/ali1688Auth">
                                <span class="menu-text">1688授权</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/ipu/sysconfig/assets/assets">
                                <span class="menu-text">物料关键字配置</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/ipu/sysconfig/app/list">
                                <span class="menu-text">应用订购</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/ipu/sysconfig/authfile/authfile">
                                <span class="menu-text">授权文件生成</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#" class="menu-dropdown">
                        <i class="menu-icon fa fa-desktop"></i>
                        <span class="menu-text"> 消息工作台 </span>
                        <i class="menu-expand"></i>
                    </a>
                    <ul class="submenu">
                        <li>
                            <a href="#/ipu/pureq/alipage/msgpush">
                                <span class="menu-text">手工推单</span>
                            </a>
                        </li>
                    </ul>
                </li>


            </ul>
            <!-- /Sidebar Menu -->
        </div>
        <!-- /Page Sidebar -->

        <!-- Page Content -->
        <div class="page-content">
            <!-- Page Breadcrumb -->

            <div class="page-breadcrumbs breadcrumbs-fixed" style="display:none;">
                <ul class="breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="#">首页</a>
                    </li>
                    <li class="active">主页</li>
                </ul>
            </div>
            <!-- /Page Breadcrumb -->
            <!-- Page Header -->
            <div class="page-header position-relative page-header-fixed" style="display:none;">
                <div class="header-title">
                    <h1>
                        主页
                    </h1>
                </div>
                <!--Header Buttons-->
                <div class="header-buttons">
                    <a class="sidebar-toggler" href="#">
                        <i class="fa fa-arrows-h"></i>
                    </a>
                    <a class="refresh" id="refresh-toggler" href="">
                        <i class="glyphicon glyphicon-refresh"></i>
                    </a>
                    <a class="fullscreen" id="fullscreen-toggler" href="#">
                        <i class="glyphicon glyphicon-fullscreen"></i>
                    </a>
                </div>
                <!--Header Buttons End-->
            </div>
            <!-- /Page Header -->
            <!-- Page Body -->
            <div class="page-body">


                <div class="row">

                    <div class="col-lg-12 col-sm-12 col-xs-12">

                        <div class="row">
                            <div class="col-md-12">
                                <div class="content">


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /Page Body -->

        </div>
        <!-- /Page Content -->

    </div>
    <!-- /Page Container -->
    <!-- Main Container -->

</div>


<!--&lt;!&ndash;Basic Scripts&ndash;&gt;-->
<!--<script src="${ctx}/static/lib/jquery/jquery-1.11.2.js"></script>-->
<!--<script src="${ctx}/static/js/bootstrap.min.js"></script>-->
<!--<script src="${ctx}/static/js/slimscroll/jquery.slimscroll.min.js"></script>-->

<!--&lt;!&ndash;Beyond Scripts&ndash;&gt;-->
<!--<script src="${ctx}/static/js/beyond.js"></script>-->


<!--<script>-->
    <!--// If you want to draw your charts with Theme colors you must run initiating charts after that current skin is loaded-->
    <!--$(window).bind("load", function () {-->

        <!--/*Sets Themed Colors Based on Themes*/-->
        <!--themeprimary = getThemeColorFromCss('themeprimary');-->
        <!--themesecondary = getThemeColorFromCss('themesecondary');-->
        <!--themethirdcolor = getThemeColorFromCss('themethirdcolor');-->
        <!--themefourthcolor = getThemeColorFromCss('themefourthcolor');-->
        <!--themefifthcolor = getThemeColorFromCss('themefifthcolor');-->


        <!--//Sets The Hidden Chart Width-->
        <!--$('#dashboard-bandwidth-chart')-->
                <!--.data('width', $('.box-tabbs')-->
                                <!--.width() - 20);-->
        <!--$('.login-area').click(function () {-->
            <!--$(this).parent().toggleClass('open');-->
        <!--})-->
        <!--$('.sidebar-menu li').click(function () {-->
            <!--var p = $('.sidebar-menu li.active').removeClass("active");-->
            <!--var ele = $(this);-->
            <!--setTimeout(function () {-->
                <!--ele.addClass('active');-->
            <!--}, 0)-->
        <!--})-->

    <!--});-->

<!--</script>-->


<script src="{%=o.htmlWebpackPlugin.files.chunks['vendor'].entry %}"></script>
<script src="{%=o.htmlWebpackPlugin.files.chunks['index'].entry %}"></script>

<!--<script src="${ctx}/static/lib/requirejs/require.js"></script>-->
<!--<script src="${ctx}/static/js/require.config.js"></script>-->
<!--<script src="${ctx}/static/js/index.js"></script>-->
<!--<@comp1/>-->
</body>
<!--  /Body -->
</html>
