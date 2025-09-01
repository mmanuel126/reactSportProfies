export interface Sports {
  Name: string;
  id: string;
  description: string;
}

export interface SchoolsByState {
  SchoolID: string;
  SchoolName: string;
}

export interface States {
  StateId: number;
  Abbreviation: string;
  Name: string;
}

export interface Ads {
  ID: number;
  HeaderText: string;
  ImageUrl: string;
  TextField: string;
  NavigateURL: string;
}
