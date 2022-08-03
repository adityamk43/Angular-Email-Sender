import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  data = {
    to:"",
    subject:"",
    message:""
  }

  // flag:boolean = false;
  //OR
  flag = false;

  constructor(private email:EmailService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  doSubmitForm()
  {
    console.log("Trying to Submit Form");

    console.log("Data: ", this.data);

    if (this.data.to=='' || this.data.subject=='' || this.data.message=="")
    {
      this.snack.open("Fields cannot be empty", "CLOSE");
      return;
    }

    this.flag=true;
    this.email.sendEmail(this.data).subscribe(
      response=>{
        this.flag=false;
        console.log(response);
        this.snack.open("Email Send Successfully!!", "OK");
      },
      error => {
        this.flag=false;
        console.log(error);
        this.snack.open("Error Sending Email!!", "CLOSE");
      }
    );
    
  }

}
