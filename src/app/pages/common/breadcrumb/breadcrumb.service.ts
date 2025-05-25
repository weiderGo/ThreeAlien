import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        const breadcrumbs: Breadcrumb[] = [];
        this.buildBreadcrumbs(this.activatedRoute.root, '', breadcrumbs);
        this.breadcrumbsSubject.next(breadcrumbs);
      });
  }

  private buildBreadcrumbs(route: ActivatedRoute, path: string, breadcrumbs: Breadcrumb[]) {
    const children: ActivatedRoute[] = route.children;

    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        path += `/${routeURL}`;
      }

      const label = child.snapshot.data['title'];
      if (label) {
        breadcrumbs.push({ label, url: path });
      }

      this.buildBreadcrumbs(child, path, breadcrumbs); // 遞迴繼續處理子路由
    }
  }
}
