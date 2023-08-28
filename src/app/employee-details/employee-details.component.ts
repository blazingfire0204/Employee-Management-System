import { Component, OnInit, ViewChild} from '@angular/core';
import { EmployeeeService } from '../shared/employeee.service';
import { Employee } from '../shared/employee.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
constructor(public empService:EmployeeeService,public datepipe:DatePipe, public toast:ToastrService){ }
@ViewChild(EmployeeFormComponent) emp:EmployeeFormComponent;
ngOnInit(){
  this.empService.getEmployees().subscribe(data=>{
    this.empService.listEmployee=data;
  });
}
populateEmployee(selectedEmployee:Employee)
{
  console.log(selectedEmployee);
  let df=this.datepipe.transform(selectedEmployee.doj,'yyyy-MM-dd');
  selectedEmployee.doj=df;
  console.log(selectedEmployee.designation);
  this.empService.employeeData=selectedEmployee;
}
delete(id:number){
  if(confirm('Are you really want to delete this record?'))
  {
    this.empService.deleteEmployee(id).subscribe(data=>{
      this.empService.getEmployees().subscribe(data=>{
        this.empService.listEmployee=data;
        this.toast.error('Sucess','Record Deleted');
      });
    },
    err=>{
    });
  }
}
}
