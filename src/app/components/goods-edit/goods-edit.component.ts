import { Component } from '@angular/core';
import { GoodsService } from '../../services/goods.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-goods-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './goods-edit.component.html',
  styleUrl: './goods-edit.component.css'
})
export class GoodsEditComponent {
  public id:string;
  public marke:string|null=null;
  public modelis:string|null=null;
  public lokacija:string|null=null;
  public numeris:string|null=null;
  public aprasas:string|null=null;
  public status:string|null=null;


  public isLoading=false;
  public isError=false;

  constructor (private route:ActivatedRoute, private router:Router, private goodsService:GoodsService){
    this.id=this.route.snapshot.params["id"];
    this.isLoading=true;
    this.goodsService.loadGood(this.id).subscribe( (good)=>{
      this.marke=good.marke;
      this.modelis=good.modelis;
      this.lokacija=good.lokacija;
      this.numeris=good.numeris;
      this.aprasas=good.aprasas;

      this.status=good.status;
      this.isLoading=false;

    });
  }

  public updateRecord(f:NgForm){
    console.log(f.form.value);
    
    
      this.isLoading=true;
      this.goodsService.updateRecord({
        id:this.id,
        marke:f.form.value.marke,
        modelis:f.form.value.modelis,
        lokacija:f.form.value.lokacija,
        numeris:f.form.value.numeris,
        aprasas:f.form.value.aprasas,
        status:f.form.value.status
      }).subscribe({
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
