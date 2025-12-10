export interface Reward {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  requiredPoints: number;     // بدل pointsCost
  stockQuantity: number;      // بدل stock
  imageUrl?: string;
}
