import { BlockContent } from ".";

export interface PageBlock {
  blockCode: string;
  blockContent: BlockContent[];
  templateCode: string;
  isActive: boolean;
  sort: number;
}
