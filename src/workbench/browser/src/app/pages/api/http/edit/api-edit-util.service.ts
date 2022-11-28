import { Injectable } from '@angular/core';
import { ModalService } from '../../../../shared/services/modal.service';
import { ApiData } from '../../../../shared/services/storage/index.model';
import { eoDeepCopy } from 'eo/workbench/browser/src/app/utils/index.utils';
import { omit } from 'lodash-es';
@Injectable()
export class ApiEditUtilService {
  constructor(private modalService: ModalService) {}

  parseApiStorage2UI(apiData) {
    const result = apiData;
    result.groupID = (result.groupID === 0 ? -1 : result.groupID || -1).toString();
    return result;
  }

  private parseApiUI2Storage(formData, filterArrFun): ApiData {
    const result = eoDeepCopy(formData);
    result.groupID = Number(result.groupID === '-1' ? '0' : result.groupID);
    ['requestBody', 'queryParams', 'restParams', 'requestHeaders', 'responseHeaders', 'responseBody'].forEach(
      (tableName) => {
        if (typeof result[tableName] !== 'object') {
          return;
        }
        result[tableName] = omit(result[tableName], ['eoKey']);
        result[tableName] = filterArrFun([].concat(result[tableName]));
      }
    );
    return result;
  }
  /**
   * Handle api data for judge page has edit
   * Unlike the saved data, the api data being edited is not as strict
   *
   * @param formData
   * @returns apiData
   */
  formatEditingApiData(formData): ApiData {
    return this.parseApiUI2Storage(formData, (result) =>
      (result || []).filter((val) => val?.name || val?.description || val?.example)
    );
  }
  /**
   * Handle api data to be saved
   *
   * @param formData
   * @returns apiData
   */
  formatSavingApiData(formData): ApiData {
    return this.parseApiUI2Storage(formData, (result) => (result || []).filter((val) => val?.name));
  }
}
