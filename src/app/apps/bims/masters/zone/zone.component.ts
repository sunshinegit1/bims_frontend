import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/common/global_constants';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { ZoneService } from 'src/app/shared/moduleservices/zone.service';
import { Md5hashService } from 'src/app/shared/services/auth/md5hash.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  zones: any = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  zoneForm!: UntypedFormGroup;
  updateBtnDisable: boolean = false;
  isLoading: boolean = false;
  mode: boolean;
  zone_id: any;
  user_id: number = null;
  user_data: any;
  columnDefs = [
    { headerName: 'S.No', field: 'sno', alignment: 'center', width: '100', filter: false },
    { headerName: 'Zone Name', field: 'zone_name', alignment: 'left' },
    { headerName: 'Contact Person', field: 'contact_person_name', alignment: 'left' },
    { headerName: 'Phone Number', field: 'phone_number', alignment: 'left' },
    { headerName: 'Address', field: 'address', alignment: 'left' },
    { headerName: 'City', field: 'city', alignment: 'left' },
    { headerName: 'Status', field: 'status', alignment: 'left' },
  ];


  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  constructor(
    private fb: UntypedFormBuilder,
    private zoneService: ZoneService,
    private notification: NotificationService,
    private md5hashService: Md5hashService
  ) { }

  ngOnInit(): void {
    this.getZones();
    this.zoneFormValidators();
    this.user_data = JSON.parse(sessionStorage.getItem('user_data'));
    this.user_id = this.user_data.user_id;
  }

  getZones() {
    this.zoneService.getZones().subscribe((res: any) => {
      this.zones = [...res];
    })
  }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Zone',
        onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
  close(): void {
    this.visible = false;
  }

  // crate zone functions
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Zone';
    this.visible = true;
    this.mode = true;
    this.zone_id = '';
    this.zoneFormValidators();
    this.zoneForm.get('status')?.setValue('Active');
  }
  prepareCreatePayload(data: any) {
    const payload = {
      zone_name: data.zone_name,
      contact_person_name: data.contact_person_name,
      email: data.email,
      user_name: data.user_name,
      password: data.password,
      phone_number: data.phone_number,
      vendor_name: data.vendor_name,
      address: data.address,
      district: data.district,
      state: data.state,
      country: data.country,
      city: data.city,
      status: data.status,
      gst_num: data.gst_num,
      user_id: this.user_id
    }
    return payload;
  }
  onCreateSubmit() {
    if (this.zoneForm.valid) {
      this.zoneForm.value.password = this.md5hashService.passwordEncrypt(this.zoneForm.value.password);
      this.zoneService.createZone(this.prepareCreatePayload(this.zoneForm.value)).subscribe((res) => {
        if (res.status === 'success') {
          this.visible = false;
          this.getZones();
          this.notification.createNotification("success", res?.message);
        } else {
          this.notification.createNotification(res.status, res.message);
        }
      });
    } else {
      Object.values(this.zoneForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  //edit zone functions
  edit(data: any) {
    this.submit = false;
    this.visible = true;
    this.drawerTitle = 'Edit Zone Details';
    this.updateBtnDisable = true;
    this.mode = false;
    this.zone_id = data.zone_id;
    this.zoneFormValidators();
    this.zoneForm.get('zone_name')?.setValue(data?.zone_name);
    this.zoneForm.get('contact_person_name')?.setValue(data?.contact_person_name);
    this.zoneForm.get('status')?.setValue(data?.status);
    this.zoneForm.get('email')?.setValue(data?.email);
    this.zoneForm.get('address')?.setValue(data?.address);
    this.zoneForm.get('city')?.setValue(data?.city);
    this.zoneForm.get('state')?.setValue(data?.state);
    this.zoneForm.get('district')?.setValue(data?.district);
    this.zoneForm.get('country')?.setValue(data?.country);
    this.zoneForm.get('phone_number')?.setValue(data?.phone_number);
    this.zoneForm.get('gst_num')?.setValue(data?.gst_num);
    this.zoneForm.get('status')?.setValue(data?.status);
    this.zoneForm.get('user_name')?.disable();
    this.zoneForm.get('password')?.disable();
    this.zoneForm.get('confirm')?.disable();
  }
  prepareUpdatePayload(data: any) {
    const payload = {
      zone_name: data.zone_name,
      contact_person_name: data.contact_person_name,
      phone_number: data.phone_number,
      email: data.email,
      address: data.address,
      city: data.city,
      district: data.district,
      state: data.state,
      country: data.country,
      status: data.status,
      gst_num: data.gst_num,
      user_id: this.user_id
    }
    return payload;
  }
  onUpdateSubmit() {
    if (this.zoneForm.valid) {
      this.zoneService.updateZone(this.zone_id, this.prepareUpdatePayload(this.zoneForm.value)).subscribe((res) => {
        if (res.status === 'success') {
          this.visible = false;
          this.getZones();
          this.notification.createNotification("success", res?.message);
        } else {
          this.notification.createNotification(res.status, res.message);
        }
      });
    } else {
      Object.values(this.zoneForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // form validations
  zoneFormValidators() {
    this.zoneForm = this.fb.group({
      zone_name: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3),
      Validators.pattern(GlobalConstants.nameRegex),
      ], [this.userNameValidator]
      ],
      status: ['', [Validators.required]],
      contact_person_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required,Validators.pattern(GlobalConstants.numberRegex), Validators.minLength(10)], [this.phoneValidator]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      user_name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', this.confirmValidator],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      gst_num: ['', [Validators.required]],
    });
  }

  //phone number validation
  phoneValidator = (control: UntypedFormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        this.zones.forEach((elem: any) => {
          if (this.zone_id != elem.zone_id) {
            if (control.value.length === 10 && control.value == elem.phone_number) {
              observer.next({ error: true, duplicate: true });
              return observer.complete();
            } else {
              observer.next(null);
            }
          }
        });
        observer.complete();
      }, 1000);
    });

  // username validation
  userNameValidator = (control: UntypedFormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        this.zones.forEach((elem: any) => {
          if (control.value == elem.zone_name && this.zone_id != elem.zone_id) {
            observer.next({ error: true, duplicated: true });
            return observer.complete();
          } else {
            observer.next(null);
          }
        });
        observer.complete();
      }, 1000);
    });

  // password and confirm password validation
  validateConfirmPassword(): void {
    setTimeout(() => this.zoneForm.controls['confirm'].updateValueAndValidity());
  }
  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.zoneForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
