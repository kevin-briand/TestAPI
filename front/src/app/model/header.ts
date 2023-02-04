import {HttpHeaders} from "@angular/common/http";

export class Header {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
}
