import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Proposal} from "../../entities/proposal.model";
import {ActivityType} from "../../entities/activityType.enum";

@Injectable({
  providedIn: 'root'
})
export class HttpProposalService {
  constructor(private http: HttpClient) {
  }

  loadProposalsByGroupId(groupId: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>('/api/proposals', {params: new HttpParams().set('groupId', String(groupId))});
  }

  createProposalByUserId(proposalRequest: Proposal): Observable<Proposal> {
    return this.http.post<Proposal>('/api/proposals', proposalRequest,
      {headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8',
        })});
  }
}
