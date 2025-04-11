import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./pages/common/home/home.component').then(mod => mod.HomeComponent),
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "homeManage",
        loadComponent: () => import('./pages/system/home-manage/home-manage.component').then(mod => mod.HomeManageComponent),
        data: { title: "首頁管理" }
      },
      {
        path: "menuManage",
        loadComponent: () => import('./pages/system/menu-manage/menu-manage.component').then(mod => mod.MenuManageComponent),
        data: { title: "選單設定" },
      },
      {
        path: "pageManage",
        loadComponent: () => import('./pages/system/menu-manage/component/page-manage/page-manage.component').then(mod => mod.PageManageComponent),
        data: { title: "內頁管理" },
      },
      {
        path: "**",
        loadComponent: () => import('./pages/common/not-found/not-found.component').then(mod => mod.NotFoundComponent),
        data: { title: "找不到頁面" }
      },
    ]
  },
  // 當路徑是空的時候轉址到 login
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
  // {
  //   path: "**",
  //   loadComponent: () => import('./pages/common/not-found/not-found.component').then(mod => mod.NotFoundComponent),
  // },
  /**萬用路徑，路由沒有比對到，永遠會執行*/
  //{ path: "**", component: HomeComponent,},
];
