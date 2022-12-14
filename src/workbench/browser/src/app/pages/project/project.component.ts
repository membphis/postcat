import { Component, OnInit } from '@angular/core';
import { EoNgFeedbackMessageService } from 'eo-ng-feedback';
import { OperateProjectFormComponent } from 'eo/workbench/browser/src/app/pages/project/components/operate-project-form.compoent';
import { ModalService } from 'eo/workbench/browser/src/app/shared/services/modal.service';
import { StorageRes, StorageResStatus } from 'eo/workbench/browser/src/app/shared/services/storage/index.model';
import { StorageService } from 'eo/workbench/browser/src/app/shared/services/storage/storage.service';
import { StoreService } from 'eo/workbench/browser/src/app/shared/store/state.service';

type ListType = 'list' | 'card';

@Component({
  selector: 'project-management',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  listType: ListType = 'list';
  initLoading = true; // bug
  projectList: any[] = [];

  get WorkspaceID() {
    return this.storeSerive.getCurrentWorkspace.id;
  }

  constructor(
    private msg: EoNgFeedbackMessageService,
    private storage: StorageService,
    private storeSerive: StoreService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getProjectList();
  }

  getProjectList() {
    this.storage.run('projectBulkLoad', [this.WorkspaceID], (result: StorageRes) => {
      console.log('result', result);
      if (result.status === StorageResStatus.success) {
        this.projectList = result.data;
        this.initLoading = false;
      }
    });
  }

  editProject(item: any): void {
    const model = {
      name: item.name
    };
    const modal = this.modalService.create({
      nzTitle: $localize`Edit Project`,
      nzContent: OperateProjectFormComponent,
      nzComponentParams: {
        model
      },
      nzOnOk: async () => {
        this.storage.run('projectUpdate', [this.WorkspaceID, model, item.uuid], (result: StorageRes) => {
          if (result.status === StorageResStatus.success) {
            this.getProjectList();
            modal.destroy();
          }
        });
      }
    });
  }

  delProject(item: any): void {
    const modal = this.modalService.create({
      nzTitle: 'Delete Project',
      nzContent: 'Are you sure to delete this project?',
      nzOnOk: () => {
        this.storage.run('projectRemove', [this.WorkspaceID, item.uuid], (result: StorageRes) => {
          if (result.status === StorageResStatus.success) {
            this.getProjectList();
            modal.destroy();
          }
        });
      }
    });
  }

  setListType(type: ListType) {
    this.listType = type;
  }

  createProject() {
    const model = {
      name: ''
    };
    const modal = this.modalService.create({
      nzTitle: $localize`New Project`,
      nzContent: OperateProjectFormComponent,
      nzComponentParams: {
        model
      },
      nzOnOk: async () => {
        this.storage.run('projectCreate', [this.storeSerive.getCurrentWorkspace.id, model], (result: StorageRes) => {
          if (result.status === StorageResStatus.success) {
            this.getProjectList();
            modal.destroy();
          }
        });
      }
    });
  }
}