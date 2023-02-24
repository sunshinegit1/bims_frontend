import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/common/global_constants';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { DepotService } from 'src/app/shared/moduleservices/depot.service';
import { ZoneService } from 'src/app/shared/moduleservices/zone.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {
  depots:any = [];
  zones:any = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  depotForm!: UntypedFormGroup;
  updateBtnDisable:boolean = true;
  isLoading:boolean = false;
  showStatus:boolean;
  user_id: number = null;
  user_data: any;
  depot_id: any;

  columnDefs = [
    { headerName: 'S.No', field: 'sno', alignment: 'center',width:'100', filter: false},
    { headerName: 'Depot Name', field: 'depot_name', alignment: 'left'},
    { headerName: 'Contact Person', field: 'contact_person_name', alignment: 'left'},
    { headerName: 'Phone Number', field: 'phone_number', alignment: 'left'},
    { headerName: 'Address', field: 'address', alignment: 'left'},
    { headerName: 'City', field: 'city', alignment: 'left'},
    { headerName: 'Zone', field: 'zone_id', alignment: 'left'},
    ];


  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  constructor(
    private fb:UntypedFormBuilder,
    private depotService:DepotService,
    private zoneService:ZoneService,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.depotFormValidators();
    this.getDepots();
    this.getZones();
    this.user_data = JSON.parse(sessionStorage.getItem('user_data'));
    this.user_id = this.user_data.user_id;
  }
  getDepots(){
    this.depotService.getDepots().subscribe((res:any)=>{
      this.depots = res;
    })
  }
  getZones() {
    this.zoneService.getZones().subscribe((res: any) => {
      this.zones = [...res];
    })
  }
  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Depot',
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

  //create depot
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Depot';
    this.depot_id = '';
    this.visible = true;
    this.showStatus = false;
    this.depotFormValidators();
    this.depotForm.get('status')?.setValue('active');
  }
  prepareCreatePayload(data: any) {
    const payload = {
      zone_id: data.zone_id,
      depot_name: data.depot_name,
      contact_person_name: data.contact_person_name,
      email: data.email,
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
  onCreateSubmit(){
    if (this.depotForm.valid) {
      this.depotService.createDepot(this.prepareCreatePayload(this.depotForm.value)).subscribe((res) => {
        if (res.status === 'success') {
          this.visible = false;
          this.getDepots();
          this.notification.createNotification("success", res?.message);
        } else {
          this.notification.createNotification(res.status, res.message);
        }
      });
      console.log(this.depotForm.value);
    } else {
      Object.values(this.depotForm.controls).forEach(control => {
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
      this.depot_id = data.depot_id;
      this.depotFormValidators();
      this.depotForm.get('depot_name')?.setValue(data?.depot_name);
      this.depotForm.get('zone_id')?.setValue(data?.zone_id.toString());
      this.depotForm.get('contact_person_name')?.setValue(data?.contact_person_name);
      this.depotForm.get('status')?.setValue(data?.status);
      this.depotForm.get('email')?.setValue(data?.email);
      this.depotForm.get('address')?.setValue(data?.address);
      this.depotForm.get('city')?.setValue(data?.city);
      this.depotForm.get('state')?.setValue(data?.state);
      this.depotForm.get('district')?.setValue(data?.district);
      this.depotForm.get('country')?.setValue(data?.country);
      this.depotForm.get('phone_number')?.setValue(data?.phone_number);
      this.depotForm.get('gst_num')?.setValue(data?.gst_num);
      this.depotForm.get('status')?.setValue(data?.status);
    }
    prepareUpdatePayload(data: any) {
      const payload = {
        zone_id: data.zone_id,
        depot_name: data.depot_name,
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
      if (this.depotForm.valid) {
        this.depotService.updateDepot(this.depot_id, this.prepareUpdatePayload(this.depotForm.value)).subscribe((res) => {
          if (res.status === 'success') {
            this.visible = false;
            this.getDepots();
            this.notification.createNotification("success", res?.message);
          } else {
            this.notification.createNotification(res.status, res.message);
          }
        });
      } else {
        Object.values(this.depotForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

  depotFormValidators() {
    this.depotForm = this.fb.group({
      depot_name: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3),
      Validators.pattern(GlobalConstants.nameRegex)
      ]
      ],
      status: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      zone_id:['',[Validators.required]],
      contact_person_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required,Validators.pattern(GlobalConstants.numberRegex), Validators.minLength(10)], [this.phoneValidator]],
      address: ['', [Validators.required]],
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
        this.depots.forEach((elem: any) => {
          if (this.depot_id != elem.depot_id) {
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

}
