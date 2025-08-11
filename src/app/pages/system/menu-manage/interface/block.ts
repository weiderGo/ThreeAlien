export interface LayoutGroup {
  templateCode: string; // 1.左圖右文 2.右圖左文 3.上圖下文 4.下圖上文
  data: Block[];
  sortOrder: number; // 新增排序數字
}

export interface Block {
  imageUrl?: string;
  imageId: string;
  text: string;
  sort:number;
}
