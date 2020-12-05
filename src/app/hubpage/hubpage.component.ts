import { Component, OnInit } from '@angular/core';
import {Group} from '../entities/group.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-hubpage',
  templateUrl: './hubpage.component.html',
  styleUrls: ['./hubpage.component.css']
})
export class HubpageComponent implements OnInit {

  userId = 4;
  loadedGroups: Group[];
  currentGroup: Group;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadGroupsByUserId();
  }

  loadGroupsByUserId(): void {
    this.http.get<Group[]>('http://localhost:8080/groups', {params: new HttpParams().set('userId', String(this.userId))})
      .subscribe(groups => {
      this.loadedGroups = groups;
      this.currentGroup = this.loadedGroups[0];
    });
  }

}
