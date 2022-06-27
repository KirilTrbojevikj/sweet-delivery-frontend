export enum ItemCategory {
  FRUITS,
  VEGETABLES,
  DAIRY,
  OIL,
  POWDERS,
  LIQUID,
  DECORATIONS,
  SWEETS,
  EGGS,
}
export enum PostStatus {
  PENDING,
  APPROVED,
  DECLINED,
}
export interface Item {
  id: number;
  items_in_stock: number;
  name: string;
  itemCategory: ItemCategory;
  price: number;
  img_url: string;
}
export interface CreateItem {
  name: string;
  items_in_stock: number;
  price: number;
  img_url: string;
}

export interface Rating {
  id : number;
  user : User;
  recipeStars : number;
}

export interface Recipe {
  id: number;
  price: number;
  description: string;
  img_url: string;
  itemList?: Array<Item>;
  name: string;
  averageRating : number;  
  ratings : Array<Rating>;
}

export interface ShoppingCartItem {
  recipe: Recipe;
  quantity: number;
}

export interface ShoppingCartItemDto {
  recipeId: number;
  recipeQuantity: number;
}

export interface CreateRecipe {
  price: number;
  description?: string;
  name: string;
  img_url: string;
  itemList: Array<number>;
}

export interface CreatePost{
  recipeId : number;
  userName : string;
}

export interface Post{
  id : number;
  recipe : Recipe;
  date_created : string;
  user : User;
  postStatus : PostStatus;
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  id:number;
  address: string;
}

export enum UserRole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_CLIENT = "ROLE_CLIENT",
}
export interface LoginRequest {
  username: string;
  password: string;
}

export type RegisterRequest = LoginRequest & {
  email: string;
  firstName: string;
  lastName: string;
  appUserRoles?: Array<UserRole>;
};

export enum CartActionsEnum {
  AddItem,
  RemoveItem,
  Clear,
  CalculateTotal,
  AddAllItems,
  ChangeQuantity,
}

export interface OrderReq {
  recipes: Array<ShoppingCartItemDto>;
  address: string;
}

export interface CreateOrder {
  amount : number;
  deliveryAddress : string;
  userId : number;
  orderContent : Array<ShoppingCartItemDto>;
}

export type CartAction =
  | {
      type: CartActionsEnum.AddItem;
      payload: ShoppingCartItem;
    }
  | {
      type: CartActionsEnum.RemoveItem;
      payload: number;
    }
  | {
      type: CartActionsEnum.Clear;
      payload: null;
    }
  | {
      type: CartActionsEnum.CalculateTotal;
      payload: null;
    }
  | {
      type: CartActionsEnum.AddAllItems;
      payload: ShoppingCartItem[];
    }
  | {
      type: CartActionsEnum.ChangeQuantity;
      payload: { id: number; quantity: number };
    };

export enum Status {
  SUCCESS,
  ERROR,
  LOADING,
}

export interface AuthResponse {
  sub: string;
  auth: Array<{ authority: UserRole }>;
  iat: number;
  exp: number;
}

export interface LeaveRatingDTO{
  recipeId : number;
  username : string;
  recipeStars : number;
}



export type Result<T> =
  | {
      value: T;
      message: null;
      status: Status.SUCCESS;
    }
  | {
      value: null;
      message: string;
      status: Status.ERROR;
    }
  | {
      value: null;
      message: null;
      status: Status.LOADING;
    };
