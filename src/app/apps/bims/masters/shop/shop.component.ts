import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/shared/common/global_constants';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  zones:any = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  shopForm!: UntypedFormGroup;
  updateBtnDisable:boolean = true;
  isLoading:boolean = false;
  showStatus:boolean;
  columnDefs = [
    { headerName: 'S.No', field: 'sno', alignment: 'center',width:'100', filter: false},
    { headerName: 'Shop Name', field: 'shop_name', alignment: 'left'},
    { headerName: 'Contact Person', field: 'contact_person_name', alignment: 'left'},
    { headerName: 'Phone Number', field: 'phone_number', alignment: 'left'},
    { headerName: 'Address', field: 'address', alignment: 'left'},
    { headerName: 'City', field: 'city', alignment: 'left'},
    ];


  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  constructor(
    private fb:UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.shopFormValidators();
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
  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Department';
    this.visible = true;
    this.showStatus = false;
    this.shopFormValidators();
    this.shopForm.get('status')?.setValue('active');
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
      contact_person_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }
}
