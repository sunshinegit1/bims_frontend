import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/common/global_constants';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { DepotService } from 'src/app/shared/moduleservices/depot.service';
import { ShopService } from 'src/app/shared/moduleservices/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shops:any = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  shopForm!: UntypedFormGroup;
  updateBtnDisable:boolean = true;
  isLoading:boolean = false;
  showStatus:boolean;
  user_id: number = null;
  user_data: any;
  shop_id: any;
  depots:any=[];

  columnDefs = [
    { headerName: 'S.No', field: 'sno', alignment: 'center',width:'100', filter: false},
    { headerName: 'Shop Name', field: 'shop_name', alignment: 'left'},
    { headerName: 'Depot Name', field: 'depot_id', alignment: 'left'},
    { headerName: 'Contact Person', field: 'contact_person_name', alignment: 'left'},
    { headerName: 'Phone Number', field: 'phone_number', alignment: 'left'},
    { headerName: 'Address', field: 'address', alignment: 'left'},
    { headerName: 'City', field: 'city', alignment: 'left'},
    ];


  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  constructor(
    private fb:UntypedFormBuilder,
    private shopService:ShopService,
    private notification : NotificationService,
    private depotService: DepotService
  ) { }

  ngOnInit(): void {
    this.shopFormValidators();
    this.getShops();
    this.getDepots();
    this.user_data = JSON.parse(sessionStorage.getItem('user_data'));
    this.user_id = this.user_data.user_id;
  }
  getShops(){
    this.shopService.getShops().subscribe((res:any)=>{
      this.shops = res;
    })
  }
  getDepots(){
    this.depotService.getDepots().subscribe((res:any)=>{
      this.depots = res;
    })
  }
  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Shop',
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

  //create shop
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Shop';
    this.visible = true;
    this.showStatus = false;
    this.shopFormValidators();
    this.shopForm.get('status')?.setValue('active');
  }
  prepareCreatePayload(data: any) {
    const payload = {
      depot_id: data.depot_id,
      shop_name: data.shop_name,
      contact_person_name: data.contact_person_name,
      email: data.email,
      phone_number: data.phone_number,
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
    if (this.shopForm.valid) {
      this.shopService.createShop(this.prepareCreatePayload(this.shopForm.value)).subscribe((res) => {
        if (res.status === 'success') {
          this.visible = false;
          this.getShops();
          this.notification.createNotification("success", res?.message);
        } else {
          this.notification.createNotification(res.status, res.message);
        }
      });
      console.log(this.shopForm.value);
    } else {
      Object.values(this.shopForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

    //edit Shop
    edit(data: any) {
      this.submit = false;
      this.visible = true;
      this.drawerTitle = 'Edit Shop Details';
      this.updateBtnDisable = true;
      this.shop_id = data.shop_id;
      this.shopFormValidators();
      this.shopForm.get('shop_name')?.setValue(data?.shop_name);
      this.shopForm.get('depot_id')?.setValue(data?.depot_id.toString());
      this.shopForm.get('contact_person_name')?.setValue(data?.contact_person_name);
      this.shopForm.get('status')?.setValue(data?.status);
      this.shopForm.get('email')?.setValue(data?.email);
      this.shopForm.get('address')?.setValue(data?.address);
      this.shopForm.get('city')?.setValue(data?.city);
      this.shopForm.get('state')?.setValue(data?.state);
      this.shopForm.get('district')?.setValue(data?.district);
      this.shopForm.get('country')?.setValue(data?.country);
      this.shopForm.get('phone_number')?.setValue(data?.phone_number);
      this.shopForm.get('gst_num')?.setValue(data?.gst_num);
      this.shopForm.get('status')?.setValue(data?.status);
    }
    prepareUpdatePayload(data: any) {
      const payload = {
        depot_id: data.depot_id,
        shop_name: data.shop_name,
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
      if (this.shopForm.valid) {
        this.shopService.updateShop(this.shop_id, this.prepareUpdatePayload(this.shopForm.value)).subscribe((res) => {
          if (res.status === 'success') {
            this.visible = false;
            this.getShops();
            this.notification.createNotification("success", res?.message);
          } else {
            this.notification.createNotification(res.status, res.message);
          }
        });
      } else {
        Object.values(this.shopForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
  
  shopFormValidators() {
    this.shopForm = this.fb.group({
      shop_name: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3),
      Validators.pattern(GlobalConstants.nameRegex)
      ]
      ],
      status: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      depot_id:['',[Validators.required]],
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
      this.shops.forEach((elem: any) => {
        if (this.shop_id != elem.shop_id) {
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
