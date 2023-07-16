import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Person} from "@models/person.model";
import {PersonsFacadeService} from "@store/persons/persons-facade.service";
import {ActivatedRoute} from "@angular/router";
import {ALL_USERS_LINK, NEW_USER_LINK} from "@utils/routs.links";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  protected readonly NEW_USER_LINK = NEW_USER_LINK;
  protected readonly ALL_USERS_LINK = ALL_USERS_LINK;

  displayedColumns: string[] = ['id', 'name', 'birthdate', 'addressCount', 'actions']
  dataSource$!: Observable<Person[]>;
  emptyState = {
    title: 'No users found',
    description: 'Add users to populate the table.',
    action: {
      title: 'click here to add a user',
      link: this.NEW_USER_LINK
    }
  }
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly personsFacadeService: PersonsFacadeService) { }

  public ngOnInit(): void {
    this.initPersons();
  }
  private initPersons(): void {
    this.dataSource$ = this.personsFacadeService
      .getAllPersons$()
      .pipe(takeUntil(this.destroy$));
  }
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public deleteUser(id: string): void {
    this.personsFacadeService.deletePerson(id);
  }
}
