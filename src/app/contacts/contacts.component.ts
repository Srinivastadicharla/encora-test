import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransferService } from '../services/transfer.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'country',
    'phone',
    'companyId',
    'action',
  ];
  dataSource;
  contactsList;

  constructor(private transfer: TransferService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getContacts();
  }
  getContacts() {
    this.transfer.getContacts().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.contactsList = res;
    });
  }
  deleteContact(id, name) {
    console.log(id);
    this.transfer.deleteContacts(id).subscribe(
      (res) => {
        console.log(name);
        let index = this.contactsList.map((e) => e.name).indexOf(name);
        console.log(index);

        this.contactsList.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.contactsList);
      },
      (err) => {
        let index = this.contactsList.map((e) => e.name).indexOf(name);
        console.log(index);

        this.contactsList.splice(index, 1);
        console.log(err);
        this.dataSource = new MatTableDataSource(this.contactsList);
      }
    );
  }

  addContact(contact) {
    console.log(contact);
    this.transfer.addContacts(contact).subscribe((res) => {
      console.log(res);
      this.contactsList.push(res);
      this.dataSource = new MatTableDataSource(this.contactsList);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialog, {
      width: '250px',
      data: 'Add Contact',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.addContact(result);
    });
  }
}

@Component({
  selector: 'add-dialog',
  templateUrl: 'dialog.html',
})
export class AddDialog {
  constructor(
    public dialogRef: MatDialogRef<AddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', Validators.required),
    companyId: new FormControl('', Validators.required),
  });

  saveClick(data) {
    this.dialogRef.close(data);
  }
  validationMsg(val) {
    return 'this field is required';
  }
}
