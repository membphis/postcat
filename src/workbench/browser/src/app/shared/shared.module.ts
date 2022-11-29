import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickStopPropagationDirective } from './directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { EoNgTabsModule } from 'eo-ng-tabs';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { EoNgButtonModule } from 'eo-ng-button';
import { EoNgCheckboxModule } from 'eo-ng-checkbox';
import { EoNgSelectModule } from 'eo-ng-select';
import { EoNgSwitchModule } from 'eo-ng-switch';
import { EoNgTreeModule } from 'eo-ng-tree';
import { EoNgInputModule } from 'eo-ng-input';
import { EoNgRadioModule } from 'eo-ng-radio';
import { EoNgDropdownModule } from 'eo-ng-dropdown';
import { EoNgTableModule } from 'eo-ng-table';
import { EoNgAutoCompleteModule } from 'eo-ng-auto-complete';

import {
  EoNgFeedbackAlertModule,
  EoNgFeedbackDrawerModule,
  EoNgFeedbackTooltipModule,
  EoNgFeedbackMessageModule,
} from 'eo-ng-feedback';

import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { RouterModule } from '@angular/router';
import { ShadowDomEncapsulationComponent } from 'eo/workbench/browser/src/app/shared/components/shadow/shadow-dom-encapsulation.component';
import { EnvListComponent } from 'eo/workbench/browser/src/app/modules/env/env-list/env-list.component';
import { SplitPanelComponent } from 'eo/workbench/browser/src/app/shared/components/split-panel/split.panel.component';
import { SplitXComponent } from 'eo/workbench/browser/src/app/shared/components/split-x/split-x.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { DownloadClienteComponent } from 'eo/workbench/browser/src/app/shared/components/download-client.component';
import { ExtensionAppComponent } from './components/extension-app/extension-app.component';
import { ExtensionSelectComponent } from './components/extension-select/extension-select.component';
import { EoIconparkIconModule } from '../modules/eo-ui/iconpark-icon/eo-iconpark-icon.module';

const COMPONENTS = [
  ShadowDomEncapsulationComponent,
  SplitPanelComponent,
  SplitXComponent,
  EnvListComponent,
  DownloadClienteComponent,
  ExtensionAppComponent,
  ExtensionSelectComponent,
];
const SHARED_UI_MODULE = [
  NzFormModule,
  EoNgButtonModule,
  NzBadgeModule,
  EoNgCheckboxModule,
  EoNgSelectModule,
  EoNgSwitchModule,
  EoNgTableModule,
  EoNgTreeModule,
  EoNgInputModule,
  EoNgRadioModule,
  EoNgTabsModule,
  EoNgAutoCompleteModule,
  EoNgFeedbackDrawerModule,
  EoNgFeedbackMessageModule,
  EoNgFeedbackAlertModule,
  EoNgFeedbackTooltipModule,
  EoNgDropdownModule,
  NzNotificationModule,
  NzEmptyModule,
  EoIconparkIconModule,
  NzTabsModule,
  NzSkeletonModule,
  NzPopoverModule,
  NzDividerModule,
  NzModalModule,
  NzListModule,
  NzLayoutModule,
  NzPopconfirmModule,
] as const;
const SHARED_MODULE = [CommonModule, FormsModule, RouterModule, ReactiveFormsModule] as const;

@NgModule({
  imports: [...SHARED_MODULE, ...SHARED_UI_MODULE],
  declarations: [...COMPONENTS, ClickStopPropagationDirective, EnvListComponent],
  providers: [],
  exports: [...SHARED_MODULE, ...COMPONENTS, ...SHARED_UI_MODULE, ClickStopPropagationDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
