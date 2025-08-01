
import type { NewsItem } from "../types/news";
import { apiFetch } from "./api";
import type { Ads, SchoolsByState, Sports, States} from "../types/common.ts";

export async function getRecentNews(): Promise<NewsItem[]> {
  return await apiFetch<NewsItem[]>("/services/common/getRecentNews", {
    method: "GET",
  });
}

export async function getSportsList():Promise<Sports[]> {
   return await apiFetch<Sports[]>("/services/common/GetSportsList", {
    method: "GET",
  });
}

export async function getStates():Promise<States[]> {
   return await apiFetch<States[]>("/services/common/GetStates", {
    method: "GET",
  });
}

export async function getSchools(state:string, instType:string):Promise<SchoolsByState[]> {
   return await apiFetch<SchoolsByState[]>(`/services/common/GetSchoolByState?state=${state}&institutionType=${instType}`, {
    method: "GET",
  });
}

export async function getYears (maxYear:number, baseYear:number):Promise<number[]> {
    //this will get a number of years backward to display on drop downs.
    const years = []; 
    for (let i = maxYear; i > baseYear; i--) {
      years.push(i);
    }
    return years
}

export async function getAds(type:string):Promise<Ads[]> {
 return await apiFetch<Ads[]>(`/services/common/GetAds?type=${type}`, {
    method: "GET",
  });
}

 