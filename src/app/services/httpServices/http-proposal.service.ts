import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Proposal} from "../../entities/proposal.model";

@Injectable({
  providedIn: 'root'
})
export class HttpProposalService {
  constructor(private http: HttpClient) {
  }

  loadProposalsByUserId(userId: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>('http://localhost:8080/proposals', {params: new HttpParams().set('userId', String(userId))});
  }
}
