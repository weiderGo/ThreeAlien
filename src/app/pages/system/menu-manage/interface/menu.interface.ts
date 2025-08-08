export interface Menu {
  menuCode: string;
  menuName: string;
  url: string;
  sort: number;
  isEdit: boolean;
  isActive: boolean;
  iconClass?: string;
  subList?: Menu[]
}
