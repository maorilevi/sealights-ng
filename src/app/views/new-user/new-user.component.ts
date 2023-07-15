import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonsFacadeService} from "@store/persons/persons-facade.service";
import {BehaviorSubject, filter, Subject, Subscription, takeUntil} from "rxjs";
import {Address} from "@models/address.model";
import {ActivatedRoute, Router} from "@angular/router";
import {v4 as uuidv4} from 'uuid';
import {Person} from "@models/person.model";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  address$: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);
  userForm!: FormGroup;
  currentPersonId!: string;
  getCurrentPersonSub$!: Subscription;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private router: Router,
    private personsFacadeService: PersonsFacadeService) {
  }

  public ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      birthdate: new FormControl(null),
    });
    this.currentPersonId = this.activatedRoute.snapshot.params['id'];
    if (this.currentPersonId) {
      this.initCurrentPerson();
    }
  }

  private initCurrentPerson(): void {
    if (this.getCurrentPersonSub$) {
      this.getCurrentPersonSub$.unsubscribe();
    }
    this.getCurrentPersonSub$ = this.personsFacadeService.getPersonById$(this.currentPersonId)
      .pipe(takeUntil(this.destroy$), filter((person) => !!person))
      .subscribe((person: Person) => {
        this.userForm.get('name')?.setValue(person.name);
        this.userForm.get('birthdate')?.setValue(person.birthdate);
        this.address$.next(person.addresses.map((address) => {
          const uuid: string = uuidv4();
          this.initNewAddressControls(uuid, address.name, address.countrId, address.cityId, address.street);
          return {...address, uuid}
        }));
        this.ref.detectChanges();
      });
  }

  public identify(index: number, item: Address): string {
    return item?.name;
  }

  public addAddress(): void {
    const uuid = uuidv4();
    const dummyAddressName = `Address ${this.address$.value.length + 1}`;
    this.initNewAddressControls(uuid, dummyAddressName);
    this.address$.next([...this.address$.value, {name: dummyAddressName, uuid}]);
    this.ref.detectChanges();
  }

  private initNewAddressControls(
    uuid: string,
    name: string,
    countrId?: number,
    cityId?: number,
    street?: string,): void {
    if (!this.addressControls) {
      this.userForm.addControl('addresses', new FormGroup({}));
    }
    (this.userForm.get('addresses') as FormGroup).addControl(uuid, new FormGroup({
      countrId: new FormControl(countrId ?? null),
      cityId: new FormControl(cityId ?? null),
      street: new FormControl(street ?? null, [Validators.required]),
      name: new FormControl(name,
        [Validators.required])
    }));
  }

  public get addressControls(): any {
    const addresses = this.userForm?.get('addresses') as FormGroup;
    if (!addresses?.controls) return null;
    return addresses?.controls;
  }

  public addUser(): void {
    const formValue = this.userForm.getRawValue();
    const user = {
      ...formValue,
      addresses: Object.keys(formValue.addresses).map(key => formValue.addresses[key])
    }
    this.personsFacadeService.createPerson(user);
    this.router.navigate(['/home/users']);
  }

  public ngOnDestroy(): void {
    if (this.getCurrentPersonSub$) {
      this.getCurrentPersonSub$.unsubscribe();
    }
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public removeAddress(uuid: string): void {
    (this.userForm?.get('addresses') as FormGroup).removeControl(uuid);
    this.address$.next(this.address$.value.filter((address, i) => address.uuid !== uuid));
    this.ref.detectChanges();
  }

  public get atListOneAddress(): boolean {
    return this.address$.value.length > 0;
  }

  public get btnIsDisabled(): boolean {
    return this.userForm.invalid || !this.atListOneAddress;
  }

  public updateUser(): void {
    const formValue = this.userForm.getRawValue();
    const user = {
      id: this.currentPersonId,
      ...formValue,
      addresses: Object.keys(formValue.addresses).map(key => formValue.addresses[key])
    }
    this.personsFacadeService.updatePerson(user);
    this.router.navigate(['/home/users']);
  }
}
