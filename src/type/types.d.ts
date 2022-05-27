export type listDataType = {
  id: string;
  title: string;
  floor: string;
  time: number;
  groupId: string;
  link: string[];
}[];

export type groupListDataType = {
  [index: string]: listDataType;
};

export type groupConversionType = {
  groupId: string;
  groupName: string;
}[];

export type floorConversionType = {
  floorId: string;
  floorName: string;
}[];
