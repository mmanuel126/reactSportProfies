export interface Sports {
  name: string;
  id: string;
  description: string;
}

export interface SchoolsByState {
     schoolId: string;
     schoolName: string;
}

export interface States {
  stateId :number;
  abbreviation :string;
  name :string;
}

export interface Ads {
  id: number;
  headerText: string;
  imageUrl: string;
  textField: string;
  navigateUrl: string;
}
