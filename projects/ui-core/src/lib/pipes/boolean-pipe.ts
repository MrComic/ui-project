import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
    name: 'boolean',
    pure:false
})
export class BooleanPipe implements PipeTransform {
         
  constructor(
    public translate: TranslateService,
    ) {
     }
    transform(value: any ): any {
        let result;
 
            result = value==true 
            ? "بله"
            :"خیر";
        return result;
    }
}