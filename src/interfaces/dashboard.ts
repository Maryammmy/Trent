export interface IDashboard {
  report_data: IReportData[];
  is_subscribe: number;
  is_gallery_enabled: boolean;
  member_data: IMemberData[];
}
export interface IReportData {
  title: string;
  report_data: number;
  url: string;
}
interface IMemberData {
  title: string;
  report_data: string;
}
