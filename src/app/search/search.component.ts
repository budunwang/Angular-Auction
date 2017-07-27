import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel: FormGroup;

  categories: string[];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.createForm();
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  createForm() {
    this.formModel = this.fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  positiveNumberValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    return (parseInt(control.value, 10) > 0) ? null : {positiveNumber: true};
  }

  onSubmit() {
    if (this.formModel.valid) {
      console.log(this.formModel.value);
    }
  }

}
