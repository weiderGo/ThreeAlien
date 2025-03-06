import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () =>
      import('./pages/home/home.component').then((mod) => mod.HomeComponent),
    data: { title: "主頁" },
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
    ]
  },
  // 當路徑是空的時候轉址到 login
  {
    path: "**",
    redirectTo: "home",
  },
  /**萬用路徑，路由沒有比對到，永遠會執行*/
  //{ path: "**", component: HomeComponent,},
];
