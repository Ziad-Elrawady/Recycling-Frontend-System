export interface Reward {
  id: number;
  name: string;
  description: string;
  category: string;
  requiredPoints: number;
  stockQuantity: number;
  isAvailable: boolean;
  imageUrl?: string | null;
}
