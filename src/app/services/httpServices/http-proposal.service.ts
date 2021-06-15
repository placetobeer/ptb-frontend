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

  loadProposalsByUserId(userId: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>('http://localhost:8080/proposals', {params: new HttpParams().set('userId', String(userId))});
  }

  createProposalByUserId(userId: number, proposalName: string, activityType: ActivityType): Observable<Proposal> {
    return this.http.post<Proposal>('http://localhost:8080/proposals', {name: proposalName, activityType},
      { params: new HttpParams().set('userId', String(userId)), headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8',
        })});
  }
}
