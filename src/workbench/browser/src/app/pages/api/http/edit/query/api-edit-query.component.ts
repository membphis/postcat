import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  AfterViewChecked,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ApiTableService } from 'eo/workbench/browser/src/app/modules/api-shared/api-table.service';
import { ApiEditQuery } from '../../../../../shared/services/storage/index.model';

@Component({
  selector: 'eo-api-edit-query',
  template: `<div class="param_header flex items-center h-10">
      <params-import [(baseData)]="model" contentType="query" modalTitle="Query"></params-import>
    </div>
    <eo-ng-table-pro
      [columns]="listConf.columns"
      [nzDataItem]="itemStructure"
      [setting]="listConf.setting"
      [(nzData)]="model"
      (nzDataChange)="modelChange.emit($event)"
    ></eo-ng-table-pro>`
})
export class ApiEditQueryComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() model: ApiEditQuery[];
  @Output() modelChange: EventEmitter<any> = new EventEmitter();
  listConf: any = {
    column: [],
    setting: {},
  };
  itemStructure: ApiEditQuery = {
    name: '',
    required: true,
    example: '',
    description: '',
  };
  constructor(private apiTable: ApiTableService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initListConf();
  }
  ngAfterViewChecked() {
    // prevent AngularJS error when dragging and sorting item
    this.cdRef.detectChanges();
  }
  ngOnChanges(changes) {}
  private initListConf() {
    const config = this.apiTable.initTable({
      in: 'header',
      isEdit: true,
    });
    this.listConf.columns = config.columns;
    this.listConf.setting = config.setting;
  }
}
