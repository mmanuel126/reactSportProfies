export interface Sports {
  name: string;
  id: string;
  description: string;
}

export interface SchoolsByState {
  school_id: string;
  school_name: string;
}

export interface States {
  state_id: number;
  abbreviation: string;
  name: string;
}

export interface Ads {
  id: number;
  headertext: string;
  imageurl: string;
  textfield: string;
  navigateurl: string;
}
