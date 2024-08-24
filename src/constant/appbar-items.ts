import { routeNames } from "./routeNames";

export const SOS_LINK =
  "https://bimeh.farsimeeting.com/images/bimesos-komak-resan.jpeg";

export interface IAppBarType {
  type: "icon" | "text" | "contained";
  text?: string;
  route?: string;
}
export const APP_BAR_ITEMS: IAppBarType[] = [
  {
    type: "icon",
  },
  {
    type: "text",
    text: "صفحه اصلی",
    route: routeNames.HOME,
  },
  {
    type: "text",
    text: "ToDo List",
    route: routeNames.TODO_LIST,
  },
  {
    type: "text",
    text: "مراکز خدمات درمانی",
  },
  {
    type: "text",
    text: "شعبه های ما",
  },
  {
    type: "text",
    text: "سوال های متداول",
  },
  {
    type: "contained",
    text: "ورود و فعالسازی",
  },
];
