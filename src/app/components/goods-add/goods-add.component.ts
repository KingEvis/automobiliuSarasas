import { Component } from '@angular/core';
import { GoodsService } from '../../services/goods.service';
import { Good } from '../../models/good';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-goods-add',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './goods-add.component.html',
  styleUrl: './goods-add.component.css'
})
export class GoodsAddComponent {

  public marke:string|null=null;
  public modelis:string|null=null;
  public lokacija:string|null=null;
  public numeris:string|null=null;
  public aprasas:string|null=null;
  public status:string|null=null;

  public isLoading=false;
  public isError=false;
  

  public constructor(private goodsService:GoodsService, private router:Router){

  }

  public addNewGood(f:NgForm){
    
   
      
      const tmp:Good={
        marke:f.form.value.marke,
        modelis:f.form.value.modelis,
        lokacija:f.form.value.lokacija,
        numeris:f.form.value.numeris,
        aprasas:f.form.value.aprasas,
        status:f.form.value.status,

        id:null
      };
      this.isLoading=true;
      this.goodsService.addGood(tmp).subscribe({
        next:()=>{
          this.isLoading=false;
          this.isError=false;
          this.router.navigate(["/list"]);
        },
        error:()=>{
          this.isError=true;
          this.isLoading=false;
        }
      });
    
  }

}
